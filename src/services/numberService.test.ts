import { resolve } from "path";
import { IDatabase } from "../interfaces/db/db";
import { INumber } from "../interfaces/entities/number/number";
import { successMessages } from "../shared/responseMessages/successMessages";
import { MockDatabase } from "./userService..test";

describe("NumberService testing ...", () => {
  let mockDatabase: IDatabase;
  beforeEach(() => {
    jest.clearAllMocks();
    mockDatabase = new MockDatabase();
  });

  describe("Create Number", () => {
    test("Should return successMessage", async () => {
      jest
        .spyOn(mockDatabase, "insertNumber")
        .mockImplementation(() =>
          Promise.resolve(successMessages.numberCreate)
        );

      const inputData = {
        id: 41,
        value: "+15 84 91234-4321",
        monthyPrice: "0.03",
        setupPrice: "3.40",
        currency: "U$",
      };

      const result = await mockDatabase.insertNumber(inputData);
      expect(result).toStrictEqual(successMessages.numberCreate);
    });
  });

  describe("Update Number", () => {
    test("Should return successMessage", async () => {
      jest
        .spyOn(mockDatabase, "updateNumber")
        .mockImplementation(() =>
          Promise.resolve(successMessages.numberUpdate)
        );

      const inputData = {
        id: 41,
        fieldsToUpdate: {
          monthlyPrice: "0.03",
          setupPrice: "3.40",
        },
      };

      const result = await mockDatabase.updateNumber(
        inputData.id,
        inputData.fieldsToUpdate
      );
      expect(result).toStrictEqual(successMessages.numberUpdate);
    });
  });

  describe("Delete Number", () => {
    test("Should return successMessage", async () => {
      jest
        .spyOn(mockDatabase, "deleteNumber")
        .mockImplementation(() =>
          Promise.resolve(successMessages.numberDelete)
        );

      const inputData = {
        id: 41,
      };

      const result = await mockDatabase.deleteNumber(inputData.id);
      expect(result).toStrictEqual(successMessages.numberDelete);
    });
  });

  describe("Get Number", () => {
    test("Should get Number", async () => {
      const expectedData = {
        id: 41,
        value: "+15 84 91234-4321",
        monthyPrice: "0.03",
        setupPrice: "3.40",
        currency: "U$",
      };

      const inputData = {
        id: 41,
      };

      jest
        .spyOn(mockDatabase, "findOneNumber")
        .mockImplementation(() => Promise.resolve(expectedData));

      const result = await mockDatabase.findOneNumber(inputData.id);
      expect(result).toStrictEqual(expectedData);
    });
  });

  describe("Get All Numbers", () => {
    test("Should get all Numbers", async () => {
      const expectedData = [
        {
          id: 41,
          value: "+15 84 91234-4321",
          monthyPrice: "0.03",
          setupPrice: "3.40",
          currency: "U$",
        },
      ];

      jest
        .spyOn(mockDatabase, "findAllNumbers")
        .mockImplementation(() => Promise.resolve(expectedData));

      const result = await mockDatabase.findAllNumbers();
      expect(result).toStrictEqual(expectedData);
    });
  });
});
