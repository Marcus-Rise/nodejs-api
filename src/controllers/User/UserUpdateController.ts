import {inject, injectable} from "tsyringe";
import {IUserRepository} from "@/repositories/User/IUserRepository";
import {Authorized, Body, JsonController, Param, Put} from "routing-controllers";
import {UserRoles} from "@/entities/UserRoles";
import {UserUpdateDto} from "@/dto/UserUpdateDto";

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
    async update(@Body() dto: UserUpdateDto, @Param("id") id: number): Promise<string> {
        await this.repository.update(id, dto);

        return "OK";
    }
}
