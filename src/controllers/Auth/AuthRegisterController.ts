import {BaseController} from "../BaseController";
import {Request, Response} from "express";
import {inject, injectable} from "tsyringe";
import {paramMissingError} from "@shared/constants";
import {UserRoles} from "@entities/UserRoles";
import {IUserRepository} from "@/repositories/User/IUserRepository";
import User from "@entities/User.entity";
import bcrypt from 'bcrypt';

@injectable()
export class AuthRegisterController extends BaseController {
    constructor(
        @inject("IUserRepository")
        private readonly repository: IUserRepository,
    ) {
        super();
    }

    protected async executeImpl(req: Request, res: Response) {
        const dto = req.body.user;

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
