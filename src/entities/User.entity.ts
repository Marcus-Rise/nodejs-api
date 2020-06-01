import {UserRoles} from "@/entities/UserRoles";
import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity("Users")
export class User {
    @PrimaryGeneratedColumn()
    public id!: number;
    @Column({
        unique: true,
    })
    public name!: string;
    @Column({
        unique: true,
    })
    public email!: string;
    @Column(/*{
        type: "enum",
        enum: UserRoles,
        default: UserRoles.Standard
    }*/)
    public role!: UserRoles;
    @Column()
    public pwdHash!: string;

    constructor(
        name: string = "",
        email: string = "",
        role: UserRoles = UserRoles.Standard,
        pwdHash: string = "",
    ) {
        this.name = name;
        this.email = email;
        this.role = role;
        this.pwdHash = pwdHash;
    }
}

export default User
