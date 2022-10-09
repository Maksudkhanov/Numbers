import request from "supertest";
import { ISuccessMessage } from "../interfaces/db/successMessage";
import { IFieldsToUpdate } from "../interfaces/entities/number/fieldsToUpdate";
import { INumber } from "../interfaces/entities/number/number";
import { IUser, UserRoles } from "../interfaces/entities/user";
import { INumberService } from "../interfaces/services/numberService";
import server from "../server";
import { successMessages } from "../shared/responseMessages/successMessages";
import paginateItems from "../utils/paginateItems";
import api from "./api";
import auth from "./auth";

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
    server.use("/api", api);
    server.use("/auth", auth);
    mockNumberService = new MockNumberService();
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

      const response = await request(server).post("/api/number").send(reqBody);

      expect(response.status).toBe(200);
      expect(response.body).toStrictEqual(successMessages.numberCreate);
    });
  });

  describe("GET /api/allNumbers", () => {
    test("Should return all Numbers", async () => {
      const expectedData = {
        results: [
          {
            id: 41,
            value: "+15 84 91234-4321",
            monthyPrice: "0.03",
            setupPrice: "3.40",
            currency: "U$",
          },
        ],
      };

      const response = await request(server).get("/api/allNumbers");

      expect(paginateItems).toHaveBeenCalledTimes(1);
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

      const response = await request(server)
        .put("/api/number")
        .set("Authorization", "Bearer " + token)
        .send(reqBody);

      expect(response.status).toBe(200);
      expect(response.body).toStrictEqual(successMessages.numberUpdate);
    });
  });

  describe("DELETE /api/number", () => {
    test("Should delete Number with givev id", async () => {
      const reqBody = {
        id: 41,
      };

      const response = await request(server)
        .delete("/api/number")
        .set("Authorization", "Bearer " + token)
        .send(reqBody);

      expect(response.status).toBe(200);
      expect(response.body).toStrictEqual(successMessages.numberDelete);
    });
  });
});
