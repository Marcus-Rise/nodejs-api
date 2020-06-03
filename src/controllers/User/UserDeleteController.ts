import {BaseController} from "../BaseController";
import {Response} from "express";
import {inject, injectable} from "tsyringe";
import {IUserRepository} from "@/repositories/User/IUserRepository";
import {Delete, JsonController, Param, Res, UseBefore} from "routing-controllers";
import {AdminMiddleWare} from "@/middlewares/AdminMiddleWare";

@JsonController("/user")
@UseBefore(AdminMiddleWare)
@injectable()
export default class UserDeleteController extends BaseController {
    constructor(
        @inject("IUserRepository")
        private readonly repository: IUserRepository,
    ) {
        super();
    }

    @Delete("/:id")
    async delete(@Param("id") id: number, @Res() res: Response) {
        await this.repository.delete(id);

        return this.ok(res);
    }

}
