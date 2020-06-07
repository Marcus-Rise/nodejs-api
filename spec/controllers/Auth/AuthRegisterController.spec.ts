import {container} from "@/services/serviceContainer";
import {IUserRepository} from "@/repositories/User/IUserRepository";
import {mock} from 'jest-mock-extended';
import User from "@/entities/User.entity";
import app from "@/Server";
import request from "supertest";
import {IUserRegister} from "@/models/IUserRegister";

describe("AuthRegisterController", () => {
    describe("create", () => {
        test("200", async () => {
            const userRepositoryMock = mock<IUserRepository>();

            userRepositoryMock.findOne.mockResolvedValueOnce(undefined);

            container.register("IUserRepository", {
                useValue: userRepositoryMock,
            });

            const res = await request(app)
                .post("/api/auth/register")
                .send(<IUserRegister>{name: "name", email: "test", password: "p"});

            expect(res.status).toBe(201);
        });

        describe("400", () => {
            test("user already exist", async () => {
                const userRepositoryMock = mock<IUserRepository>();

                const user = new User(
                  "name",
                  "email"
                );

                userRepositoryMock.findOne.mockResolvedValueOnce(user);

                container.register("IUserRepository", {
                    useValue: userRepositoryMock,
                });

                const res = await request(app)
                    .post("/api/auth/register")
                    .send(<IUserRegister>{
                        name: user.name,
                        email: user.email,
                        password: "p"
                    });

                expect(res.status).toBe(400);
            });

            test("empty credentials", async () => {
                const userRepositoryMock = mock<IUserRepository>();

                userRepositoryMock.findOne.mockResolvedValueOnce(new User());

                container.register("IUserRepository", {
                    useValue: userRepositoryMock,
                });

                const res = await request(app)
                    .post("/api/auth/login")

                expect(res.status).toBe(400);
            });
        });
    });
})
