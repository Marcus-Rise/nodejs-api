import {inject, injectable} from "tsyringe";
import {UserRoles} from "@/entities/UserRoles";
import {IUserRepository} from "@/repositories/User/IUserRepository";
import {BadRequestError, Body, HttpCode, JsonController, Post} from "routing-controllers";
import User from "@/entities/User.entity";
import bcrypt from "bcrypt";
import {UserRegisterDto} from "@/dto/UserRegisterDto";

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
    async create(@Body() dto: UserRegisterDto): Promise<string> {
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
