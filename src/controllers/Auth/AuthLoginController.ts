import bcrypt from 'bcrypt';
import {Response} from "express";
import {inject, injectable} from "tsyringe";
import {cookieProps, loginFailedErr, paramMissingError} from "@/shared/constants";
import {IJwtService} from "@/services/IJwtService";
import {IUserRepository} from "@/repositories/User/IUserRepository";
import {BadRequestError, Body, JsonController, Post, Res, UnauthorizedError} from "routing-controllers";
import {ILoginCredentials} from "@/models/ILoginCredentials";

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
    async login(@Body() credentials: ILoginCredentials, @Res() res: Response) {
        // Check email and password present
        if (!(credentials.email && credentials.password)) {
            throw new BadRequestError(paramMissingError)
        }

        // Fetch user
        const user = await this.repository.findOne({email: credentials.email});

        if (!user) {
            throw new UnauthorizedError(loginFailedErr);
        }

        // Check password
        const pwdPassed = await bcrypt.compare(credentials.password, user.pwdHash);

        if (!pwdPassed) {
            throw new UnauthorizedError(loginFailedErr);
        }

        // Setup Admin Cookie
        const jwt = await this.jwt.encode({
            id: user.id,
            role: user.role,
        });
        const {key, options} = cookieProps;
        res.cookie(key, jwt, options);

        return "OK";
    }
}
