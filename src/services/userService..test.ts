import { IDatabase } from "../interfaces/db/db";
import { ISuccessMessage } from "../interfaces/db/successMessage";
import { IFieldsToUpdate } from "../interfaces/entities/number/fieldsToUpdate";
import { INumber } from "../interfaces/entities/number/number";
import { IUser, UserRoles } from "../interfaces/entities/user";
import { successMessages } from "../shared/responseMessages/successMessages";

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
  findOneUser(user: IUser): Promise<IUser | null> {
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

  beforeEach(() => {
    jest.clearAllMocks();
    mockDatabase = new MockDatabase();
  });

  describe("SignUp User", () => {
    test("Should return successMessage", async () => {
      jest
        .spyOn(mockDatabase, "insertUser")
        .mockImplementation(() => Promise.resolve(successMessages.userCreate));

      const inputData = {
        username: "Maksudkhanov",
        password: "admin",
        role: UserRoles.ADMIN,
      };

      const result = await mockDatabase.insertUser(inputData);
      expect(result).toStrictEqual(successMessages.userCreate);
    });
  });

  describe("SigIn User", () => {
    test("Should return User", async () => {
      const inputData = {
        username: "Maksudkhanov",
        password: "admin",
        role: UserRoles.ADMIN,
      };

      const expectedData = {
        username: "Maksudkhanov",
        password: "hashpassword",
        role: UserRoles.ADMIN,
      };
      jest
        .spyOn(mockDatabase, "findOneUser")
        .mockImplementation(() => Promise.resolve(expectedData));

      const result = await mockDatabase.findOneUser(inputData);
      expect(result).toStrictEqual(expectedData);
    });
  });
});
