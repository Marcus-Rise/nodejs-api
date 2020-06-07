import app from "@/Server";
import request from "supertest";

describe("AuthLogoutController", () => {
    describe("logout", () => {
        test("200", async () => {
            const res = await request(app)
                .get("/api/auth/logout")

            expect(res.status).toBe(200);
        });
    });
})
