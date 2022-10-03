import express, { Request, Response } from "express";
import { authCheckMiddleware } from "../middlewares/authCheck";
import { checkForDuplicateId } from "../middlewares/checkForDuplicateId";
import { checkForDuplicateValue } from "../middlewares/checkForDuplicateValue";
import { isNumberExists } from "../middlewares/isNumberExists";
import { validateNumberFields } from "../middlewares/validateNumberFields";
import NumberService from "../services/numberService";
import { errorMessages } from "../shared/responseMessages/errorMessages";
import { successMessages } from "../shared/responseMessages/successMessages";
import paginateItems from "../utils/paginateItems";

const numberService = new NumberService();
const api = express.Router();
const defaultLimit = 10;

api.get("/allNumbers", async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page ?? 1);
    const limit = Number(req.query.limit ?? defaultLimit);

    const numbers = await numberService.getAllNumbers();

    if (numbers?.length === 0) {
      res.status(200).json(successMessages.numberNoOne);
      return;
    }

    const paginatedNumbers = await paginateItems(numbers)(page, limit);
    res.status(201).send(paginatedNumbers);
    return;
  } catch (error) {
    res.status(500).json(errorMessages.numbersGet);
  }
});

api.get("/number", async (req: Request, res: Response) => {
  try {
    const db = req.db;
    const result = await db.findOneNumber(req.body);
    res.status(201).send(result);
    return;
  } catch (error) {
    res.status(500).json(errorMessages.numberGet);
  }
});

api.post(
  "/number",
  authCheckMiddleware,
  validateNumberFields,
  checkForDuplicateId,
  checkForDuplicateValue,
  async (req: Request, res: Response) => {
    try {
      await numberService.createNumber(req.body);
      res.status(200).json(successMessages.numberCreate);
      return;
    } catch (error) {
      res.status(500).json(errorMessages.numberCreate);
    }
  }
);

api.put(
  "/number",
  // authCheckMiddleware,
  isNumberExists,
  // validateUpdatingFieldsNumber,
  async (req: Request, res: Response) => {
    try {
      const db = req.db;

      await numberService.updateNumber(req.body.id, req.body.fieldsToUpdate);

      res.status(200).json(successMessages.numberUpdate);
      return;
    } catch (error) {
      res.status(500).json(errorMessages.numberUpdate);
    }
  }
);

api.delete(
  "/number",
  authCheckMiddleware,
  isNumberExists,
  async (req: Request, res: Response) => {
    try {
      const db = req.db;
      await db.deleteNumber(req.body);
      res.status(200).json(successMessages.numberDelete);
    } catch (error) {
      res.status(500).json(errorMessages.numberDelete);
    }
  }
);

export default api;
