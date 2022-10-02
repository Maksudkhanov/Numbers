import { INumber } from "../entities/number";
import { IUser } from "../entities/user";

export interface IDatabase {
  connect(uri: string): void;
  findOneNumber(filter: object): Promise<INumber | null>;
  findAllNumbers(): Promise<INumber[] | []>;
  insertNumber(doc: INumber): Promise<void>;
  updateNumber(id: number, fields: object): Promise<void>;
  deleteNumber(query: object): Promise<void>;
  findOneUser(query: object): Promise<IUser | null>;
  insertUser(doc: IUser): Promise<void>;
}
