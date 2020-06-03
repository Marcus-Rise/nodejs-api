import {BaseController} from "../BaseController";
import {Response} from "express";
import {inject, injectable} from "tsyringe";
import {IUser} from "@/models/IUser";
import {IUserRepository} from "@/repositories/User/IUserRepository";
import {Get, JsonController, Res, UseBefore} from "routing-controllers";
import {AdminMiddleWare} from "@/middlewares/AdminMiddleWare";

@JsonController("/user")
@UseBefore(AdminMiddleWare)
@injectable()
export default class UserGetAllController extends BaseController {
    constructor(
        @inject("IUserRepository")
        private readonly repository: IUserRepository,
    ) {
        super();
    }

    @Get()
    async get(@Res() res: Response) {
        const users = await this.repository.find();

        return this.ok<{users: IUser[]}>(res, {users});
    }

}
