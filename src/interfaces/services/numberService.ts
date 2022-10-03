import { IFieldsToUpdate } from '../entities/number/fieldsToUpdate';
import { INumber } from '../entities/number/number';

export interface INumberService {
  getAllNumbers(): Promise<INumber[]>;
  getOneNumber(id: number): Promise<INumber | null>;
  updateNumber(id: number, fields: IFieldsToUpdate): Promise<void>;
  deleteNumber(id: number): Promise<void>;
}
