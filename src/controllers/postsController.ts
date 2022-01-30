import { Request, Response, NextFunction } from "express";
import { getCustomRepository } from "typeorm";
import { PostRepository } from "../database/repositorys/PostRepository";
import { UserRepository } from "../database/repositorys/UserRepository";
import { HandleError } from "../error/handleError";
import Validator from "../validation/dataValidator";
import { getTokenData } from "../validation/acessValidator";
const validator = new Validator();
export class PostController {
  async getPost(req: Request, res: Response, next: NextFunction) {
    const postRepository = getCustomRepository(PostRepository);
    try {
      const data = await postRepository.getAll();

      return res.status(200).send({ data });
    } catch (error) {
      next(new HandleError("Internal server error"));
      return;
    }
  }
  async addPost(req: Request, res: Response, next: NextFunction) {
    let token = req.header("Auth-Token");
    const tokenData = getTokenData(token);
    const { text } = req.body;
    const { isValid, message } = validator.post(text);

    if (!isValid) {
      next(new HandleError(message, 400));
      return;
    }

    const userRpository = getCustomRepository(UserRepository);
    try {
      const userAlredyExists = await userRpository.findOne({
        id: (<any>tokenData).id
      });

      if (!userAlredyExists) {
        next(new HandleError("User not found", 404));
        return;
      }

      await getCustomRepository(PostRepository).addPost(text, userAlredyExists);

      return res.status(204).end();
    } catch (error) {
      next(new HandleError("Internal server error"));
      return;
    }
  }
}
