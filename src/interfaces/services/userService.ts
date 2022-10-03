import { IUser } from "../entities/user";

export interface IUserService {
  getOneUser(user: IUser): Promise<IUser | null>;
  insertOneUser(user: IUser): Promise<void>;
  getOneUserByUsername(username: string): Promise<IUser | null>;
}
