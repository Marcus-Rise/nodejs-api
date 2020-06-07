import {Response} from 'express'
import {OK} from "http-status-codes";

export abstract class BaseController {
    protected ok<T>(res: Response, dto?: T) {
        if (!!dto) {
            res.type('application/json');
            return res.status(OK).json(dto);
        } else {
            return res.sendStatus(OK);
        }
    }
}
