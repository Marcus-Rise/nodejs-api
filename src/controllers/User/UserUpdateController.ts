import {inject, injectable} from "tsyringe";
import {IUserRepository} from "@/repositories/User/IUserRepository";
import {Authorized, Body, JsonController, Param, Put} from "routing-controllers";
import {IUser} from "@/models/IUser";
import {UserRoles} from "@/entities/UserRoles";

@JsonController("/user")
@Authorized(UserRoles.Admin)
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
