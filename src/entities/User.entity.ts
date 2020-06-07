import {UserRoles} from "@/entities/UserRoles";
import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    public id!: number;
    @Column({
        unique: true,
    })
    public name: string;
    @Column({
        unique: true,
    })
    public email: string;
    @Column("simple-array")
    public roles: UserRoles[];
    @Column()
    public pwdHash: string;

    constructor(
        name: string = "",
        email: string = "",
        roles: UserRoles[] = [UserRoles.Standard],
        pwdHash: string = "",
    ) {
        this.name = name;
        this.email = email;
        this.roles = roles;
        this.pwdHash = pwdHash;
    }
}

export default User
