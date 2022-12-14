import { NextFunction, Request, Response } from "express";
import { errorMessages } from "../../shared/responseMessages/errorMessages";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

export function authCheckMiddleware(
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
      res.status(403);
      res.json(errorMessages.userAuth);
      return;
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET as string);

    next();
  } catch (error) {
    res.status(403);
    res.json(errorMessages.userAuth);
  }
}
