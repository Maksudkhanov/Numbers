import { Request, Response, NextFunction } from "express";
import { errorMessages } from "../shared/responseMessages/errorMessages";

export async function checkForDuplicateUsername(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const db = req.db;

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
