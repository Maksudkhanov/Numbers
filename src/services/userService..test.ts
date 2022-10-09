import { IDatabase } from "../interfaces/db/db";
import { UserRoles } from "../interfaces/entities/user";
import { IUserService } from "../interfaces/services/userService";
import { successMessages } from "../shared/responseMessages/successMessages";
import { MockDatabase } from "./mockDatabase";
import { UserService } from "./userService";

describe("UserService testing ...", () => {
  let mockDatabase: IDatabase;
  let userService: IUserService;

  beforeEach(() => {
    jest.clearAllMocks();
    mockDatabase = new MockDatabase();
    userService = new UserService(mockDatabase);
  });

  describe("Method INSERT", () => {
    test("Should return successMessage", async () => {
      const inputData = {
        username: "Maksudkhanov",
        password: "admin",
        role: UserRoles.ADMIN,
      };

      jest
        .spyOn(mockDatabase, "insertUser")
        .mockImplementation(() => Promise.resolve(successMessages.userCreate));

      const result = await userService.insertOneUser(inputData);
      expect(result).toStrictEqual(successMessages.userCreate);
    });
  });

  describe("Method FINDONE", () => {
    test("Should return User", async () => {
      const expectedData = {
        username: "Maksudkhanov",
        password: "hashPassword",
        role: UserRoles.ADMIN,
      };

      jest
        .spyOn(mockDatabase, "findOneUserByUsername")
        .mockImplementation(() => Promise.resolve(expectedData));

      const result = await userService.getOneUserByUsername("Maksudkhanov");
      expect(result).toStrictEqual(expectedData);
    });
  });
});
