import {inject, injectable} from "tsyringe";
import {IUserRepository} from "@/repositories/User/IUserRepository";
import {Authorized, Delete, JsonController, Param} from "routing-controllers";
import {UserRoles} from "@/entities/UserRoles";

@JsonController("/user")
@Authorized(UserRoles.Admin)
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
