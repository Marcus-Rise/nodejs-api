import {BaseController} from "../BaseController";
import {inject, injectable} from "tsyringe";
import {Response} from "express";
import {IUserRepository} from "@/repositories/User/IUserRepository";
import {Body, JsonController, Put, Res, UseBefore} from "routing-controllers";
import {IUser} from "@/models/IUser";
import {AdminMiddleWare} from "@/middlewares/AdminMiddleWare";

@JsonController("/user")
@UseBefore(AdminMiddleWare)
@injectable()
export default class UserUpdateController extends BaseController {
    constructor(
        @inject("IUserRepository")
        private readonly repository: IUserRepository,
    ) {
        super();
    }

    @Put()
    async update(@Body() dto: IUser, @Res() res: Response) {
        await this.repository.update(dto.id, dto);

        return this.ok(res);
    }
}
