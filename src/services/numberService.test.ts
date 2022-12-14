import { IDatabase } from "../interfaces/db/db";
import { INumberService } from "../interfaces/services/numberService";
import { successMessages } from "../shared/responseMessages/successMessages";
import { MockDatabase } from "./userService.test";
import NumberService from "./numberService";

describe("NumberService testing ...", () => {
  let mockDatabase: IDatabase;
  let numberService: INumberService;

  beforeEach(() => {
    jest.clearAllMocks();
    mockDatabase = new MockDatabase();
    numberService = new NumberService(mockDatabase);
  });

  describe("Method INSERT", () => {
    test("Should return successMessage", async () => {
      const inputData = {
        id: 41,
        value: "+15 84 91234-4321",
        monthyPrice: "0.03",
        setupPrice: "3.40",
        currency: "U$",
      };

      jest
        .spyOn(mockDatabase, "insertNumber")
        .mockImplementation(() =>
          Promise.resolve(successMessages.numberCreate)
        );

      const result = await numberService.createNumber(inputData);
      expect(result).toStrictEqual(successMessages.numberCreate);
    });
  });

  describe("Method UPDATE", () => {
    test("Should return successMessage", async () => {
      const inputData = {
        id: 41,
        fieldsToUpdate: {
          monthlyPrice: "0.03",
          setupPrice: "3.40",
        },
      };

      jest
        .spyOn(mockDatabase, "updateNumber")
        .mockImplementation(() =>
          Promise.resolve(successMessages.numberUpdate)
        );

      const result = await numberService.updateNumber(
        inputData.id,
        inputData.fieldsToUpdate
      );

      expect(result).toStrictEqual(successMessages.numberUpdate);
    });
  });

  describe("Method FINDONE", () => {
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

      const result = await numberService.getOneNumber(inputData.id);
      expect(result).toStrictEqual(expectedData);
    });
  });

  describe("Method FINDBYVALUE", () => {
    test("Should get Number", async () => {
      const expectedData = {
        id: 41,
        value: "+15 84 91234-4321",
        monthyPrice: "0.03",
        setupPrice: "3.40",
        currency: "U$",
      };

      const inputData = {
        value: "+15 84 91234-4321",
      };

      jest
        .spyOn(mockDatabase, "findOneNumberByValue")
        .mockImplementation(() => Promise.resolve(expectedData));

      const result = await numberService.getOneNumberByValue(inputData.value);
      expect(result).toStrictEqual(expectedData);
    });
  });

  describe("Method FINDALL", () => {
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

      const result = await numberService.getAllNumbers();
      expect(result).toStrictEqual(expectedData);
    });
  });

  describe("Method DELETE", () => {
    test("Should return successMessage", async () => {
      jest
        .spyOn(mockDatabase, "deleteNumber")
        .mockImplementation(() =>
          Promise.resolve(successMessages.numberDelete)
        );

      const inputData = {
        id: 41,
      };

      const result = await numberService.deleteNumber(inputData.id);
      expect(result).toStrictEqual(successMessages.numberDelete);
    });
  });
});
