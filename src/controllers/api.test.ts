import request from "supertest";
import { ISuccessMessage } from "../interfaces/messages/successMessage";
import { IFieldsToUpdate } from "../interfaces/entities/number/fieldsToUpdate";
import { INumber } from "../interfaces/entities/number/number";
import { UserRoles } from "../interfaces/entities/user";
import { INumberService } from "../interfaces/services/numberService";
import server from "../server";
import { successMessages } from "../shared/responseMessages/successMessages";
import * as util from "../utils/paginateItems";
import apiController from "./api";
import auth from "./auth";
import jwt from "jsonwebtoken";
import { errorMessages } from "../shared/responseMessages/errorMessages";

export class MockNumberService implements INumberService {
  getAllNumbers(): Promise<INumber[]> {
    throw new Error("Method not implemented.");
  }
  getOneNumber(id: number): Promise<INumber | null> {
    throw new Error("Method not implemented.");
  }
  updateNumber(id: number, fields: IFieldsToUpdate): Promise<ISuccessMessage> {
    throw new Error("Method not implemented.");
  }
  deleteNumber(id: number): Promise<ISuccessMessage> {
    throw new Error("Method not implemented.");
  }
  getOneNumberByValue(value: string): Promise<INumber | null> {
    throw new Error("Method not implemented.");
  }
  createNumber(number: INumber): Promise<ISuccessMessage> {
    throw new Error("Method not implemented.");
  }
}

