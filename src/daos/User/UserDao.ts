import {IUserDao} from "@daos/User/IUserDao";
import {IUser} from "@entities/IUser";


class UserDao implements IUserDao {


    /**
     * @param email
     */
    public async getOne(email: string): Promise<IUser | null> {
        // TODO
        return [] as any;
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

export {UserDao};
