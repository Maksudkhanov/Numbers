import { Request, Response, NextFunction } from "express";
import { errorMessages } from "../../shared/responseMessages/errorMessages";
import { isNumber } from "../../utils/isNumber";

export function validateUpdatingFieldsNumber(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const fields = req.body.fieldsToUpdate;
  
  if (!fields) {
    res.status(400);
    res.json(errorMessages.numberUpdateFieldsIsEmpty);
    return;
  }
  
  const keys = Object.keys(fields);

  const IsTwoParamsMax = keys.length <= 2 && keys.length >= 1;
  if (
    !IsTwoParamsMax ||
    !(
      fields.hasOwnProperty("monthyPrice") ||
      fields.hasOwnProperty("setupPrice")
    )
  ) {
    res.status(400);
    res.json(errorMessages.numberUpdateFields);
    return;
  }

  const { monthyPrice, setupPrice } = fields;
  if (monthyPrice) {
    if (!isNumber(monthyPrice)) {
      res.status(400);
      res.json(errorMessages.numberMonthyPriceIsNumber);
      return;
    }

    if (Number(monthyPrice) < 0) {
      res.status(400);
      res.json(errorMessages.numberMonthyPriceIsNotNegative);
      return;
    }
  }
  if (setupPrice) {
    if (!isNumber(setupPrice)) {
      res.status(400);
      res.json(errorMessages.numberSetupPriceIsNumber);
      return;
    }

    if (Number(setupPrice) < 0) {
      res.status(400);
      res.json(errorMessages.numberSetupPriceIsNotNegative);
      return;
    }
  }
  next();
}
// 14-16,27-29,34-43,48-50,54-56