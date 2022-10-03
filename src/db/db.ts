import { MongoClient } from "mongodb";
import { IDatabase } from "../interfaces/db/db";
import { IUser } from "../interfaces/entities/user";
import dotenv from "dotenv";
import { INumber } from "../interfaces/entities/number/number";

dotenv.config();

const DB_URI = process.env.DB_URI as string;
const DB_NAME = process.env.DB_NAME as string;

class Database implements IDatabase {
  private _db: any;
  private _client: MongoClient;

  constructor() {
    this._client = new MongoClient(DB_URI);
  }
  async findOneNumberByValue(value: string): Promise<INumber | null> {
    const result = await this._db
      .collection("numbers")
      .findOne({ value: value });
    if (result) {
      return {
        id: result.id,
        value: result.value,
        monthyPrice: result.monthyPrice,
        setupPrice: result.setupPrice,
        currency: result.currency,
      };
    }
    return result;
  }

  async connect(): Promise<void> {
    this._client.connect();
    this._db = this._client.db(DB_NAME);
  }

  async findAllNumbers(): Promise<INumber[]> {
    const result: any[] = await this._db
      .collection("numbers")
      .find({})
      .toArray();

    return result.map((item) => ({
      id: item.id,
      value: item.value,
      monthyPrice: item.monthyPrice,
      setupPrice: item.setupPrice,
      currency: item.currency,
    }));
  }

  async findOneNumber(id: number): Promise<INumber | null> {
    const result = await this._db.collection("numbers").findOne({ id: id });
    if (result) {
      return {
        id: result.id,
        value: result.value,
        monthyPrice: result.monthyPrice,
        setupPrice: result.setupPrice,
        currency: result.currency,
      };
    }
    return result;
  }

  async insertNumber(doc: any): Promise<void> {
    await this._db.collection("numbers").insertOne(doc);
    return;
  }

  async updateNumber(id: number, fields: object): Promise<void> {
    await this._db
      .collection("numbers")
      .findOneAndUpdate({ id: id }, { $set: fields });
    return;
  }

  async deleteNumber(id: number): Promise<void> {
    await this._db.collection("numbers").findOneAndDelete({ id: id });
    return;
  }

  async findOneUser(query: object): Promise<IUser | null> {
    const result = await this._db.collection("users").findOne(query);
    if (result) {
      return {
        username: result.username,
        password: result.password,
        role: result.role,
      };
    }
    return result;
  }

  async insertUser(doc: any): Promise<void> {
    await this._db.collection("users").insertOne(doc);
    return;
  }
}

const db = new Database();

export default db;
