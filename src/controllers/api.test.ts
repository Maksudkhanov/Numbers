import request from "supertest";
import { IUser, UserRoles } from "../interfaces/entities/user";
import server from "../server";
import { successMessages } from "../shared/responseMessages/successMessages";
import paginateItems from '../utils/paginateItems';
import api from "./api";
import auth from "./auth";

async function getAuthToken(userData: IUser) {
  const response = await request(server).post("/auth/signin").send(userData);
  return response.body.token;
}

describe("Testing Api Router", () => {
  let token: string;
 

  beforeAll(async () => {
    server.use("/api", api);
    server.use("/auth", auth);


    const user = {
      username: "Maksudkhanov",
      password: "admin",
      role: UserRoles.ADMIN,
    };
    token = await getAuthToken(user);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /api/number", () => {
    test("Should create Number", async () => {
      const expectedData = successMessages.numberCreate;

      const reqBody = {
        id: 41,
        value: "+15 84 91234-4321",
        monthyPrice: "0.03",
        setupPrice: "3.40",
        currency: "U$",
      };

      const response = await request(server)
        .post("/api/number")
        .set("Authorization", "Bearer " + token)
        .send(reqBody);

      expect(response.status).toBe(200);
      expect(response.body).toStrictEqual(expectedData);
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

      expect(paginateItems).toHaveBeenCalledTimes(1)
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
 