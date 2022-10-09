import request from "supertest";
import db from "../db/db";
import { ISuccessMessage } from "../interfaces/db/successMessage";
import { IUser, UserRoles } from "../interfaces/entities/user";
import { IUserService } from "../interfaces/services/userService";
import server from "../server";
import { successMessages } from "../shared/responseMessages/successMessages";
import auth from "./auth";
class MockUserService implements IUserService {
  getOneUser(user: IUser): Promise<IUser | null> {
    throw new Error("Method not implemented.");
  }
  insertOneUser(user: IUser): Promise<ISuccessMessage> {
    throw new Error("Method not implemented.");
  }
  getOneUserByUsername(username: string): Promise<IUser | null> {
    throw new Error("Method not implemented.");
  }
}
describe("Auth router", () => {
  let mockUserService: IUserService;
  beforeAll(() => {
    server.use("/auth", auth);
    mockUserService = new MockUserService();
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

      jest
        .spyOn(mockUserService, "insertOneUser")
        .mockImplementation(() => Promise.resolve(successMessages.userCreate));

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
