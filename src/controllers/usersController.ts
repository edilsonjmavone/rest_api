import { getRepository } from "typeorm";
import { User } from "../database/entity/User";
import { Request, Response } from "express";

class UserController {
  async getUser(req: Request, res: Response) {
    const { id } = req.params;
    const UserRepository = getRepository(User);
    if (!id) {
      const data = await UserRepository.find({ _deleted: "false" });
      if (data.length == 0)
        return res.status(404).json({ msg: "user not found" });
      return res.status(200).send({ data, msg: "working" });
    } else {
      const data = await UserRepository.find({ id, _deleted: "false" });
      if (data.length == 0)
        return res.status(404).json({ msg: "user not found" });
      return res.status(200).send({ data, msg: "working" });
    }
  }
  async addUser(req: Request, res: Response) {
    const { name, email } = req.body;
    const UserRepository = getRepository(User);
    const usrAlredyexists = await UserRepository.findOne({
      email,
      _deleted: "false"
    });

    if (usrAlredyexists)
      return res
        .status(400)
        .json({ error: "user alredy exists" })
        .end();

    const usr = UserRepository.create({
      name,
      email,
      _deleted: "false"
    });
    try {
      await UserRepository.save(usr);
      res.status(204).json(usr);
    } catch (error) {
      console.warn(error);
      return res
        .status(500)
        .json({ error: "internal server error" })
        .end();
    }
  }
  async updateUser(req: Request, res: Response) {
    const UserRepository = getRepository(User);
    const { id } = req.params;
    const { name } = req.body;
    const usr = await UserRepository.find({ id, _deleted: "false" });
    if (usr.length == 0) return res.status(404).json({ msg: "user not found" });

    await UserRepository.update({ id }, { name });
    const data = await UserRepository.find({ id });

    return res.status(204).json({ data, msg: "sdf" });
  }
  async deleteUser(req: Request, res: Response) {
    const UserRepository = getRepository(User);
    const { id } = req.params;
    const usr = await UserRepository.find({ id });

    if (usr.length == 0) return res.status(404).json({ msg: "user not found" });

    await UserRepository.update({ id }, { _deleted: "true" });

    return res.status(204).json({ msg: `${id} DELETED` });
  }
}

export { UserController };

/*
TODO: GET	Read	200 (OK), list of entities. Use pagination, sorting and filtering to navigate big lists.	
200 (OK), single entity.

404 (Not Found), if ID not found or invalid.

TODO: POST	Create	201 (Created), Response contains response similar to GET /user/{id} containing new ID.	not applicable
 
TODO:PATCH	Update	not applicable	
200 (OK) or 204 (No Content).

404 (Not Found), if ID not found or invalid.

TODO: DELETE	Delete	200(OK) or 403(Forbidden) or 400(Bad Request) if no filter is specified.	
200 (OK).

404 (Not Found), if ID not found or invalid.

*/
