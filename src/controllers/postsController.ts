import { Request, Response, NextFunction } from "express";
import { getCustomRepository } from "typeorm";
import { PostRepository } from "../database/repositorys/PostRepository";
import { UserRepository } from "../database/repositorys/UserRepository";
import { HandleError } from "../error/handleError";
import Validator from "../dataValidator";
const validator = new Validator();
export class PostController {
  async getPost(req: Request, res: Response, next: NextFunction) {
    const postRepository = getCustomRepository(PostRepository);
    try {
      const data = await postRepository.getAll();

      return res.status(200).send({ data });
    } catch (error) {
      next(new HandleError("Internal server error", 404));
    }
  }
  async addPost(req: Request, res: Response, next: NextFunction) {
    const { text, userID } = req.body;
    const { isValid, message } = validator.post(userID, text);
    if (!isValid) return res.status(400).json(message);

    const userRpository = getCustomRepository(UserRepository);
    try {
      const userAlredyExists = await userRpository.findOne(userID);

      if (!userAlredyExists) {
        next(new HandleError("User not found", 404));
        return;
      }

      await getCustomRepository(PostRepository).addPost(text, userAlredyExists);

      return res.status(204).end();
    } catch (error) {
      next(new HandleError("Internal server error"));
    }
  }
}
