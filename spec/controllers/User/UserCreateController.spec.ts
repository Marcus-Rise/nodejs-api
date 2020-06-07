import {container} from "@/services/serviceContainer";
import {IUserRepository} from "@/repositories/User/IUserRepository";
import {mock} from 'jest-mock-extended';
import User from "@/entities/User.entity";
import app from "@/Server";
import supertest, {Test} from "supertest";
import {IUserRegister} from "@/models/IUserRegister";
import {login} from "../../LoginAgent";
import {UserRoles} from "@/entities/UserRoles";

describe("UserCreateController", () => {
    let request: Test;
    let jwtCookie: string;

    beforeEach((done) => {
        const agent = supertest.agent(app);
        request = agent.post("/api/user");

        login(agent, [UserRoles.Admin], (cookie: string) => {
            jwtCookie = cookie;
            done();
        });
    });


    describe("create", () => {
        test("201", async () => {
            const userRepositoryMock = mock<IUserRepository>();

            userRepositoryMock.findOne.mockResolvedValueOnce(undefined);

            container.register("IUserRepository", {
                useValue: userRepositoryMock,
            });

            const res = await request
                .set("Cookie", jwtCookie)
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

                const res = await request
                    .set("Cookie", jwtCookie)
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

                const res = await request
                    .set("Cookie", jwtCookie);

                expect(res.status).toBe(400);
            });
        });

        describe("403", () => {
            test("unauthorized", async () => {
                const userRepositoryMock = mock<IUserRepository>();

                const user = new User(
                    "name",
                    "email"
                );

                userRepositoryMock.findOne.mockResolvedValueOnce(user);

                container.register("IUserRepository", {
                    useValue: userRepositoryMock,
                });

                const res = await request
                    .send(<IUserRegister>{
                        name: user.name,
                        email: user.email,
                        password: "p"
                    });

                expect(res.status).toBe(403);
            });
        });
    });
})
