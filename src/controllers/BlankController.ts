import {Get, JsonController} from "routing-controllers";
import {IUser} from "@/models/IUser";
import User from "@/entities/User.entity";

@JsonController()
export class BlankController {
    @Get()
    async get(): Promise<IUser[]> {
        let array: IUser[] = [];

        for (const item of new Array(100)) {
            array.push(new User());
        }

        return array;
    }
}
