import { Request, Response, NextFunction } from "express";
import { errorMessages } from "../shared/responseMessages/errorMessages";
import { successMessages } from "../shared/responseMessages/successMessages";

export async function isNumberExists(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const db = req.db;
    const result = await db.findOneNumber({ id: req.body.id });
    if (!result) {
      res.status(200).json(successMessages.numberNoId);
      return;
    }

    next();
  } catch (error) {
    console.log(error);
  }
}
