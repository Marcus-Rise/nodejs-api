import {ExpressMiddlewareInterface} from "routing-controllers";
import {inject, injectable} from "tsyringe";
import {IJwtService} from "@/services/IJwtService";
import {cookieProps} from "@shared/constants";
import {container} from "@/services/serviceContainer";
import {UserRoles} from "@entities/UserRoles";
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
        try {
            // Get json-web-token
            const jwt = req.signedCookies[cookieProps.key];
            if (!jwt) {
                throw Error('JWT not present in signed cookie.');
            }
            // Make sure user role is an admin
            const jwtService = container.resolve<IJwtService>("IJwtService");

            const clientData = await jwtService.decode(jwt);
            if (clientData.role === UserRoles.Admin) {
                res.locals.userId = clientData.id;
                next();
            } else {
                throw Error('JWT not present in signed cookie.');
            }
        } catch (err) {
            return res.status(UNAUTHORIZED).json({
                error: err.message,
            });
        }
    }
}
