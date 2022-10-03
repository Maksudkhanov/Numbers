import { NextFunction, Request, Response } from "express";
import { errorMessages } from "../../shared/responseMessages/errorMessages";
import dotenv from "dotenv";
dotenv.config();

export async function authCheckMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.method === "OPTIONS") {
    next();
  }

  try {
    const token = req.headers?.authorization?.split(" ")[1];
    if (!token) {
      res.status(403).json(errorMessages.userAuth);
      return;
    }
    
    next();
  } catch (error) {
    res.status(500).json(error);
    return;
  }
}
