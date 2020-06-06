import {EntityRepository, Repository} from "typeorm";
import User from "@/entities/User.entity";
import {IUserRepository} from "@/repositories/User/IUserRepository";

@EntityRepository(User)
export class UserRepository extends Repository<User> implements IUserRepository {

}

