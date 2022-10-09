import { IFieldsToUpdate } from "../entities/number/fieldsToUpdate";
import { INumber } from "../entities/number/number";
import { IUser } from "../entities/user";
import { ISuccessMessage } from "./successMessage";

export interface IDatabase {
  disconnect(): Promise<void>;
  findOneNumber(id: number): Promise<INumber | null>;
  findOneNumberByValue(value: string): Promise<INumber | null>;
  findAllNumbers(): Promise<INumber[] | []>;
  insertNumber(number: INumber): Promise<ISuccessMessage>;
  updateNumber(id: number, fields: IFieldsToUpdate): Promise<ISuccessMessage>;
  deleteNumber(id: number): Promise<ISuccessMessage>;
  findOneUser(user: IUser): Promise<IUser | null>;
  insertUser(user: IUser): Promise<ISuccessMessage>;
  findOneUserByUsername(username: string): Promise<IUser | null>;
}
