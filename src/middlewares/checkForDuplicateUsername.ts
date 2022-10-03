import { Request, Response, NextFunction } from "express";
import { userService } from "../controllers/auth";
import db from "../db/db";
import { errorMessages } from "../shared/responseMessages/errorMessages";

export async function checkForDuplicateUsername(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = await userService.getOneUserByUsername(req.body.username);

    if (user) {
      res.status(400).json(errorMessages.userUsernameExists);
      return;
    }
    next();
  } catch (error: any) {
    console.log(error);
  }
}
