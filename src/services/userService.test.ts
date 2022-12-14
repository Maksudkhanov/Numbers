import { IDatabase } from "../interfaces/db/db";
import { ISuccessMessage } from '../interfaces/messages/successMessage';
import { IFieldsToUpdate } from '../interfaces/entities/number/fieldsToUpdate';
import { INumber } from '../interfaces/entities/number/number';
import { IUser, UserRoles } from "../interfaces/entities/user";
import { IUserService } from "../interfaces/services/userService";
import { successMessages } from "../shared/responseMessages/successMessages";
import { UserService } from "./userService";


export class MockDatabase implements IDatabase {
  findOneNumber(id: number): Promise<INumber | null> {
    throw new Error("Method not implemented.");
  }
  findOneNumberByValue(value: string): Promise<INumber | null> {
    throw new Error("Method not implemented.");
  }
  findAllNumbers(): Promise<INumber[] | []> {
    throw new Error("Method not implemented.");
  }
  insertNumber(number: INumber): Promise<ISuccessMessage> {
    throw new Error("Method not implemented.");
  }
  updateNumber(id: number, fields: IFieldsToUpdate): Promise<ISuccessMessage> {
    throw new Error("Method not implemented.");
  }
  deleteNumber(id: number): Promise<ISuccessMessage> {
    throw new Error("Method not implemented.");
  }
  insertUser(user: IUser): Promise<ISuccessMessage> {
    throw new Error("Method not implemented.");
  }
  findOneUserByUsername(username: string): Promise<IUser | null> {
    throw new Error("Method not implemented.");
  }
}
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
