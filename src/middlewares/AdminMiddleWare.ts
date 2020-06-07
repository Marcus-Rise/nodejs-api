import {ExpressMiddlewareInterface} from "routing-controllers";
import {inject, injectable} from "tsyringe";
import {IJwtService} from "@/services/IJwtService";
import {cookieProps} from "@/shared/constants";
import {UserRoles} from "@/entities/UserRoles";
import {UNAUTHORIZED} from "http-status-codes";
import {NextFunction, Request, Response} from "express";

@injectable()
export class AdminMiddleWare implements ExpressMiddlewareInterface {
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
            // Make sure user role is an admin

            const clientData = await this.jwt.decode(jwt);

            if (clientData.role === UserRoles.Admin) {
                res.locals.userId = clientData.id;
                next();
            } else {
                throw Error(jwtError);
            }
        } catch (err) {
            return res.status(UNAUTHORIZED).json({
                error: err.message,
            });
        }
    }
}
