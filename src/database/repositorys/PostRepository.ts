import { Repository, EntityRepository } from "typeorm";
import { User } from "../entity/User";
import { Post } from "../entity/Post";

@EntityRepository(Post)
export class PostRepository extends Repository<Post> {
  async getAll() {
    let data: any = [];
    const post = await this.find({
      relations: ["user"]
    });
    post.forEach(dat => data.push({ userName: dat.user.name, text: dat.text }));
    return data;
  }
  async addPost(text: string, user: User) {
    const pts = this.create({
      text,
      user
    });
    await this.save(pts);
  }
}
