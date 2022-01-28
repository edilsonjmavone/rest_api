import { Router, Request, Response, NextFunction } from "express";
import { UserController } from "../controllers/usersController";
import { PostController } from "../controllers/postsController";
import { UserLoginController } from "../controllers/userLoginController";

const userController = new UserController();
const postController = new PostController();
const userLoginController = new UserLoginController();

export const privateRoutes = Router();
privateRoutes
  .get("/users", userController.getUser)
  .get("/users/:id", userController.getUser)
  .patch("/users/update/:id", userController.updateUser)
  .delete("/users/delete/:id", userController.deleteUser)
  .post("/posts", postController.addPost);
  
  export const publicRoutes = Router();
  publicRoutes
  .get("/ping", (req, res) => {
    res.status(200);
    res.json(serverRoutes);
  })
  .post("/users", userController.addUser)
  .post("/user/login", userLoginController.login)
  .get("/posts", postController.getPost);

const serverRoutes = {
  user_methods: {
    getUser: `GET http://192.168.8.100:${process.env.PORT}/users`,
    addUser: `POST http://192.168.8.100:${process.env.PORT}/users`,
    updateUser: `PATCH  http://192.168.8.100:${process.env.PORT}/users/update:id`,
    deleteUser: `DELETE http://192.168.8.100:${process.env.PORT}/users/delete/:id`
  },
  post_methods: {
    getPost: `GET http://192.168.8.100:${process.env.PORT}/posts`,
    addPost: `POST http://192.168.8.100:${process.env.PORT}/posts`
  }
};
