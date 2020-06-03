import {BaseController} from "../BaseController";
import {Response} from "express";
import {inject, injectable} from "tsyringe";
import {UserRoles} from "@entities/UserRoles";
import {IUserRepository} from "@/repositories/User/IUserRepository";
import {Body, JsonController, Post, Res} from "routing-controllers";
import {IUserRegister} from "@/models/IUserRegister";
import User from "@entities/User.entity";
import {paramMissingError} from "@shared/constants";
import bcrypt from "bcrypt";

@JsonController("/auth/register")
@injectable()
export default class AuthRegisterController extends BaseController {
    constructor(
        @inject("IUserRepository")
        private readonly repository: IUserRepository,
    ) {
        super();
    }

    @Post()
    async create(@Body() dto: IUserRegister, @Res() res: Response) {
        if (!(dto.email && dto.name && dto.password)) {
            return this.clientError(res, paramMissingError);
        }

        const candidate = await this.repository.findOne({
            where: [
                {email: dto.email},
                {name: dto.name,}
            ]
        });

        if (candidate) {
            return this.clientError(res, "user already exist");
        }

        const password: string = await bcrypt.hash(dto.password, 12);

        const user = new User(
            dto.name,
            dto.email,
            UserRoles.Standard,
            password,
        );

        await this.repository.save(user);

        return this.created(res);
    }
}
