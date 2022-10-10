import { ISuccessMessage } from '../db/successMessage';
import { IFieldsToUpdate } from "../entities/number/fieldsToUpdate";
import { INumber } from "../entities/number/number";

export interface INumberService {
  getAllNumbers(): Promise<INumber[] | [{}]>;
  getOneNumber(id: number): Promise<INumber | null>;
  updateNumber(id: number, fields: IFieldsToUpdate): Promise<ISuccessMessage>;
  deleteNumber(id: number): Promise<ISuccessMessage>;
  getOneNumberByValue(value: string): Promise<INumber | null>;
  createNumber(number: INumber): Promise<ISuccessMessage>
}
