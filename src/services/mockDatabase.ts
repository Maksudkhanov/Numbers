import { IDatabase } from "../interfaces/db/db";
import { ISuccessMessage } from "../interfaces/db/successMessage";
import { IFieldsToUpdate } from "../interfaces/entities/number/fieldsToUpdate";
import { INumber } from "../interfaces/entities/number/number";
import { IUser } from "../interfaces/entities/user";

export class MockDatabase implements IDatabase {
  disconnect(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  findOneNumber(id: number): Promise<INumber | null> {
    throw new Error("Method not implemented.");
  }
  findOneNumberByValue(value: string): Promise<INumber | null> {
    throw new Error("Method not implemented.");
  }
  findAllNumbers(): Promise<INumber[] | []> {
    throw new Error("Method not implemented.");
  }
  insertNumber(number: INumber): Promise<ISuccessMessage> {
    throw new Error("Method not implemented.");
  }
  updateNumber(id: number, fields: IFieldsToUpdate): Promise<ISuccessMessage> {
    throw new Error("Method not implemented.");
  }
  deleteNumber(id: number): Promise<ISuccessMessage> {
    throw new Error("Method not implemented.");
  }
  findOneUser(user: IUser): Promise<IUser | null> {
    throw new Error("Method not implemented.");
  }
  insertUser(user: IUser): Promise<ISuccessMessage> {
    throw new Error("Method not implemented.");
  }
  findOneUserByUsername(username: string): Promise<IUser | null> {
    throw new Error("Method not implemented.");
  }
}
