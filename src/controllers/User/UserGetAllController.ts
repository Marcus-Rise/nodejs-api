import {BaseController} from "../BaseController";
import e from "express";
import {inject, injectable} from "tsyringe";
import {IUserDao} from "@daos/User/IUserDao";
import {IUser} from "@entities/IUser";

@injectable()
export class UserGetAllController extends BaseController {
    constructor(
        @inject("IUserDao")
        private readonly dao: IUserDao,
    ) {
        super();
    }

    protected async executeImpl(req: e.Request, res: e.Response): Promise<void | unknown> {
        const users = await this.dao.getAll();

        return this.ok<{users: IUser[]}>(res, {users});
    }

}
