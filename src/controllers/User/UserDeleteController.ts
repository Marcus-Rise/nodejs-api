import {BaseController} from "../BaseController";
import e from "express";
import {inject, injectable} from "tsyringe";
import {IUserDao} from "@daos/User/IUserDao";
import {ParamsDictionary} from "express-serve-static-core";

@injectable()
export class UserDeleteController extends BaseController {
    constructor(
        @inject("IUserDao")
        private readonly dao: IUserDao,
    ) {
        super();
    }

    protected async executeImpl(req: e.Request, res: e.Response): Promise<void | unknown> {
        const {id} = req.params as ParamsDictionary;
        await this.dao.delete(Number(id));

        return this.ok(res);
    }

}
