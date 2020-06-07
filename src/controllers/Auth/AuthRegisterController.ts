import {inject, injectable} from "tsyringe";
import {UserRoles} from "@/entities/UserRoles";
import {IUserRepository} from "@/repositories/User/IUserRepository";
import {BadRequestError, Body, HttpCode, JsonController, Post} from "routing-controllers";
import {IUserRegister} from "@/models/IUserRegister";
import User from "@/entities/User.entity";
import {paramMissingError} from "@/shared/constants";
import bcrypt from "bcrypt";

@JsonController("/auth/register")
@injectable()
export default class AuthRegisterController {
    constructor(
        @inject("IUserRepository")
        private readonly repository: IUserRepository,
    ) {
    }

    @Post()
    @HttpCode(201)
    async create(@Body() dto: IUserRegister) {
        if (!(dto.email && dto.name && dto.password)) {
            throw new BadRequestError(paramMissingError);
        }

        const candidate = await this.repository.findOne({
            where: [
                {email: dto.email},
                {name: dto.name,}
            ]
        });

        if (candidate) {
            throw new BadRequestError("user already exist");
        }

        const password: string = await bcrypt.hash(dto.password, 12);

        const user = new User(
            dto.name,
            dto.email,
            [UserRoles.Standard, UserRoles.Admin],
            password,
        );

        await this.repository.save(user);

        return "Created";
    }
}
