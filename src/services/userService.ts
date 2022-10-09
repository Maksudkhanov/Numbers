import { IDatabase } from "../interfaces/db/db";
import { ISuccessMessage } from "../interfaces/db/successMessage";
import { IUser } from "../interfaces/entities/user";
import { IUserService } from "../interfaces/services/userService";

export class UserService implements IUserService {
  db: IDatabase;
  constructor(db: IDatabase) {
    this.db = db;
  }
  // async getOneUser(user: IUser): Promise<IUser | null> {
  //   const result = await this.db.findOneUser(user);
  //   return result;
  // }

  async insertOneUser(user: IUser): Promise<ISuccessMessage> {
    const result = await this.db.insertUser(user);
    return result;
  }

  async getOneUserByUsername(username: string): Promise<IUser | null> {
    const result = await this.db.findOneUserByUsername(username);
    return result;
  }
}
