import { Request, Response, NextFunction } from "express";
import Validator from "../validation/dataValidator";
import { UserRepository } from "../database/repositorys/UserRepository";
import { getCustomRepository } from "typeorm";
import { HandleError } from "../error/handleError";
import { getToken } from "../validation/acessValidator";
import { compareHash } from "../validation/passwordValidator";
const validator = new Validator();

export class UserLoginController {
  async login(req: Request, res: Response, next: NextFunction) {
    const userRepo = getCustomRepository(UserRepository);
    const { email, password } = req.body;
    const { isValid, message } = validator.login(email, password);

    if (!isValid) return res.status(400).json(message);

    const userExists = await userRepo.findOne({ email });
    if (!userExists) {
      next(new HandleError("User doesn't exists", 404));
      return;
    }
    if (!compareHash(password, userExists.password)) {
      next(
        new HandleError(
          "Please check your email and password, and try again",
          404
        )
      );
      return;
    }
    const token = getToken({ id: userExists.id });
    //
    return res.header("Auth-Token", token).send(token);
  }
}
