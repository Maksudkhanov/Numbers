import { NextFunction, Request, Response } from "express";
import { numberService } from '../controllers/api';
import db from "../db/db";
import { errorMessages } from "../shared/responseMessages/errorMessages";

export async function checkForDuplicateId(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = await numberService.getOneNumber(req.body.id);
    if (user) {
      res.status(400).json(errorMessages.numberDuplicateId);
      return;
    }
    next();
  } catch (error) {
    res.status(500).json(error);
  }
}
