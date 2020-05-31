import {BaseController} from "../BaseController";
import {Request, Response} from "express";
import {inject, injectable} from "tsyringe";
import {IUserDao} from "@daos/User/IUserDao";
import {paramMissingError} from "@shared/constants";
import {UserRoles} from "@entities/UserRoles";

@injectable()
export class UserCreateController extends BaseController {
    constructor(
        @inject("IUserDao")
        private readonly dao: IUserDao,
    ) {
        super();
    }

    protected async executeImpl(req: Request, res: Response) {
        const {user} = req.body;

        if (!user) {
            return this.clientError(res, paramMissingError);
        }

        // Add new user
        user.role = UserRoles.Standard;
        await this.dao.add(user);

        return this.created(res);
    }
}
