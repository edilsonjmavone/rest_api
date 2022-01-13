import { Repository, EntityRepository, Any } from "typeorm";
import { User } from "../entity/User";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async getAll(id?: string) {
    if (id) {
      const oneUsr = await this.find({ id, _deleted: "false" });
      return this.parseData(oneUsr);
    }
    const manyUsr = await this.find({ _deleted: "false" });
    return this.parseData(manyUsr);
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
