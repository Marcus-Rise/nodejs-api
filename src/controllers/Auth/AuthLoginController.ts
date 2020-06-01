import bcrypt from 'bcrypt';
import {BaseController} from "../BaseController";
import e from "express";
import {inject, injectable} from "tsyringe";
import {cookieProps, loginFailedErr, paramMissingError} from "@shared/constants";
import {IJwtService} from "@/services/IJwtService";
import {IUserRepository} from "@/repositories/User/IUserRepository";

@injectable()
export class AuthLoginController extends BaseController {
    constructor(
        @inject("IUserRepository")
        private readonly repository: IUserRepository,
        @inject("IJwtService")
        private readonly jwt: IJwtService,
    ) {
        super();
    }

    protected async executeImpl(req: e.Request, res: e.Response): Promise<void | unknown> {
        const {email, password} = req.body;

        // Check email and password present
        if (!(email && password)) {
            return this.clientError(res, paramMissingError);
        }

        // Fetch user
        const user = await this.repository.findOne({email});

        if (!user) {
            return this.unauthorized(res, loginFailedErr);
        }

        // Check password
        const pwdPassed = await bcrypt.compare(password, user.pwdHash);

        if (!pwdPassed) {
            return this.unauthorized(res, loginFailedErr);
        }

        // Setup Admin Cookie
        const jwt = await this.jwt.getJwt({
            id: user.id.toString(),
            role: user.role,
        });
        const {key, options} = cookieProps;
        res.cookie(key, jwt, options);

        return this.ok(res);
    }

}
