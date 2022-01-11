import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../database/entity/User";
import { Post } from "../database/entity/Post";

export class PostController {
  async getPost(req: Request, res: Response) {
    const postRepository = getRepository(Post);
    try {
      const post = await postRepository.find({
        relations: ["user"]
      });

      return res.status(200).send({ post, msg: "working" });
    } catch (error) {
      console.warn(error);
      return res
        .status(500)
        .json({ error: "internal server error" })
        .end();
    }
  }
  async addPost(req: Request, res: Response) {
    const { text, userID } = req.body;

    const userRpository = getRepository(User);
    try {
      const usrExistis = await userRpository.findOne(userID);
      if (!usrExistis) return res.status(404).json({ msg: "user not found" });

      const postRepository = getRepository(Post);
      const pts = postRepository.create({
        text
      });
      pts.user = usrExistis;
      await postRepository.save(pts);
      return res.status(204).end();
    } catch (error) {
      console.warn(error);
      return res
        .status(500)
        .json({ error: "internal server error" })
        .end();
    }
  }
}
