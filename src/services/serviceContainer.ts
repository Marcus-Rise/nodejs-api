import "reflect-metadata";
import { container } from "tsyringe";
import {IUserDao} from "@daos/User/IUserDao";
import {UserDaoMock} from "@daos/User/UserDao.mock";
import {IJwtService} from "./IJwtService";
import {JwtService} from "./implementations/JwtService";

container
    .register<IUserDao>("IUserDao", UserDaoMock)
    .register<IJwtService>("IJwtService", JwtService)

export {container};
