import bcrypt from 'bcrypt';
import {Response} from "express";
import {inject, injectable} from "tsyringe";
import {cookieProps, loginFailedErr, paramMissingError} from "@/shared/constants";
import {IJwtService} from "@/services/IJwtService";
import {IUserRepository} from "@/repositories/User/IUserRepository";
import {Body, JsonController, Post, Res} from "routing-controllers";
import {ILoginCredentials} from "@/models/ILoginCredentials";
import {BaseController} from "@/controllers/BaseController";

@JsonController("/auth/login")
@injectable()
export default class AuthLoginController extends BaseController{
    constructor(
        @inject("IUserRepository")
        private readonly repository: IUserRepository,
        @inject("IJwtService")
        private readonly jwt: IJwtService,
    ) {
        super();
    }

    @Post()
    async login(@Body() credentials: ILoginCredentials, @Res() res: Response): Promise<void | unknown> {
        // Check email and password present
        if (!(credentials.email && credentials.password)) {
            return this.clientError(res, paramMissingError);
        }

        // Fetch user
        const user = await this.repository.findOne({email: credentials.email});

        if (!user) {
            return this.unauthorized(res, loginFailedErr);
        }

        // Check password
        const pwdPassed = await bcrypt.compare(credentials.password, user.pwdHash);

        if (!pwdPassed) {
            return this.unauthorized(res, loginFailedErr);
        }

        // Setup Admin Cookie
        const jwt = await this.jwt.encode({
            id: user.id,
            role: user.role,
        });
        const {key, options} = cookieProps;
        res.cookie(key, jwt, options);

        return this.ok(res);
    }

}
