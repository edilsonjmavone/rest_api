import { Repository, EntityRepository, Any } from "typeorm";
import { User } from "../entity/User";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async getAll(id?: string) {
    if (id) {
      try {
        const oneUsr = await this.find({ id });
        return this.parseData(oneUsr);
      } catch (error) {
        throw error;
      }
    }
    try {
      const manyUsr = await this.find({});
      return this.parseData(manyUsr);
    } catch (error) {
      throw error;
    }
  }
  private parseData(data: User[]) {
    let parsedData: any = [];
    data.forEach((element: User) =>
      parsedData.push({
        id: element.id,
        name: element.name,
        email: element.email
      })
    );
    return parsedData;
  }
}
