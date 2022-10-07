import express, { Request, Response } from "express";
import { authCheckMiddleware } from "../middlewares/user/authCheck";
import { checkForDuplicateId } from "../middlewares/number/checkForDuplicateId";
import { checkForDuplicateValue } from "../middlewares/number/checkForDuplicateValue";
import { isNumberExists } from "../middlewares/number/isNumberExists";
import { validateNumberFields } from "../middlewares/number/validateNumberFields";
import { validateUpdatingFieldsNumber } from "../middlewares/number/validateUpdatingFieldsNumber";
import NumberService from "../services/numberService";
import { errorMessages } from "../shared/responseMessages/errorMessages";
import paginateItems from "../utils/paginateItems";

export const numberService = new NumberService();
const api = express.Router();
const defaultLimit = 10;

api.get("/allNumbers", async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page ?? 1);
    const limit = Number(req.query.limit ?? defaultLimit);
    const numbers = await numberService.getAllNumbers();
    

    if (numbers?.length === 0) {
      res.status(404).json(errorMessages.numberNoOne);
      return;
    }

    const paginatedNumbers = paginateItems(numbers)(page, limit);
    res.status(201).send(paginatedNumbers);
  } catch (error) {
    res.status(500).json(errorMessages.numbersGet);
  }
});

api.get("/number", async (req: Request, res: Response) => {
  try {
    const result = await numberService.getOneNumber(req.body.id);
    if(!result) {
      res.status(404).json(errorMessages.numberNoId)
      return
    }
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json(errorMessages.numberGet);
  }
});

api.post(
  "/number",
  // authCheckMiddleware,
  validateNumberFields,
  checkForDuplicateId,
  checkForDuplicateValue,
  async (req: Request, res: Response) => {
    try {
      const result = await numberService.createNumber(req.body);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(errorMessages.numberCreate);
    }
  }
);

api.put(
  "/number",
  // authCheckMiddleware,
  isNumberExists,
  validateUpdatingFieldsNumber,
  async (req: Request, res: Response) => {
    try {
      const result = await numberService.updateNumber(
        req.body.id,
        req.body.fieldsToUpdate
      );
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      
      res.status(500).json(errorMessages.numberUpdate);
    }
  }
);

api.delete(
  "/number",
  // authCheckMiddleware,
  isNumberExists,
  async (req: Request, res: Response) => {
    try {
      const result = await numberService.deleteNumber(req.body.id);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(errorMessages.numberDelete);
    }
  }
);

export default api;
