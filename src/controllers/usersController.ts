import { getRepository, getCustomRepository } from "typeorm";
import { User } from "../database/entity/User";
import { Request, Response, NextFunction } from "express";
import { UserRepository } from "../database/repositorys/UserRepository";
import { HandleError } from "../error/handleError";

class UserController {
  async getUser(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const userRepository = getCustomRepository(UserRepository);

    try {
      const data = await userRepository.getAll(id);
      if (data.length == 0) next(new HandleError("User not found", 404));

      return res.status(200).send({ data });
    } catch (error) {
      next(new HandleError(error, 500));

      console.log(`next() activated`);
      //return res
      //  .status(500)
      //  .json({ error: "Internal server error" })
      //  .end();
    }
  }
  async addUser(req: Request, res: Response, next: NextFunction) {
    const { name, email } = req.body;
    const UserRepository = getRepository(User);
    try {
      const usrAlredyexists = await UserRepository.findOne({
        email,
        _deleted: "false"
      });

      if (usrAlredyexists) next(new HandleError("User alredy exists", 404));
      // return res
      //   .status(400)
      //   .json({ error: "User alredy exists" })
      //   .end();

      const usr = UserRepository.create({
        name,
        email,
        _deleted: "false"
      });
      await UserRepository.save(usr);
      return res.status(204).json(usr);
    } catch (error) {
      next(new HandleError(error));
      // return res
      //   .status(500)
      //   .json({ error: "Internal server error" })
      //   .end();
    }
  }
  async updateUser(req: Request, res: Response, next: NextFunction) {
    const UserRepository = getRepository(User);
    const { id } = req.params;
    const { name } = req.body;
    try {
      const usr = await UserRepository.find({ id, _deleted: "false" });

      if (usr.length == 0) next(new HandleError("User not fund"));

      await UserRepository.update({ id }, { name });
      const data = await UserRepository.find({ id });

      return res.status(204).json({ data, msg: "sdf" });
    } catch (error) {
      next(new HandleError(error));
      // return res
      //   .status(500)
      //   .json({ error: "Internal server error" })
      //   .end();
    }
  }
  async deleteUser(req: Request, res: Response, next: NextFunction) {
    const UserRepository = getRepository(User);
    const { id } = req.params;

    try {
      const usr = await UserRepository.find({ id });

      if (usr.length == 0) next(new HandleError("User not found", 404));

      await UserRepository.update({ id }, { _deleted: "true" });

      return res.status(204).json({ msg: `${id} DELETED` });
    } catch (error) {
      next(new HandleError(error));
      // return res
      //   .status(500)
      //   .json({ error: "Internal server error" })
      //   .end();
    }
  }
}

export { UserController };
