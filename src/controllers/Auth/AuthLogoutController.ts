import {Response} from "express";
import {cookieProps} from "@/shared/constants";
import {Get, JsonController, Res} from "routing-controllers";

@JsonController("/auth/logout")
export default class AuthLogoutController {
    @Get()
    async logout(@Res() res: Response) {
        const {key, options} = cookieProps;
        res.clearCookie(key, options);

        return "OK";
    }
}
