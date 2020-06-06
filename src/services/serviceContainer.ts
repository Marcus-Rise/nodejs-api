import "reflect-metadata";
import {container} from "tsyringe";
import {IJwtService} from "./IJwtService";
import {JwtService} from "./implementations/JwtService";
import {UserRepository} from "@/repositories/User/UserRepository";
import {IUserRepository} from "@/repositories/User/IUserRepository";
import {getCustomRepository} from "typeorm";

container
    .register<IJwtService>("IJwtService", JwtService)
    .register<IUserRepository>("IUserRepository", {
        useFactory: () => {
            return getCustomRepository(UserRepository);
        }
    });

export {container};
