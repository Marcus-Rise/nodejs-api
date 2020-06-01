import {BaseController} from "../BaseController";
import e from "express";
import {inject, injectable} from "tsyringe";
import {IUser} from "@entities/IUser";
import {IUserRepository} from "@/repositories/User/IUserRepository";

@injectable()
export class UserGetAllController extends BaseController {
    constructor(
        @inject("IUserRepository")
        private readonly repository: IUserRepository,
    ) {
        super();
    }

    protected async executeImpl(req: e.Request, res: e.Response): Promise<void | unknown> {
        const users = await this.repository.find();
        const dto = users.map<IUser>(i => {
           return {
               ...i,
               id: i.id.toString(),
           };
        });

        return this.ok<{users: IUser[]}>(res, {users: dto});
    }

}
