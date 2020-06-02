import {BaseController} from "../BaseController";
import e from "express";
import {inject, injectable} from "tsyringe";
import {ParamsDictionary} from "express-serve-static-core";
import {IUserRepository} from "@/repositories/User/IUserRepository";

@injectable()
export default class UserDeleteController extends BaseController {
    constructor(
        @inject("IUserRepository")
        private readonly repository: IUserRepository,
    ) {
        super();
    }

    protected async executeImpl(req: e.Request, res: e.Response): Promise<void | unknown> {
        const {id} = req.params as ParamsDictionary;

        await this.repository.delete(id);

        return this.ok(res);
    }

}
