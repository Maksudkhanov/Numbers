import { Request, Response, NextFunction } from "express";
import db from "../db/db";
import { errorMessages } from "../shared/responseMessages/errorMessages";

export async function checkForDuplicateUsername(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = await db.findOneUser({ username: req.body.username });

    if (user) {
      res.status(400).json(errorMessages.userUsernameExists);
      return;
    }
    next();
  } catch (error: any) {
    console.log(error);
  }
}
