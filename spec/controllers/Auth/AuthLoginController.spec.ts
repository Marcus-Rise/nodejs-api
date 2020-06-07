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
    describe("login", () => {
        test("200", async () => {
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

        test("400", async () => {
            const userRepositoryMock = mock<IUserRepository>();

            container.register("IUserRepository", {
                useValue: userRepositoryMock,
            });

            const res = await request(app)
                .post("/api/auth/login");

            expect(res.status).toBe(400);
        });

        describe("401", () => {
            test("user not found", async () => {
                const userRepositoryMock = mock<IUserRepository>();

                userRepositoryMock.findOne.mockResolvedValue(undefined);

                container.register("IUserRepository", {
                    useValue: userRepositoryMock,
                });

                const res = await request(app)
                    .post("/api/auth/login")
                    .send({email: "test", password: "password"});

                expect(res.status).toBe(401);
            });

            test("wrong password", async () => {
                const userRepositoryMock = mock<IUserRepository>();

                userRepositoryMock.findOne.mockResolvedValue(new User());

                container.register("IUserRepository", {
                    useValue: userRepositoryMock,
                });

                const res = await request(app)
                    .post("/api/auth/login")
                    .send({email: "test", password: "password"});

                expect(res.status).toBe(401);
            });
        });
    });
})
