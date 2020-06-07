import supertest, {Test} from "supertest";
import app from "@/Server";
import {login} from "../LoginAgent";
import {mock} from "jest-mock-extended";
import {IUserRepository} from "@/repositories/User/IUserRepository";
import {container} from "@/services/serviceContainer";
import {IUserRegister} from "@/models/IUserRegister";

describe("AuthedMiddleWare", () => {
    let request: Test;
    let jwtCookie: string;

    beforeEach((done) => {
        const agent = supertest.agent(app);
        login(agent, (cookie: string) => {
            jwtCookie = cookie;
            request = agent.post("/api/user");
            done();
        });
    });

    describe("401", () => {
        test("unauthorized", async () => {
            const userRepositoryMock = mock<IUserRepository>();

            container.register("IUserRepository", {
                useValue: userRepositoryMock,
            });

            const res = await request
                .send(<IUserRegister>{name: "name", email: "test", password: "p"});

            expect(res.status).toBe(401);
        });
    });
});
