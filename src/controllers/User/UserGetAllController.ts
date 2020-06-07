import {Response} from "express";
import {inject, injectable} from "tsyringe";
import {IUser} from "@/models/IUser";
import {IUserRepository} from "@/repositories/User/IUserRepository";
import {Authorized, Get, JsonController, Res} from "routing-controllers";
import {UserRoles} from "@/entities/UserRoles";

@JsonController("/user")
@Authorized(UserRoles.Admin)
@injectable()
export default class UserGetAllController {
    constructor(
        @inject("IUserRepository")
        private readonly repository: IUserRepository,
    ) {
    }

    @Get()
    async get(@Res() res: Response) {
        const array: IUser[] = await this.repository.find();

        return array;
    }
}
