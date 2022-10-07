import db from "../db/db";
import { ISuccessMessage } from '../interfaces/db/successMessage';
import { IFieldsToUpdate } from "../interfaces/entities/number/fieldsToUpdate";
import { INumber } from "../interfaces/entities/number/number";
import { INumberService } from "../interfaces/services/numberService";

export default class NumberService implements INumberService {
  async getOneNumberByValue(value: string): Promise<INumber | null> {
    const result = await db.findOneNumberByValue(value);
    return result;
  }

  async getAllNumbers(): Promise<INumber[]> {
    const results = await db.findAllNumbers();    
    return results;
  }

  async getOneNumber(id: number): Promise<INumber | null> {
    const result = await db.findOneNumber(id);
    return result;
  }

  async createNumber(number: INumber): Promise<ISuccessMessage> {
    const result = await db.insertNumber(number);
	return result
  }

  async updateNumber(
    id: number,
    fieldsToUpdate: IFieldsToUpdate
  ): Promise<ISuccessMessage> {
    const result = await db.updateNumber(id, fieldsToUpdate);
    return result; 
  }

  async deleteNumber(id: number): Promise<ISuccessMessage> {
    const result = await db.deleteNumber(id);
    return result;
  }
}
