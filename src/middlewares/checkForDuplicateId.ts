import { NextFunction, Request, Response } from "express";
import db from "../db/db";
import { errorMessages } from "../shared/responseMessages/errorMessages";

export async function checkForDuplicateId(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = await db.findOneNumber(req.body.id);
    if (user) {
      res.status(400).json(errorMessages.numberDuplicateId);
      return;
    }
    next();
  } catch (error) {
    console.log(error);
  }
}
