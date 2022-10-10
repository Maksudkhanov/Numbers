import { NextFunction, Request, Response } from "express";
import { INumberService } from "../../interfaces/services/numberService";
import { errorMessages } from "../../shared/responseMessages/errorMessages";
// 11-13,18-19
export function checkForDuplicateId(numberService: INumberService) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const number = await numberService.getOneNumber(req.body.id);

      if (number) {
        res.status(400);
        res.json(errorMessages.numberDuplicateId);
        return;
      }

      next();
    } catch (error) {
      res.status(500);
      res.json(error);
    }
  };
}
