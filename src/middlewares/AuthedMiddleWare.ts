import {ExpressMiddlewareInterface, UnauthorizedError} from "routing-controllers";
import {inject, injectable} from "tsyringe";
import {IJwtService} from "@/services/IJwtService";
import {cookieProps} from "@/shared/constants";
import {NextFunction, Request, Response} from "express";

@injectable()
export class AuthedMiddleWare implements ExpressMiddlewareInterface {
    constructor(
        @inject("IJwtService")
        private readonly jwt: IJwtService,
    ) {
    }

    async use(req: Request, res: Response, next: NextFunction) {
        // Get json-web-token
        const jwt = req.signedCookies[cookieProps.key];

        if (!jwt) {
            throw new UnauthorizedError("JWT not present in signed cookie.");
        }

        next();
    }
}
