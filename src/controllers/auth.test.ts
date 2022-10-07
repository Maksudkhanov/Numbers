import request from "supertest";
import db from "../db/db";
import { UserRoles } from "../interfaces/entities/user";
import server from "../server";
import { successMessages } from "../shared/responseMessages/successMessages";
import auth from "./auth";

describe("Auth router", () => {
  beforeAll(() => {
    server.use("/auth", auth);
  });

  afterAll(() => {
    db.disconnect();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /auth/signup", () => {
    test("Should create User", async () => {
      const reqBody = {
        username: "Maksudkhanov",
        password: "admin",
        role: UserRoles.ADMIN,
      };

      const response = await request(server).post("/auth/signup").send(reqBody);

      expect(response.status).toBe(201);
      expect(response.body).toStrictEqual(successMessages.userCreate);
    });
  });

  describe("POST /auth/signin", () => {
    test("Should give token to User", async () => {
      const reqBody = {
        username: "Maksudkhanov",
        password: "admin",
        role: UserRoles.ADMIN,
      };

      const response = await request(server).post("/auth/signin").send(reqBody);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("token");
    });
  });
});
