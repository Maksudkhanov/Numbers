import { Request, Response, NextFunction } from "express";
import { UserRoles } from "../../interfaces/entities/user";
import { errorMessages } from "../../shared/responseMessages/errorMessages";

// 21-23,27-29,33-35,39-41,45-47

export function validateAuthFields(
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
    res.status(400);
    res.json(errorMessages.userAuthFields);
    return;
  }

  if (fields.username === "") {
    res.status(400);
    res.json(errorMessages.userUsernameIsEmpty);
    return;
  }

  if (fields.password === "") {
    res.status(400);
    res.json(errorMessages.userPasswordIsEmpty);
    return;
  }

  if (fields.role === "") {
    res.status(400);
    res.json(errorMessages.userRoleIsEmpty);
    return;
  }

  if (fields.role !== UserRoles.ADMIN && fields.role !== UserRoles.USER) {
    res.status(400);
    res.json(errorMessages.userAllowedRoles);
    return;
  }

  next();
}
