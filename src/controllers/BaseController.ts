import {Request, Response} from 'express'
import {
    BAD_REQUEST,
    CONFLICT,
    CREATED,
    FORBIDDEN,
    INTERNAL_SERVER_ERROR,
    NOT_FOUND,
    OK,
    PAYMENT_REQUIRED,
    TOO_MANY_REQUESTS,
    UNAUTHORIZED
} from "http-status-codes";

export abstract class BaseController {

    /**
     * This is what we will call on the route handler.
     * We also make sure to catch any uncaught errors in the
     * implementation.
     */

    public async execute(
        req: Request, res: Response
    ): Promise<void> {
        try {
            await this.executeImpl(req, res);
        } catch (err) {
            console.error(`[BaseController]: Uncaught controller error`);
            this.fail(res, err)
        }
    }

    protected static jsonResponse(
        res: Response, code: number, message: string
    ) {
        res.type('application/json');
        return res.status(code).json({message})
    }

    /**
     * This is the implementation that we will leave to the
     * subclasses to figure out.
     */
    protected abstract executeImpl(
        req: Request, res: Response
    ): Promise<void | unknown>;

    protected ok<T>(res: Response, dto?: T) {
        if (!!dto) {
            res.type('application/json');
            return res.status(OK).json(dto);
        } else {
            return res.sendStatus(OK);
        }
    }

    protected created(res: Response) {
        return res.sendStatus(CREATED);
    }

    protected clientError(res: Response, message: string = 'Bad request') {
        return BaseController.jsonResponse(res, BAD_REQUEST, message);
    }

    protected unauthorized(res: Response, message: string = 'Unauthorized') {
        return BaseController.jsonResponse(res, UNAUTHORIZED, message);
    }

    protected paymentRequired(res: Response, message: string = 'Payment required') {
        return BaseController.jsonResponse(res, PAYMENT_REQUIRED, message);
    }

    protected forbidden(res: Response, message: string = 'Forbidden') {
        return BaseController.jsonResponse(res, FORBIDDEN, message);
    }

    protected notFound(res: Response, message: string = 'Not found') {
        return BaseController.jsonResponse(res, NOT_FOUND, message);
    }

    protected conflict(res: Response, message: string = 'Conflict') {
        return BaseController.jsonResponse(res, CONFLICT, message);
    }

    protected tooMany(res: Response, message: string = 'Too many requests') {
        return BaseController.jsonResponse(res, TOO_MANY_REQUESTS, message);
    }

    protected todo(res: Response) {
        return BaseController.jsonResponse(res, BAD_REQUEST, 'TODO');
    }

    protected fail(res: Response, error: Error | string) {
        console.error(error);

        return res.status(INTERNAL_SERVER_ERROR).json({
            message: error.toString()
        })
    }
}
