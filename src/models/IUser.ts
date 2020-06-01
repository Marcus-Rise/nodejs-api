import {UserRoles} from "@entities/UserRoles";

export interface IUser {
    id: string;
    name: string;
    email: string;
    pwdHash: string;
    role: UserRoles;
}
