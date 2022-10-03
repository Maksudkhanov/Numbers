import { Request, Response, NextFunction } from "express";
import { UserRoles } from "../../interfaces/entities/user";
import { errorMessages } from "../../shared/responseMessages/errorMessages";

export async function validateAuthFields(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const fields = req.body;
  const keys = Object.keys(fields);

  let k =
    keys.length !== 3 ||
    !fields.hasOwnProperty("username") ||
    !fields.hasOwnProperty("password") ||
    !fields.hasOwnProperty("role");
  if (k) {
    res.status(400).json(errorMessages.userAuthFields);
    return;
  }

  if (fields.username === "") {
    res.status(400).json(errorMessages.userUsernameIsEmpty);
    return;
  }
  
  if (fields.password === "") {
    res.status(400).json(errorMessages.userPasswordIsEmpty);
    return;
  }

  if (fields.role === "") {
    res.status(400).json(errorMessages.userRoleIsEmpty);
    return;
  }
  
  if (fields.role !== UserRoles.ADMIN && fields.role !== UserRoles.USER) {
    res.status(400).json(errorMessages.userAllowedRoles);
    return;
  }
  
  next();
}
