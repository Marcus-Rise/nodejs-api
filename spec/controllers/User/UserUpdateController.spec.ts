import {container} from "@/services/serviceContainer";
import {IUserRepository} from "@/repositories/User/IUserRepository";
import {mock} from 'jest-mock-extended';
import app from "@/Server";
import supertest, {Test} from "supertest";
import {login} from "../../LoginAgent";
import {UpdateResult} from "typeorm";
import {IUser} from "@/models/IUser";
import {UserRoles} from "@/entities/UserRoles";

describe("UserUpdateController", () => {
    let request: Test;
    let jwtCookie: string;

    beforeEach((done) => {
        const agent = supertest.agent(app);
        login(agent, [UserRoles.Admin],(cookie: string) => {
            jwtCookie = cookie;
            request = agent.put("/api/user/1");
            done();
        });
    });

    describe("update", () => {
        test("200", async () => {
            const userRepositoryMock = mock<IUserRepository>();

            userRepositoryMock.update.mockResolvedValueOnce(new UpdateResult());

            container.register("IUserRepository", {
                useValue: userRepositoryMock,
            });

            const res = await request
                .set("Cookie", jwtCookie)
                .send(<IUser>{
                    email: "email",
                    name: "name",
                    roles: [UserRoles.Standard],
                });

            expect(res.status).toBe(200);
        });
    });
})
