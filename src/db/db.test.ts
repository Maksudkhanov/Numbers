import { Db, MongoClient } from "mongodb";
import { IDatabase } from "../interfaces/db/db";

describe("Databse testing", () => {
  let mockDb: IDatabase;

  beforeAll(async () => {
    mockDb = {
      findAllNumbers: jest.fn(),
      findOneNumber: jest.fn(),
      findOneNumberByValue: jest.fn(),
      findOneUserByUsername: jest.fn(),
      updateNumber: jest.fn(),
      insertUser: jest.fn(),
      insertNumber: jest.fn(),
      deleteNumber: jest.fn(),
      disconnect: jest.fn(),
    };
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("findAllNumbers", () => {});
});
