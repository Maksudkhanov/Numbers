import { Request, Response, NextFunction } from "express";
import { numberService } from '../controllers/api';
import db from "../db/db";
import { errorMessages } from "../shared/responseMessages/errorMessages";
import { successMessages } from "../shared/responseMessages/successMessages";

export async function isNumberExists(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await numberService.getOneNumber(req.body.id);
    if (!result) {
      res.status(200).json(successMessages.numberNoId);
      return;
    }

    next();
  } catch (error) {
    res.status(500).json(error);
  }
}
