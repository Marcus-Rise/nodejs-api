import {UserRoles} from "@/entities/UserRoles";

export interface IUser {
    id: number;
    name: string;
    email: string;
    pwdHash: string;
    role: UserRoles;
}
