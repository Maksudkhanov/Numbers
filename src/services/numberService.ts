import db from "../db/db";
import { IFieldsToUpdate } from "../interfaces/entities/number/fieldsToUpdate";
import { INumber } from "../interfaces/entities/number/number";
import { INumberService } from "../interfaces/services/numberService";

export default class NumberService implements INumberService {
  async getOneNumberByValue(value: string): Promise<INumber | null> {
    const result = await db.findOneNumberByValue(value);
    return result;
  }
  async getAllNumbers(): Promise<INumber[]> {
    const resuts = await db.findAllNumbers();
    return resuts;
  }
  async getOneNumber(id: number): Promise<INumber | null> {
    const result = await db.findOneNumber(id);
    return result;
  }
  async createNumber(number: INumber): Promise<void> {
    await db.insertNumber(number);
  }
  async updateNumber(
    id: number,
    fieldsToUpdate: IFieldsToUpdate
  ): Promise<void> {
    await db.updateNumber(id, fieldsToUpdate);
    return;
  }
  async deleteNumber(id: number): Promise<void> {
    await db.deleteNumber(id);
    return;
  }
}
