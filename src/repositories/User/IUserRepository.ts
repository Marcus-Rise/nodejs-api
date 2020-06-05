import {Repository} from "typeorm";
import User from "@entities/User.entity";

export type IUserRepository = Repository<User>;
