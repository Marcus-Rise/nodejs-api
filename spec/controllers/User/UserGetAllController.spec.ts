import supertest, {Test} from "supertest";
import app from "@/Server";
import {IUser} from "@/models/IUser";
import {login} from "../../LoginAgent";
import {mock} from "jest-mock-extended";
import {IUserRepository} from "@/repositories/User/IUserRepository";
import {container} from "@/services/serviceContainer";
import User from "@/entities/User.entity";
import {UserRoles} from "@/entities/UserRoles";

describe("UserGetAllController", () => {
    let request: Test;
    let jwtCookie: string;

    beforeEach((done) => {
        const agent = supertest.agent(app);
        login(agent, [UserRoles.Admin],(cookie: string) => {
            jwtCookie = cookie;
            request = agent.get("/api/user");
            done();
        });
    });

    describe("get", () => {
        test("200", async () => {
            const userRepositoryMock = mock<IUserRepository>();

            userRepositoryMock.find.mockResolvedValueOnce([new User()]);

            container.register("IUserRepository", {
                useValue: userRepositoryMock,
            });

            const res = await request.set("Cookie", jwtCookie);

            const users: IUser[] = res.body;

            expect(res.status).toBe(200);
            expect(users).toHaveLength(1);
        });
    });
});
