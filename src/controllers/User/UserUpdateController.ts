import {BaseController} from "../BaseController";
import {inject, injectable} from "tsyringe";
import e from "express";
import {paramMissingError} from "@shared/constants";
import {IUserRepository} from "@/repositories/User/IUserRepository";

@injectable()
export default class UserUpdateController extends BaseController {
    constructor(
        @inject("IUserRepository")
        private readonly repository: IUserRepository,
    ) {
        super();
    }

    protected async executeImpl(req: e.Request, res: e.Response): Promise<void | unknown> {
        const {user} = req.body;

        if (!user) {
            return this.clientError(res, paramMissingError);
        }

        // Update user
        await this.repository.update(user.id, user);

        return this.ok(res);
    }
}
