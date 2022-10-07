import { NextFunction, Request, Response } from "express";
import { errorMessages } from "../../shared/responseMessages/errorMessages";
import dotenv from "dotenv";
dotenv.config();

export function authCheckMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.method === "OPTIONS") {
    next();
  }
    const token = req.headers?.authorization?.split(" ")[1];
    console.log(token);
   
    if (!token) {
      res.status(403).json(errorMessages.userAuth);
      return;
    }
    
    next();

}
