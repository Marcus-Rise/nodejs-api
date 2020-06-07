import {container} from "@/services/serviceContainer";
import {IUserRepository} from "@/repositories/User/IUserRepository";
import {mock} from 'jest-mock-extended';
import User from "@/entities/User.entity";
import app from "@/Server";
import request, {SuperTest, Test} from "supertest";
import {IUserRegister} from "@/models/IUserRegister";
import {login} from "../../LoginAgent";

describe("UserCreateController", () => {
    let appAgent: SuperTest<Test>;
    let jwtCookie: string;

    beforeEach((done) => {
        appAgent = request.agent(app);
        login(appAgent, (cookie: string) => {
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

            const res = await appAgent
                .post("/api/user")
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

                const res = await appAgent
                    .post("/api/user")
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

                const res = await appAgent
                    .post("/api/user")
                    .set("Cookie", jwtCookie);

                expect(res.status).toBe(400);
            });
        });
    });
})
