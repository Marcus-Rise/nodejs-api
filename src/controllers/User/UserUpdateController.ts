import {inject, injectable} from "tsyringe";
import {IUserRepository} from "@/repositories/User/IUserRepository";
import {Body, JsonController, Param, Put, UseBefore} from "routing-controllers";
import {IUser} from "@/models/IUser";
import {AdminMiddleWare} from "@/middlewares/AdminMiddleWare";

@JsonController("/user")
@UseBefore(AdminMiddleWare)
@injectable()
export default class UserUpdateController {
    constructor(
        @inject("IUserRepository")
        private readonly repository: IUserRepository,
    ) {
    }

    @Put("/:id")
    async update(@Body() dto: IUser, @Param("id") id: number) {
        await this.repository.update(id, dto);

        return "OK";
    }
}
