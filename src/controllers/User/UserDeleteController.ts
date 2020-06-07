import {inject, injectable} from "tsyringe";
import {IUserRepository} from "@/repositories/User/IUserRepository";
import {Delete, JsonController, Param, UseBefore} from "routing-controllers";
import {AdminMiddleWare} from "@/middlewares/AdminMiddleWare";

@JsonController("/user")
@UseBefore(AdminMiddleWare)
@injectable()
export default class UserDeleteController {
    constructor(
        @inject("IUserRepository")
        private readonly repository: IUserRepository,
    ) {
    }

    @Delete("/:id")
    async delete(@Param("id") id: number) {
        await this.repository.delete(id);

        return "OK";
    }
}
