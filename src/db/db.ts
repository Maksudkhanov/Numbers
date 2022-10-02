import { MongoClient } from "mongodb";
import { IDatabase } from "../interfaces/db/db";
import { INumber } from "../interfaces/entities/number";
import { IUser } from "../interfaces/entities/user";

class Database implements IDatabase {
  private _db: any;
  private _client: MongoClient;

  constructor(uri: string) {
    this._client = new MongoClient(uri);
  }

  async connect(dbName: string): Promise<void> {
    this._client.connect();
    this._db = this._client.db(dbName);
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

  async findOneNumber(filter: object): Promise<INumber | null> {
    const result = await this._db.collection("numbers").findOne(filter);
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

  async deleteNumber(query: object): Promise<void> {
    await this._db.collection("numbers").findOneAndDelete(query);
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

export default Database;
