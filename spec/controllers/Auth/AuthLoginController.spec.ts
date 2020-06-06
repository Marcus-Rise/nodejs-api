import {container} from "@/services/serviceContainer";
import {IUserRepository} from "@/repositories/User/IUserRepository";
import {mock} from 'jest-mock-extended';
import User from "@/entities/User.entity";
import app from "@/Server";
import request from "supertest";
import {UserRoles} from "@/entities/UserRoles";
import bcrypt from "bcrypt";
import {pwdSaltRounds} from "@/shared/constants";

describe("AuthLoginController", () => {
    test("login", async () => {
        const userRepositoryMock = mock<IUserRepository>();
        const password = "p";

        userRepositoryMock.findOne.mockResolvedValue(new User(
            "test",
            "email",
            UserRoles.Standard,
            bcrypt.hashSync(password, pwdSaltRounds),
        ));

        container.register("IUserRepository", {
            useValue: userRepositoryMock,
        });

        const res = await request(app)
            .post("/api/auth/login")
            .send({email: "test", password});

        expect(res.status).toBe(200);
    });
})
