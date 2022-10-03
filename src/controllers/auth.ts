import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { checkForDuplicateUsername } from "../middlewares/user/checkForDuplicateUsername";
import jwt from "jsonwebtoken";
import { errorMessages } from "../shared/responseMessages/errorMessages";
import { successMessages } from "../shared/responseMessages/successMessages";
import { validateAuthFields } from "../middlewares/user/validateAuthFields";
import { UserService } from "../services/userService";

export const userService = new UserService();
const auth = express.Router();

function generateToken(username: string, role: string) {
  const payload = { username, role };
  return jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: "2h",
  });
}

auth.post(
  "/signin",
  validateAuthFields,
  async (req: Request, res: Response) => {
    try {

      const { username, password, role } = req.body;
      const user = await userService.getOneUserByUsername(username);

      if (!user) {
        res.status(404).json(errorMessages.userNotExists);
        return;
      }

      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        res.status(400).json(errorMessages.userIncorrectPassword);
        return;
      }

      const token = generateToken(user.username, user.role);
      res.status(201).send({ token });
  
    } catch (error) {
      console.log(error);
      res.status(500).json(errorMessages.userGet);
    }
  }
);

auth.post(
  "/signup",
  validateAuthFields,
  checkForDuplicateUsername,
  async (req: Request, res: Response) => {
    try {

      const { username, password, role } = req.body;
      const salt = bcrypt.genSaltSync(
        Number(process.env.BCYRPT_SALT as string)
      );

      const hashPassword = bcrypt.hashSync(password, salt);

      const result = await userService.insertOneUser({
        username,
        password: hashPassword,
        role,
      });

      res.status(201).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json(errorMessages.userCreate);
    }
  }
);

export default auth;
