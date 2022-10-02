import { Request, Response, NextFunction } from "express";
import { isPhoneNumber } from "../utils/isPhoneNumber";
import { isNumber } from "../utils/isNumber";
import { errorMessages } from "../shared/responseMessages/errorMessages";
export async function validateNumberFields(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id, value, monthyPrice, setupPrice, currency } = req.body;

  if (id <= 0 || !Number.isInteger(id)) {
    res.status(400).json(errorMessages.numberIdIsInteger);
    return;
  }
  if (!isPhoneNumber(value)) {
    res.status(400).json(errorMessages.numberValueIsPhoneNumber);
    return;
  }

  if (!isNumber(monthyPrice)) {
    res.status(400).json(errorMessages.numberMonthyPriceIsNumber);
    return;
  }
  if (!isNumber(setupPrice)) {
    res.status(400).json(errorMessages.numberSetupPriceIsNumber);
    return;
  }
  if (Number(setupPrice) < 0) {
    res.status(400).json(errorMessages.numberSetupPriceIsNotNegative);
    return;
  }
  if (Number(monthyPrice) < 0) {
    res.status(400).json(errorMessages.numberMonthyPriceIsNotNegative);
    return;
  }

  next();
}
