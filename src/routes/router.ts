import { Router, Request, Response, NextFunction } from "express";
import { UserController } from "../controllers/usersController";
import { PostController } from "../controllers/postsController";
import { UserLoginController } from "../controllers/userLoginController";
import { verifyRefresh, verify } from "../validation/acessValidator";

const userController = new UserController();
const postController = new PostController();
const userLoginController = new UserLoginController();

export const routes = Router();
routes
  .post("/user/sigin", userController.addUser)
  .post("/user/login", userLoginController.login)
  .get("/user/refresh", verifyRefresh, userLoginController.userRefreshAuth)
  .get("/user/logout", verifyRefresh, userLoginController.logout)
  .get("/posts", postController.getPost)
  .get("/ping", (req, res) => {
    res.status(200);
    res.json({ yourCookies: res.locals.cookie, serverRoutes });
  })
  .get("/users", verify, userController.getUser)
  .get("/users/:id", verify, userController.getUser)
  .patch("/users/update/:id", verify, userController.updateUser)
  .delete("/users/delete/:id", verify, userController.deleteUser)
  .post("/posts", verify, postController.addPost);

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
