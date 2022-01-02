import { Router } from "express";
import { UserController } from "./controllers/usersController";
const userController = new UserController();

export const router = Router();
router
  .get("/users", userController.getUser)
  .get("/users/:id", userController.getUser)
  .post("/users", userController.addUser)
  .patch("/users/update/:id", userController.updateUser)
  .delete("/users/delete/:id", userController.deleteUser);
