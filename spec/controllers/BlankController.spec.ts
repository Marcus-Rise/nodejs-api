import request from "supertest";
import app from "@/Server";
import {IUser} from "@/models/IUser";

describe("BlankController", () => {
    test("get", async () => {
        const res = await request(app)
            .get("/api");

        const users: IUser[] = res.body;

        expect(res.status).toBe(200);
        expect(users).toHaveLength(100);
    });
});
