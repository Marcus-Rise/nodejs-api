import "reflect-metadata";
import {container} from "tsyringe";
import {IUserDao} from "@daos/User/IUserDao";
import {IJwtService} from "./IJwtService";
import {JwtService} from "./implementations/JwtService";
import {UserDao} from "@daos/User/UserDao";

container
    .register<IUserDao>("IUserDao", UserDao)
    .register<IJwtService>("IJwtService", JwtService)

export {container};
