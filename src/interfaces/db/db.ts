import { IFieldsToUpdate } from "../entities/number/fieldsToUpdate";
import { INumber } from "../entities/number/number";
import { IUser } from "../entities/user";
import { ISuccessMessage } from "../messages/successMessage";

export interface IDatabase {
  findOneNumber(id: number): Promise<INumber | null>;
  findOneNumberByValue(value: string): Promise<INumber | null>;
  findAllNumbers(): Promise<INumber[] | []>;
  insertNumber(number: INumber): Promise<ISuccessMessage>;
  updateNumber(id: number, fields: IFieldsToUpdate): Promise<ISuccessMessage>;
  deleteNumber(id: number): Promise<ISuccessMessage>;
  insertUser(user: IUser): Promise<ISuccessMessage>;
  findOneUserByUsername(username: string): Promise<IUser | null>;
}
