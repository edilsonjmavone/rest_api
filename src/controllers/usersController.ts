import { getRepository, getCustomRepository } from "typeorm";
import { User } from "../database/entity/User";
import { Request, Response, NextFunction } from "express";
import { UserRepository } from "../database/repositorys/UserRepository";
import { HandleError } from "../error/handleError";
import Validator from "../validation/dataValidator";
import { genPawHash } from "../validation/passwordValidator";
const validator = new Validator();

class UserController {
  async getUser(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const userRepository = getCustomRepository(UserRepository);

    try {
      const data = await userRepository.getAll(id);

      if (data.length == 0) {
        next(new HandleError("User not found", 401));
        return;
      }
      return res.status(200).send({ data });
    } catch (error) {
      next(new HandleError("Internal server error"));
      return;
    }
  }
  async addUser(req: Request, res: Response, next: NextFunction) {
    const { name, email, password } = req.body;

    const { isValid, message } = validator.user(name, email, password);
    if (!isValid) {
      next(new HandleError(message, 400));
      return; // error handling
    }

    const UserRepository = getRepository(User);
    try {
      const usrAlredyexists = await UserRepository.findOne({
        email
      });

      if (usrAlredyexists) {
        next(new HandleError("User alredy exists"));
        return;
        // error handling
      }

      const usr = UserRepository.create({
        name,
        email,
        password: genPawHash(password)
      });

      await UserRepository.save(usr);

      return res.status(204).json(usr);
    } catch (error) {
      next(new HandleError("Internal server error"));
      return;
    }
  }
  async updateUser(req: Request, res: Response, next: NextFunction) {
    const UserRepository = getRepository(User);
    const { id } = req.params;
    const { name } = req.body;
    try {
      const usr = await UserRepository.find({ id, _deleted: "false" });

      if (usr.length == 0) {
        next(new HandleError("User not found"));
        return;
        // error handling
      }

      await UserRepository.update({ id }, { name });
      const data = await UserRepository.find({ id });

      return res.status(204).json({ data, msg: "sdf" });
    } catch (error) {
      next(new HandleError("Internal server error"));
      return;
      // error handling
    }
  }
  async deleteUser(req: Request, res: Response, next: NextFunction) {
    const UserRepository = getRepository(User);
    const { id } = req.params;

    try {
      const usr = await UserRepository.find({ id });

      if (usr.length == 0) {
        next(new HandleError("User not found", 404));
        return; // error handling
      }
      await UserRepository.softDelete({ id });

      return res.status(204).json({ msg: `${id} DELETED` });
    } catch (error) {
      next(new HandleError("Internal server error"));
      return;
      // error handling
    }
  }
}
export { UserController };
