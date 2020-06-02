import {BaseController} from "../BaseController";
import {injectable} from "tsyringe";
import e from "express";
import {cookieProps} from "@shared/constants";

@injectable()
export default class AuthLogoutController extends BaseController {
    protected async executeImpl(req: e.Request, res: e.Response): Promise<void | unknown> {
        const {key, options} = cookieProps;
        res.clearCookie(key, options);

        return this.ok(res);
    }
}
