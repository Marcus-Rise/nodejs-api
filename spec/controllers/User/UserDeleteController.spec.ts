import {container} from "@/services/serviceContainer";
import {IUserRepository} from "@/repositories/User/IUserRepository";
import {mock} from 'jest-mock-extended';
import app from "@/Server";
import supertest, {Test} from "supertest";
import {login} from "../../LoginAgent";
import {DeleteResult} from "typeorm";
import {UserRoles} from "@/entities/UserRoles";

describe("UserDeleteController", () => {
    let request: Test;
    let jwtCookie: string;

    beforeEach((done) => {
        const agent = supertest.agent(app);
        login(agent, [UserRoles.Admin],(cookie: string) => {
            jwtCookie = cookie;
            request = agent.delete("/api/user/1");
            done();
        });
    });

    describe("delete", () => {
        test("200", async () => {
            const userRepositoryMock = mock<IUserRepository>();

            userRepositoryMock.delete.mockResolvedValueOnce(new DeleteResult());

            container.register("IUserRepository", {
                useValue: userRepositoryMock,
            });

            const res = await request.set("Cookie", jwtCookie);

            expect(res.status).toBe(200);
        });
    });
})
