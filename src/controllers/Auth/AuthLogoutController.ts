import {BaseController} from "../BaseController";
import {Response} from "express";
import {cookieProps} from "@/shared/constants";
import {Get, JsonController, Res} from "routing-controllers";

@JsonController("/auth/logout")
export default class AuthLogoutController extends BaseController {
    @Get()
    async logout(@Res() res: Response) {
        const {key, options} = cookieProps;
        res.clearCookie(key, options);

        return this.ok(res);
    }
}
