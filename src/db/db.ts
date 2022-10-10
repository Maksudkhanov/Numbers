import { Db, MongoClient } from "mongodb";
import { IDatabase } from "../interfaces/db/db";
import { IUser } from "../interfaces/entities/user";
import dotenv from "dotenv";
import { INumber } from "../interfaces/entities/number/number";
import { successMessages } from "../shared/responseMessages/successMessages";
import { ISuccessMessage } from "../interfaces/messages/successMessage";

dotenv.config();

export class Database implements IDatabase {
  private _db: Db;

  constructor(db: Db) {
    this._db = db;
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

  async insertNumber(number: INumber): Promise<ISuccessMessage> {
    await this._db.collection("numbers").insertOne(number);
    return successMessages.numberCreate;
  }

  async updateNumber(id: number, fields: any): Promise<ISuccessMessage> {
    await this._db
      .collection("numbers")
      .findOneAndUpdate({ id: id }, { $set: fields });
    return successMessages.numberUpdate;
  }

  async deleteNumber(id: number): Promise<ISuccessMessage> {
    await this._db.collection("numbers").findOneAndDelete({ id: id });
    return successMessages.numberDelete;
  }

  async findOneUserByUsername(username: string): Promise<IUser | null> {
    const result = await this._db
      .collection("users")
      .findOne({ username: username });

    if (result) {
      return {
        username: result.username,
        password: result.password,
        role: result.role,
      };
    }
    return result;
  }

  async insertUser(user: IUser): Promise<ISuccessMessage> {
    await this._db.collection("users").insertOne(user);
    return successMessages.userCreate;
  }
}
