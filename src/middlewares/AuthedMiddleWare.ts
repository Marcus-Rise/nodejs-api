import {ExpressMiddlewareInterface} from "routing-controllers";
import {inject, injectable} from "tsyringe";
import {IJwtService} from "@/services/IJwtService";
import {cookieProps} from "@/shared/constants";
import {UNAUTHORIZED} from "http-status-codes";
import {NextFunction, Request, Response} from "express";

@injectable()
export class AuthedMiddleWare implements ExpressMiddlewareInterface {
    constructor(
        @inject("IJwtService")
        private readonly jwt: IJwtService,
    ) {
    }

    async use(req: Request, res: Response, next: NextFunction) {
        const jwtError = "JWT not present in signed cookie.";

        try {
            // Get json-web-token
            const jwt = req.signedCookies[cookieProps.key];

            if (!jwt) {
                throw Error(jwtError);
            }

            next();
        } catch (err) {
            return res.status(UNAUTHORIZED).json({
                error: err.message,
            });
        }
    }
}
