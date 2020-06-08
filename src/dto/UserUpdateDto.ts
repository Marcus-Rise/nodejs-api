import {IsEmail, IsNotEmpty} from "class-validator";

export class UserUpdateDto {
    @IsEmail()
    readonly email: string;
    @IsNotEmpty()
    readonly name: string;

    constructor(
        email: string = "",
        name: string = "",
    ) {
        this.email = email;
        this.name = name;
    }
}
