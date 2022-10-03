import { INumber } from "../entities/number/number";
import { IUser } from "../entities/user";

export interface IDatabase {
  connect(uri: string): void;
  findOneNumber(id: number): Promise<INumber | null>;
  findAllNumbers(): Promise<INumber[] | []>;
  insertNumber(number: INumber): Promise<void>;
  updateNumber(id: number, fields: object): Promise<void>;
  deleteNumber(id: number): Promise<void>;
  findOneUser(query: object): Promise<IUser | null>;
  insertUser(doc: IUser): Promise<void>;
}
