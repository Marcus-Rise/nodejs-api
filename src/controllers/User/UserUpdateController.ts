import {BaseController} from "../BaseController";
import {inject, injectable} from "tsyringe";
import e from "express";
import {IUserDao} from "@daos/User/IUserDao";
import {paramMissingError} from "@shared/constants";

@injectable()
export class UserUpdateController extends BaseController {
    constructor(
        @inject("IUserDao")
        private readonly dao: IUserDao,
    ) {
        super();
    }

    protected async executeImpl(req: e.Request, res: e.Response): Promise<void | unknown> {
        const {user} = req.body;

        if (!user) {
            return this.clientError(res, paramMissingError);
        }

        // Update user
        user.id = Number(user.id);
        await this.dao.update(user);

        return this.ok(res);
    }
}
