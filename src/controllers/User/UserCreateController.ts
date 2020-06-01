import {BaseController} from "../BaseController";
import {Request, Response} from "express";
import {inject, injectable} from "tsyringe";
import {paramMissingError} from "@shared/constants";
import {UserRoles} from "@entities/UserRoles";
import {IUserRepository} from "@/repositories/User/IUserRepository";

@injectable()
export class UserCreateController extends BaseController {
    constructor(
        @inject("IUserRepository")
        private readonly repository: IUserRepository,
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
        await this.repository.save(user);

        return this.created(res);
    }
}
