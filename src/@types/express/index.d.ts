import { JwtPayload } from 'jsonwebtoken';
import { IDatabase } from "../../interfaces/db/db";
import { IUser } from "../../interfaces/entities/user";

declare global {
  namespace Express {
    interface Request {
      user: string | JwtPayload;
    }
  }
}
