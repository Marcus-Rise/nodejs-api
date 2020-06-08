import bcrypt from 'bcrypt';
import {Response} from "express";
import {inject, injectable} from "tsyringe";
import {cookieProps} from "@/shared/constants";
import {IJwtService} from "@/services/IJwtService";
import {IUserRepository} from "@/repositories/User/IUserRepository";
import {Body, JsonController, Post, Res, UnauthorizedError} from "routing-controllers";
import {UserLoginDto} from "@/dto/UserLoginDto";

@JsonController("/auth/login")
@injectable()
export default class AuthLoginController {
    constructor(
        @inject("IUserRepository")
        private readonly repository: IUserRepository,
        @inject("IJwtService")
        private readonly jwt: IJwtService,
    ) {
    }

    @Post()
    async login(@Body() dto: UserLoginDto, @Res() res: Response) {
        // Fetch user
        const user = await this.repository.findOne({email: dto.email});

        if (!user) {
            throw new UnauthorizedError();
        }

        // Check password
        const pwdPassed = await bcrypt.compare(dto.password, user.pwdHash);

        if (!pwdPassed) {
            throw new UnauthorizedError();
        }

        // Setup Admin Cookie
        const jwt = await this.jwt.encode({
            id: user.id,
            roles: user.roles,
        });
        const {key, options} = cookieProps;
        res.cookie(key, jwt, options);

        return "OK";
    }
}
