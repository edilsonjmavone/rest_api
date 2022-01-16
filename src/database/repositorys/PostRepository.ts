import { Repository, EntityRepository } from "typeorm";
import { User } from "../entity/User";
import { Post } from "../entity/Post";

@EntityRepository(Post)
export class PostRepository extends Repository<Post> {
  async getAll() {
    let data: any = [];
    try {
      const post = await this.find({
        //TODO:Handle Promise Rejection
        relations: ["user"]
      });

      post.forEach(dat =>
        data.push({ userName: dat.user.name, text: dat.text })
      );
      return data;
    } catch (error) {
      throw error;
    }
  }
  async addPost(text: string, user: User) {
    const pts = this.create({
      text,
      user
    });
    try {
      await this.save(pts); //TODO:Handle Promise Rejection
    } catch (error) {
      throw error;
    }
  }
}
