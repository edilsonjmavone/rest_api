import { Request, Response } from "express";
import Validator from "../dataValidator";
const validator = new Validator();

export class UserLoginController {
  login(req: Request, res: Response) {
    const { email, password } = req.body;
    const { isValid, message } = validator.login(email, password);
    if (isValid) return res.status(200).json({ message: "loged" }); //TODO: return jsonwebtoken
    return res.status(400).json(message);
  }
}
