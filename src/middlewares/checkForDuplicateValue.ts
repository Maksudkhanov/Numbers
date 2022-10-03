import { Request, Response, NextFunction } from "express";
import { numberService } from "../controllers/api";
import { errorMessages } from "../shared/responseMessages/errorMessages";

export async function checkForDuplicateValue(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const value = await numberService.getOneNumberByValue(req.body.value);

    if (value) {
      res.status(400).json(errorMessages.numberValueExists);
      return;
    }
    next();
  } catch (error: any) {
    res.status(500).json(error);
  }
}
