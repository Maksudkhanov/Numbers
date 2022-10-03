import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
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

    const decodedData = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decodedData;
    
    next();
  } catch (error) {
    res.status(500).json(error);
    return;
  }
}
