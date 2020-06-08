import {container} from "@/services/serviceContainer";
import {IUserRepository} from "@/repositories/User/IUserRepository";
import {mock} from 'jest-mock-extended';
import User from "@/entities/User.entity";
import app from "@/Server";
import supertest, {Test} from "supertest";
import {IUserRegister} from "@/models/IUserRegister";

describe("AuthRegisterController", () => {
    describe("create", () => {
        let request: Test;

        beforeEach(() => {
            request = supertest(app)
                .post("/api/auth/register");
        });

        test("201", async () => {
            const userRepositoryMock = mock<IUserRepository>();

            userRepositoryMock.findOne.mockResolvedValueOnce(undefined);

            container.register("IUserRepository", {
                useValue: userRepositoryMock,
            });

            const res = await request.send(<IUserRegister>{
                name: "name",
                email: "test@test.test",
                password: "p",
            });

            expect(res.status).toBe(201);
        });

        describe("400", () => {
            test("user already exist", async () => {
                const userRepositoryMock = mock<IUserRepository>();

                const user = new User(
                    "name",
                    "test@test.test"
                );

                userRepositoryMock.findOne.mockResolvedValueOnce(user);

                container.register("IUserRepository", {
                    useValue: userRepositoryMock,
                });

                const res = await request.send(<IUserRegister>{
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

                const res = await request;

                expect(res.status).toBe(400);
            });
        });
    });
})
