import { Request, Response, NextFunction } from "express";
import { INumberService } from "../../interfaces/services/numberService";
import { errorMessages } from "../../shared/responseMessages/errorMessages";

export function isNumberExists(numberService: INumberService) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await numberService.getOneNumber(req.body.id);

      if (!result) {
        res.status(404);
        res.json(errorMessages.numberNoId);
        return;
      }

      next();
    } catch (error) {
      res.status(500);
      res.json(error);
    }
  };
}
