import { Request, Response, NextFunction } from "express";
import { IUserService } from "../../interfaces/services/userService";
import { errorMessages } from "../../shared/responseMessages/errorMessages";

export function checkForDuplicateUsername(userService: IUserService) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await userService.getOneUserByUsername(req.body.username);

      if (user) {
        res.status(400);
        res.json(errorMessages.userUsernameExists);
        return;
      }

      next();
    } catch (error: any) {
      res.status(500);
      res.json(error);
    }
  };
}