describe("Testing Api Router", () => {
  let mockNumberService: INumberService;

  beforeAll(async () => {
    mockNumberService = new MockNumberService();
    const api = apiController(mockNumberService);
    server.use("/api", api);
    server.use("/auth", auth);

    const jwtVerifyData = {
      username: "Maksudkhanov",
      role: UserRoles.ADMIN,
    };

    jest.spyOn(jwt, "verify").mockImplementation(() => jwtVerifyData);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /api/number", () => {
    let reqBody: INumber;

    beforeAll(() => {
      reqBody = {
        id: 41,
        value: "+15 84 91234-4321",
        monthyPrice: "0.03",
        setupPrice: "3.40",
        currency: "U$",
      };

      jest
        .spyOn(mockNumberService, "getOneNumber")
        .mockImplementation(() => Promise.resolve(null));

      jest
        .spyOn(mockNumberService, "getOneNumberByValue")
        .mockImplementation(() => Promise.resolve(null));
    });

    test("Should create Number", async () => {
      jest
        .spyOn(mockNumberService, "createNumber")
        .mockImplementation(() =>
          Promise.resolve(successMessages.numberCreate)
        );

      const response = await request(server)
        .post("/api/number")
        .send(reqBody)
        .set("Authorization", "Bearer TOKEN");

      expect(response.status).toBe(200);
      expect(mockNumberService.createNumber).toBeCalledTimes(1);
      expect(response.body).toStrictEqual(successMessages.numberCreate);
    });

    test("Should 500 with error msg", async () => {
      jest
        .spyOn(mockNumberService, "createNumber")
        .mockImplementation(() => Promise.reject(errorMessages.numberCreate));

      const response = await request(server)
        .post("/api/number")
        .set("Authorization", "Bearer TOKEN")
        .send(reqBody);

      expect(response.status).toBe(500);
      expect(mockNumberService.createNumber).toBeCalledTimes(1);
      expect(response.body).toStrictEqual(errorMessages.numberCreate);
    });
  });

  describe("GET /api/allNumbers", () => {
    test("Should return all Numbers", async () => {
      const data = [
        {
          id: 41,
          value: "+15 84 91234-4321",
          monthyPrice: "0.03",
          setupPrice: "3.40",
          currency: "U$",
        },
      ];
      const expectedData = {
        results: data,
      };

      jest
        .spyOn(mockNumberService, "getAllNumbers")
        .mockImplementation(() => Promise.resolve(data));

      jest
        .spyOn(util, "paginateItems")
        .mockImplementation(
          (items: any) => (page: number, limit: number) => expectedData
        );

      const response = await request(server).get("/api/allNumbers");

      expect(response.status).toBe(201);
      expect(mockNumberService.getAllNumbers).toBeCalledTimes(1);
      expect(response.body).toStrictEqual(expectedData);
    });

    test("Should 404 with error msg", async () => {
      jest
        .spyOn(mockNumberService, "getAllNumbers")
        .mockImplementation(() => Promise.resolve([]));

      const response = await request(server).get("/api/allNumbers");

      expect(response.status).toBe(404);
      expect(mockNumberService.getAllNumbers).toBeCalledTimes(1);
      expect(response.body).toStrictEqual(errorMessages.numberNoOne);
    });

    test("Should 500 with error msg", async () => {
      jest
        .spyOn(mockNumberService, "getAllNumbers")
        .mockImplementation(() => Promise.reject(errorMessages.numbersGet));

      const response = await request(server).get("/api/allNumbers");

      expect(response.status).toBe(500);
      expect(mockNumberService.getAllNumbers).toBeCalledTimes(1);
      expect(response.body).toStrictEqual(errorMessages.numbersGet);
    });
  });

  describe("GET /api/number", () => {
    test("Should return Number with given id", async () => {
      const expectedData = {
        id: 41,
        value: "+15 84 91234-4321",
        monthyPrice: "0.03",
        setupPrice: "3.40",
        currency: "U$",
      };

      jest
        .spyOn(mockNumberService, "getOneNumber")
        .mockImplementation(() => Promise.resolve(expectedData));

      const response = await request(server)
        .get("/api/number")
        .send({ id: 41 });

      expect(response.status).toBe(201);
      expect(mockNumberService.getOneNumber).toBeCalledTimes(1);
      expect(response.body).toStrictEqual(expectedData);
    });

    test("Should return 404 with error msg", async () => {
      jest
        .spyOn(mockNumberService, "getOneNumber")
        .mockImplementation(() => Promise.resolve(null));

      const response = await request(server)
        .get("/api/number")
        .send({ id: 41 });

      expect(response.status).toBe(404);
      expect(mockNumberService.getOneNumber).toBeCalledTimes(1);
      expect(response.body).toStrictEqual(errorMessages.numberNoId);
    });

    test("Should 500 with error msg", async () => {
      jest
        .spyOn(mockNumberService, "getOneNumber")
        .mockImplementation(() => Promise.reject(errorMessages.numberGet));

      const response = await request(server).get("/api/number");

      expect(response.status).toBe(500);
      expect(mockNumberService.getOneNumber).toBeCalledTimes(1);
      expect(response.body).toStrictEqual(errorMessages.numberGet);
    });
  });

  describe("PUT /api/number", () => {
    let reqBody: { id: number; fieldsToUpdate: IFieldsToUpdate };

    beforeAll(() => {
      reqBody = {
        id: 41,
        fieldsToUpdate: {
          monthlyPrice: "4",
          setupPrice: "5",
        },
      };

      const middleareData = {
        id: 41,
        value: "+15 84 91234-4321",
        monthyPrice: "0.03",
        setupPrice: "3.40",
        currency: "U$",
      };

      jest
        .spyOn(mockNumberService, "getOneNumber")
        .mockImplementation(() => Promise.resolve(middleareData));
    });

    test("Should update Number with given id", async () => {
      jest
        .spyOn(mockNumberService, "updateNumber")
        .mockImplementation(() =>
          Promise.resolve(successMessages.numberUpdate)
        );

      const response = await request(server)
        .put("/api/number")
        .send(reqBody)
        .set("Authorization", "Bearer TOKEN");

      expect(response.status).toBe(200);
      expect(mockNumberService.updateNumber).toBeCalledTimes(1);
      expect(response.body).toStrictEqual(successMessages.numberUpdate);
    });

    test("Should 500 with error msg", async () => {
      jest
        .spyOn(mockNumberService, "updateNumber")
        .mockImplementation(() => Promise.reject(errorMessages.numberUpdate));

      const response = await request(server)
        .put("/api/number")
        .set("Authorization", "Bearer TOKEN")
        .send(reqBody);

      expect(response.status).toBe(500);
      expect(mockNumberService.updateNumber).toBeCalledTimes(1);
      expect(response.body).toStrictEqual(errorMessages.numberUpdate);
    });
  });

  describe("DELETE /api/number", () => {
    let reqBody: { id: number };
    let middleareData: INumber;
    beforeAll(() => {
      reqBody = {
        id: 41,
      };

      middleareData = {
        id: 41,
        value: "+15 84 91234-4321",
        monthyPrice: "0.03",
        setupPrice: "3.40",
        currency: "U$",
      };

      jest
        .spyOn(mockNumberService, "getOneNumber")
        .mockImplementation(() => Promise.resolve(middleareData));
    });
    test("Should delete Number with givev id", async () => {
      jest
        .spyOn(mockNumberService, "deleteNumber")
        .mockImplementation(() =>
          Promise.resolve(successMessages.numberDelete)
        );

      const response = await request(server)
        .delete("/api/number")
        .send(reqBody)
        .set("Authorization", "Bearer TOKEN");

      expect(response.status).toBe(200);
      expect(mockNumberService.deleteNumber).toBeCalledTimes(1);
      expect(response.body).toStrictEqual(successMessages.numberDelete);
    });

    test("Should 500 with error msg", async () => {
      jest
        .spyOn(mockNumberService, "deleteNumber")
        .mockImplementation(() => Promise.reject(errorMessages.numberDelete));

      const response = await request(server)
        .delete("/api/number")
        .set("Authorization", "Bearer TOKEN")
        .send(reqBody);

      expect(response.status).toBe(500);
      expect(mockNumberService.deleteNumber).toBeCalledTimes(1);
      expect(response.body).toStrictEqual(errorMessages.numberDelete);
    });
  });
});
