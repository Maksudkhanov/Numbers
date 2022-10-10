import request from "supertest";
import { ISuccessMessage } from "../interfaces/messages/successMessage";
import { IUser, UserRoles } from "../interfaces/entities/user";
import { IUserService } from "../interfaces/services/userService";
import server from "../server";
import { successMessages } from "../shared/responseMessages/successMessages";
import authController from "./auth";
import bcrypt from "bcryptjs";
import { errorMessages } from "../shared/responseMessages/errorMessages";
import { isNull } from "util";

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
  let reqBody: IUser;

  beforeAll(() => {
    mockUserService = new MockUserService();
    const auth = authController(mockUserService);
    server.use("/auth", auth);
    reqBody = {
      username: "Maksudkhanov",
      password: "admin",
      role: UserRoles.ADMIN,
    };
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /auth/signup", () => {
    beforeAll(() => {
      jest.spyOn(bcrypt, "genSaltSync").mockImplementation(() => "SALT");

      jest.spyOn(bcrypt, "hashSync").mockImplementation(() => "hashPassword");

      jest
        .spyOn(mockUserService, "getOneUserByUsername")
        .mockImplementation(() => Promise.resolve(null));
    });
    test("Should create User", async () => {
      jest
        .spyOn(mockUserService, "insertOneUser")
        .mockImplementation(() => Promise.resolve(successMessages.userCreate));
      const response = await request(server).post("/auth/signup").send(reqBody);

      expect(response.status).toBe(201);
      expect(mockUserService.insertOneUser).toBeCalledTimes(1);
      expect(response.body).toStrictEqual(successMessages.userCreate);
    });

    test("Should return 500 with error msg", async () => {
      jest
        .spyOn(mockUserService, "insertOneUser")
        .mockImplementation(() => Promise.reject(errorMessages.userCreate));
      const response = await request(server).post("/auth/signup").send(reqBody);

      expect(response.status).toBe(500);
      expect(mockUserService.insertOneUser).toBeCalledTimes(1);
      expect(response.body).toStrictEqual(errorMessages.userCreate);
    });
  });

  describe("POST /auth/signin", () => {
    test("Should give token to User", async () => {
      const reqBody = {
        username: "Maksudkhanov",
        password: "admin",
        role: UserRoles.ADMIN,
      };

      jest
        .spyOn(mockUserService, "getOneUserByUsername")
        .mockImplementation(() => Promise.resolve(reqBody));

      jest.spyOn(bcrypt, "compareSync").mockImplementation(() => true);

      const response = await request(server).post("/auth/signin").send(reqBody);

      expect(response.status).toBe(201);
      expect(mockUserService.getOneUserByUsername).toBeCalledTimes(1);
      expect(response.body).toHaveProperty("token");
    });

    test("Should return 404 with error msg", async () => {
      const reqBody = {
        username: "Maksudkhanov",
        password: "admin",
        role: UserRoles.ADMIN,
      };

      jest
        .spyOn(mockUserService, "getOneUserByUsername")
        .mockImplementation(() => Promise.resolve(null));

      const response = await request(server).post("/auth/signin").send(reqBody);

      expect(response.status).toBe(404);
      expect(response.body).toStrictEqual(errorMessages.userNotExists);
    });

    test("Should return 500 with error msg", async () => {
      const reqBody = {
        username: "Maksudkhanov",
        password: "admin",
        role: UserRoles.ADMIN,
      };

      jest
        .spyOn(mockUserService, "getOneUserByUsername")
        .mockImplementation(() => Promise.reject(errorMessages.userGet));

      const response = await request(server).post("/auth/signin").send(reqBody);

      expect(response.status).toBe(500);
      expect(response.body).toStrictEqual(errorMessages.userGet);
    });

    test("Should return 400 with error msg", async () => {
      const reqBody = {
        username: "Maksudkhanov",
        password: "admin",
        role: UserRoles.ADMIN,
      };

      jest
        .spyOn(mockUserService, "getOneUserByUsername")
        .mockImplementation(() => Promise.resolve(reqBody));

      jest.spyOn(bcrypt, "compareSync").mockImplementation(() => false);

      const response = await request(server).post("/auth/signin").send(reqBody);

      expect(response.status).toBe(400);
      expect(response.body).toStrictEqual(errorMessages.userIncorrectPassword);
    });
  });
});
