import { NextFunction, Request, Response } from "express";
import { errorMessages } from "../shared/responseMessages/errorMessages";

export async function checkForDuplicateId(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const db = req.db;
    const user = await db.findOneNumber({ id: req.body.id });
    if (user) {
      res.status(400).json(errorMessages.numberDuplicateId);
      return;
    }
    next();
  } catch (error) {
    console.log(error);
  }
}
