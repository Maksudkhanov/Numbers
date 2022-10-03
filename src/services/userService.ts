import db from "../db/db";
import { IUser } from "../interfaces/entities/user";
import { IUserService } from "../interfaces/services/userService";

export class UserService implements IUserService {
  async getOneUser(user: IUser): Promise<IUser | null> {
    const result = await db.findOneUser(user);
    return result;
  }
  async insertOneUser(user: IUser): Promise<void> {
    await db.insertUser(user);
    return;
  }
  async getOneUserByUsername(username: string): Promise<IUser | null> {
    const result = await db.findOneUserByUsername(username);
    return result;
  }
}
