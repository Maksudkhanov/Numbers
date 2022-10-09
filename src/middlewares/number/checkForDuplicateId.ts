import { NextFunction, Request, Response } from "express";
import { INumberService } from "../../interfaces/services/numberService";
import { errorMessages } from "../../shared/responseMessages/errorMessages";

export function checkForDuplicateId(numberService: INumberService) {
  return async (req: Request, res: Response, next: NextFunction) => {
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
  };
}
