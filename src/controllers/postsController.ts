import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { PostRepository } from "../database/repositorys/PostRepository";
import { UserRepository } from "../database/repositorys/UserRepository";

export class PostController {
  async getPost(req: Request, res: Response) {
    const postRepository = getCustomRepository(PostRepository);
    try {
      const data = await postRepository.getAll();

      return res.status(200).send({ data });
    } catch (error) {
      console.warn(error);
      return res
        .status(500)
        .json({ error: "Internal server error" })
        .end();
    }
  }
  async addPost(req: Request, res: Response) {
    const { text, userID } = req.body;

    const userRpository = getCustomRepository(UserRepository);
    try {
      const userAlredyExists = await userRpository.findOne(userID);

      if (!userAlredyExists)
        return res.status(404).json({ msg: "User not found" });

      await getCustomRepository(PostRepository).addPost(text, userAlredyExists);

      return res.status(204).end();
    } catch (error) {
      console.warn(error);
      return res
        .status(500)
        .json({ error: "Internal server error" })
        .end();
    }
  }
}
