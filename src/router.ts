import { Router } from "express";
import { UserController } from "./controllers/usersController";
import { PostController } from "./controllers/postsController";
const userController = new UserController();
const postController = new PostController();
export const router = Router();
router
  .get("/ping", (req, res) => res.json("Server Working..."))
  .get("/posts", postController.getPost)
  .get("/users", userController.getUser)
  .get("/users/:id", userController.getUser)
  .post("/posts", postController.addPost)
  .post("/users", userController.addUser)
  .patch("/users/update/:id", userController.updateUser)
  .delete("/users/delete/:id", userController.deleteUser);
