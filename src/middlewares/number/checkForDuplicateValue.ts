import { Request, Response, NextFunction } from "express";
import { INumberService } from "../../interfaces/services/numberService";
import { errorMessages } from "../../shared/responseMessages/errorMessages";

export function checkForDuplicateValue(numberService: INumberService) {
  return async (req: Request, res: Response, next: NextFunction) => {
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
  };
}
