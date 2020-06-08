import {IsEmail, IsNotEmpty} from "class-validator";

export class UserRegisterDto {
    @IsEmail()
    readonly email: string;
    @IsNotEmpty()
    readonly name: string;
    @IsNotEmpty()
    readonly password: string;

    constructor(
        email: string = "",
        name: string = "",
        password: string = "",
    ) {
        this.email = email;
        this.name = name;
        this.password = password;
    }
}
