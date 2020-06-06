import {BaseController} from "@/controllers/BaseController";
import {Get, JsonController, Res} from "routing-controllers";
import {Response} from "express";
import {IUser} from "@/models/IUser";
import User from "@/entities/User.entity";

@JsonController()
export class BlankController extends BaseController {
    @Get()
    async get(@Res() res: Response) {
        let array: IUser[] = [];

        for (const item of new Array(100)) {
            array.push(new User());
        }

        return this.ok<IUser[]>(res, array);
    }
}
