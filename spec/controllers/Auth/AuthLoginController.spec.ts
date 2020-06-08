import {container} from "@/services/serviceContainer";
import {IUserRepository} from "@/repositories/User/IUserRepository";
import {mock} from 'jest-mock-extended';
import User from "@/entities/User.entity";
import app from "@/Server";
import supertest, {Test} from "supertest";
import {UserRoles} from "@/entities/UserRoles";
import bcrypt from "bcrypt";
import {pwdSaltRounds} from "@/shared/constants";

describe("AuthLoginController", () => {
    describe("login", () => {
        let request: Test;

        beforeEach(() => {
            request = supertest(app)
                .post("/api/auth/login");
        });

        test("200", async () => {
            const password = "p";
            const user = new User(
                "test",
                "email@email.email",
                [UserRoles.Standard],
                bcrypt.hashSync(password, pwdSaltRounds),
            );

            const userRepositoryMock = mock<IUserRepository>();

            userRepositoryMock.findOne.mockResolvedValueOnce(user);

            container.register("IUserRepository", {
                useValue: userRepositoryMock,
            });

            const res = await request.send({email: user.email, password});

            expect(res.status).toBe(200);
            expect(res.header["set-cookie"]).toHaveLength(1);
        });

        test("400", async () => {
            const userRepositoryMock = mock<IUserRepository>();

            container.register("IUserRepository", {
                useValue: userRepositoryMock,
            });

            const res = await request;

            expect(res.status).toBe(400);
        });

        describe("401", () => {
            test("user not found", async () => {
                const userRepositoryMock = mock<IUserRepository>();

                userRepositoryMock.findOne.mockResolvedValueOnce(undefined);

                container.register("IUserRepository", {
                    useValue: userRepositoryMock,
                });

                const res = await request.send({email: "email@email.email", password: "password"});

                expect(res.status).toBe(401);
            });

            test("wrong password", async () => {
                const userRepositoryMock = mock<IUserRepository>();

                userRepositoryMock.findOne.mockResolvedValueOnce(new User());

                container.register("IUserRepository", {
                    useValue: userRepositoryMock,
                });

                const res = await request.send({email: "email@email.email", password: "password"});

                expect(res.status).toBe(401);
            });
        });
    });
})
