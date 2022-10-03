import { Request, Response, NextFunction } from "express";
import { numberService } from '../../controllers/api';
import { errorMessages } from "../../shared/responseMessages/errorMessages";

export async function isNumberExists(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await numberService.getOneNumber(req.body.id);
    
    if (!result) {
      res.status(404).json(errorMessages.numberNoId);
      return;
    }

    next();
  } catch (error) {
    res.status(500).json(error);
  }
}
