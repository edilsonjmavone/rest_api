import { Request, Response, NextFunction } from "express";
import Validator from "../validation/dataValidator";
import { UserRepository } from "../database/repositorys/UserRepository";
import { getCustomRepository } from "typeorm";
import { HandleError } from "../error/handleError";
import { getToken, getRefreshToken } from "../validation/acessValidator";
import { compareHash } from "../validation/passwordValidator";
const validator = new Validator();

export class UserLoginController {
  async login(req: Request, res: Response, next: NextFunction) {
    const userRepo = getCustomRepository(UserRepository);
    const { email, password } = req.body;
    const { isValid, message } = validator.login(email, password);

    // Validating tokens and credencials
    if (!isValid) return res.status(400).json(message);

    const userExists = await userRepo.findOne({ email });
    if (!userExists) {
      next(new HandleError("User doesn't exists", 404));
      return;
    }
    if (!compareHash(password, userExists.password)) {
      next(
        new HandleError(
          "Please check your email and password, and try again",
          404
        )
      );
      return;
    }
    // Setting up Auth/Refresh Tokens
    const token = getToken({
      id: userExists.id,
      email: userExists.email,
      name: userExists.name
    });
    const refreshToken = getRefreshToken({
      id: userExists.id,
      email: userExists.email,
      name: userExists.name
    });

    // Store

    await userRepo.update({ id: userExists.id }, { refreshToken });

    res.cookie("AuthToken", token, {
      expires: new Date(new Date().setSeconds(60)),
      httpOnly: true
    });

    res.cookie("RefreshToken", refreshToken, {
      httpOnly: true
    });

    //
    return res.status(200).json({ token, refreshToken });
  }
  async userRefreshAuth(req: Request, res: Response, next: NextFunction) {
    const refreshTokenCookie = res.locals.cookie.RefreshToken;
    if (!refreshTokenCookie)
      return res.status(400).json({ error: { message: "log in first" } });
    const userRepository = getCustomRepository(UserRepository);
    // const tokenData = getRefreshTokenData(refreshTokenCookie);
    try {
      const user = await userRepository.findOne(
        res.locals.refreshTokenData.userId
      );

      if (!user.refreshToken === refreshTokenCookie)
        return res
          .status(400)
          .json({ error: { message: "Invalid refresh Token" } });

      const token = getToken({
        id: user.id,
        email: user.email,
        name: user.name
      });

      res.cookie("AuthToken", token, {
        expires: new Date(new Date().setSeconds(60)),
        httpOnly: true,
        sameSite: "strict"
      });

      return res.status(200).end();
    } catch (error) {
      next(new HandleError("Internal server error [refreshing auth-token]"));
    }
  }
  async logout(req: Request, res: Response, next: NextFunction) {
    const refreshTokenCookie = res.locals.cookie.RefreshToken;
    if (!refreshTokenCookie)
      return res.status(400).json({ error: { message: "log in first" } });
    const userRepository = getCustomRepository(UserRepository);
    // const tokenData = getRefreshTokenData(refreshTokenCookie);

    // Validating tokens and credencials
    try {
      const userExists = await userRepository.findOne(
        res.locals.refreshTokenData.userId
      );
      if (!userExists)
        return res.status(400).json({ error: { message: "User not found" } });
      await userRepository.update(
        { id: userExists.id },
        { refreshToken: null }
      );
      res.clearCookie("RefreshToken");
      return res.status(200).end();
    } catch (error) {
      next(new HandleError("Internal server error [in log out ]"));
    }
  }
}
