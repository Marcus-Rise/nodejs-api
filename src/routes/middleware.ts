import {NextFunction, Request, Response} from 'express';
import {UNAUTHORIZED} from 'http-status-codes';
import {cookieProps} from '@shared/constants';
import {UserRoles} from "@entities/UserRoles";
import {container} from "@/services/serviceContainer";
import {IJwtService} from "@/services/IJwtService";

const jwtService = container.resolve<IJwtService>("IJwtService");

// Middleware to verify if user is an admin
export const adminMW = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Get json-web-token
        const jwt = req.signedCookies[cookieProps.key];
        if (!jwt) {
            throw Error('JWT not present in signed cookie.');
        }
        // Make sure user role is an admin
        const clientData = await jwtService.decodeJwt(jwt);
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
};
