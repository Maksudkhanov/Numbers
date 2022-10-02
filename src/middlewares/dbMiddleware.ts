import { Request, Response, NextFunction } from "express";
import { IDatabase } from '../interfaces/db/db';

export default  function dbMiddleware(db: IDatabase) {
  return function dbMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    req.db = db;
    next();
  }
}
