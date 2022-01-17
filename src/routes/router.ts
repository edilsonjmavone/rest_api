import { Router, Request, Response, NextFunction } from "express";
import { UserController } from "../controllers/usersController";
import { PostController } from "../controllers/postsController";
import { UserLoginController } from "../controllers/userLoginController";

const userController = new UserController();
const postController = new PostController();
const userLoginController = new UserLoginController();

export const privateRoutes = Router();
privateRoutes
  .get("/posts", postController.getPost)
  .get("/users", userController.getUser)
  .get("/users/:id", userController.getUser)
  .post("/posts", postController.addPost)
  .post("/users", userController.addUser)
  .patch("/users/update/:id", userController.updateUser)
  .delete("/users/delete/:id", userController.deleteUser);

export const publicRoutes = Router();
publicRoutes
  .get("/ping", (req, res) => res.json("Server Working..."))
  .post("/user/login", userLoginController.login);
