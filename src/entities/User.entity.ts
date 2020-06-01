import {UserRoles} from "@entities/UserRoles";
import {Column, Entity, ObjectID, ObjectIdColumn} from "typeorm";

@Entity()
export class User {
    @ObjectIdColumn()
    public id!: ObjectID;
    @Column()
    public name!: string;
    @Column()
    public email!: string;
    @Column({
        type: "enum",
        enum: UserRoles,
        default: UserRoles.Standard
    })
    public role!: UserRoles;
    @Column()
    public pwdHash!: string;


    /*constructor(
        nameOrUser?: string | IUser,
        email?: string,
        role?: UserRoles,
        pwdHash?: string,
    ) {
        if (typeof nameOrUser === 'string' || typeof nameOrUser === 'undefined') {
            this.name = nameOrUser || '';
            this.email = email || '';
            this.role = role || UserRoles.Standard;
            this.pwdHash = pwdHash || '';
            this.id = id || -1;
        } else {
            this.name = nameOrUser.name;
            this.email = nameOrUser.email;
            this.role = nameOrUser.role;
            this.pwdHash = nameOrUser.pwdHash;
            this.id = nameOrUser.id;
        }
    }*/
}

export default User
