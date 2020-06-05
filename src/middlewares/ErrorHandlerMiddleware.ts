import {ExpressErrorMiddlewareInterface, Middleware} from "routing-controllers";
import {NextFunction, Request, Response} from "express";
import {INTERNAL_SERVER_ERROR} from "http-status-codes";

@Middleware({type: "after"})
export class ErrorHandlerMiddleware implements ExpressErrorMiddlewareInterface {
    async error(error: unknown, req: Request, res: Response, next: NextFunction) {
        console.error(`Uncaught controller error`);
        console.error(error);

        return res.status(INTERNAL_SERVER_ERROR).json({
            message: String(error)
        })
    }
}
