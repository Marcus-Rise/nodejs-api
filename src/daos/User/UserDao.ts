import {IUserDao} from "@daos/User/IUserDao";
import {IUser} from "@entities/IUser";
import {getRepository} from "typeorm";
import {User} from "@entities/User.entity";

export class UserDao implements IUserDao {
    constructor(
        private readonly repository = getRepository(User),
    ) {
    }

    /**
     * @param email
     */
    public async getOne(email: string): Promise<IUser | null> {
        const user = await this.repository.findOne({email});

        return user
        ? {...user, id: user.id.toString()}
        : null;
    }

    /**
     *
     */
    public async getAll(): Promise<IUser[]> {
        // TODO
        return [] as any;
    }

    /**
     *
     * @param user
     */
    public async add(user: IUser): Promise<void> {
        // TODO
        return {} as any;
    }

    /**
     *
     * @param user
     */
    public async update(user: IUser): Promise<void> {
        // TODO
        return {} as any;
    }

    /**
     *
     * @param id
     */
    public async delete(id: number): Promise<void> {
        // TODO
        return {} as any;
    }
}
