import { ISuccessMessage } from '../messages/successMessage';
import { IUser } from "../entities/user";

export interface IUserService {
  insertOneUser(user: IUser): Promise<ISuccessMessage>;
  getOneUserByUsername(username: string): Promise<IUser | null>;
}
