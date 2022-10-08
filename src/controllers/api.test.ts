import request from "supertest";
import db from "../db/db";
import { IUser, UserRoles } from "../interfaces/entities/user";
import server from "../server";
import { successMessages } from "../shared/responseMessages/successMessages";
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
  });

  afterAll((done) => {
    db.disconnect();
    done();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /api/allNumbers", () => {
    test("Should return all Numbers", async () => {
      const expectedData = {
        results: [
          {
            id: 42,
            value: "+55 84 91234-4321",
            monthyPrice: "0.03",
            setupPrice: "3.40",
            currency: "U$",
          },
        ],
      };

      const response = await request(server).get("/api/allNumbers");

      expect(response.status).toBe(201);
      expect(response.body).toStrictEqual(expectedData);
    });
  });

  describe("GET /api/number", () => {
    test("Should return Number with given id", async () => {
      const expectedData = {
        id: 42,
        value: "+55 84 91234-4321",
        monthyPrice: "0.03",
        setupPrice: "3.40",
        currency: "U$",
      };

      const response = await request(server)
        .get("/api/number")
        .send({ id: 42 });

      expect(response.status).toBe(201);
      expect(response.body).toStrictEqual(expectedData);
    });
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

      const user = {
        username: "Maksudkhanov",
        password: "admin",
        role: UserRoles.ADMIN,
      };

      // const token = await getAuthToken(user);
      let token;

      const response = await request(server)
        .post("/api/number")
        .set("Authorization", "Bearer " + token)
        .send(reqBody);

      console.log(response.body);

      expect(response.status).toBe(200);
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

      const response = await request(server).put("/api/number").send(reqBody);
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
