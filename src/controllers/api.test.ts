import request from "supertest";
import db from "../db/db";
import server from "../server";
import { successMessages } from "../shared/responseMessages/successMessages";
import api from "./api";

describe("Testing Api Router", () => {
  beforeAll((done) => {
    server.use("/api", api);
    done();
  });

  afterAll((done) => {
    db.disconnect();
    done();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /api/allNumbers", () => {
    test("Should return 201 with all Numbers", async () => {
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
    test("Should return all Numbers", async () => {
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

      const response = await request(server).post("/api/number").send(reqBody);

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

      const response = await request(server).delete("/api/number").send(reqBody);

      expect(response.status).toBe(200);
      expect(response.body).toStrictEqual(successMessages.numberDelete);
    });
  });
});
