import request from "supertest";
import { ISuccessMessage } from "../interfaces/db/successMessage";
import { IFieldsToUpdate } from "../interfaces/entities/number/fieldsToUpdate";
import { INumber } from "../interfaces/entities/number/number";
import { IUser, UserRoles } from "../interfaces/entities/user";
import { INumberService } from "../interfaces/services/numberService";
import server from "../server";
import { UserService } from "../services/userService";
import { successMessages } from "../shared/responseMessages/successMessages";
import * as util from "../utils/paginateItems";
import apiController from "./api";
import api from "./api";
import auth from "./auth";
import jwt from "jsonwebtoken";
import { ResourceLimits } from "worker_threads";

class MockNumberService implements INumberService {
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
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /api/number", () => {
    test("Should create Number", async () => {
      const reqBody = {
        id: 41,
        value: "+15 84 91234-4321",
        monthyPrice: "0.03",
        setupPrice: "3.40",
        currency: "U$",
      };

      jest
        .spyOn(mockNumberService, "createNumber")
        .mockImplementation(() =>
          Promise.resolve(successMessages.numberCreate)
        );

      jest
        .spyOn(mockNumberService, "getOneNumber")
        .mockImplementation(() => Promise.resolve(null));

      jest
        .spyOn(mockNumberService, "getOneNumberByValue")
        .mockImplementation(() => Promise.resolve(null));

      const jwtVerifyData = {
        username: "Maksudkhanov",
        role: UserRoles.ADMIN,
      };
      jest.spyOn(jwt, "verify").mockImplementation(() => jwtVerifyData);

      const response = await request(server)
        .post("/api/number")
        .send(reqBody)
        .set("Authorization", "Bearer TOKEN");

      expect(response.status).toBe(200);
      expect(response.body).toStrictEqual(successMessages.numberCreate);
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
      expect(response.body).toStrictEqual(expectedData);
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
      expect(response.body).toStrictEqual(expectedData);
    });
  });

  describe("PUT /api/number", () => {
    test("Should update Number with given id", async () => {
      const reqBody = {
        id: 41,
        fieldsToUpdate: {
          monthyPrice: "4",
          setupPrice: "5",
        },
      };

      jest
        .spyOn(mockNumberService, "updateNumber")
        .mockImplementation(() =>
          Promise.resolve(successMessages.numberUpdate)
        );

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

      const jwtVerifyData = {
        username: "Maksudkhanov",
        role: UserRoles.ADMIN,
      };

      jest.spyOn(jwt, "verify").mockImplementation(() => jwtVerifyData);

      const response = await request(server)
        .put("/api/number")
        .send(reqBody)
        .set("Authorization", "Bearer TOKEN");

      expect(response.status).toBe(200);
      expect(response.body).toStrictEqual(successMessages.numberUpdate);
    });
  });

  describe("DELETE /api/number", () => {
    test("Should delete Number with givev id", async () => {
      const reqBody = {
        id: 41,
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

      const jwtVerifyData = {
        username: "Maksudkhanov",
        role: UserRoles.ADMIN,
      };

      jest.spyOn(jwt, "verify").mockImplementation(() => jwtVerifyData);

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
      expect(response.body).toStrictEqual(successMessages.numberDelete);
    });
  });
});
