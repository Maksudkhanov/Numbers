import db from "../db/db";
import { IDatabase } from "../interfaces/db/db";
import { ISuccessMessage } from "../interfaces/db/successMessage";
import { IFieldsToUpdate } from "../interfaces/entities/number/fieldsToUpdate";
import { INumber } from "../interfaces/entities/number/number";
import { INumberService } from "../interfaces/services/numberService";

export default class NumberService implements INumberService {
  db: IDatabase;

  constructor(db: IDatabase) {
    this.db = db;
  }

  async getOneNumberByValue(value: string): Promise<INumber | null> {
    const result = await this.db.findOneNumberByValue(value);
    return result;
  }

  async getAllNumbers(): Promise<INumber[]> {
    const results = await this.db.findAllNumbers();
    return results;
  }

  async getOneNumber(id: number): Promise<INumber | null> {
    const result = await this.db.findOneNumber(id);
    return result;
  }

  async createNumber(number: INumber): Promise<ISuccessMessage> {
    const result = await this.db.insertNumber(number);
    return result;
  }

  async updateNumber(
    id: number,
    fieldsToUpdate: IFieldsToUpdate
  ): Promise<ISuccessMessage> {
    const result = await this.db.updateNumber(id, fieldsToUpdate);
    return result;
  }

  async deleteNumber(id: number): Promise<ISuccessMessage> {
    const result = await this.db.deleteNumber(id);
    return result;
  }
}
