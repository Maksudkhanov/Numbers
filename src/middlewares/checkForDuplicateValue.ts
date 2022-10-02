import { Request, Response, NextFunction } from "express";
import { errorMessages } from "../shared/responseMessages/errorMessages";

export async function checkForDuplicateValue(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const db = req.db;

    const value = await db.findOneNumber({ value: req.body.value });

    if (value) {
      res.status(400).json(errorMessages.numberValueExists);
      return;
    }
    next();
  } catch (error: any) {
    console.log(error);
  }
}
