import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const secretKey = process.env.SECRET_KEY!;
const secretRefreshKey = process.env.SECRET_REFRESH_KEY!;

//verify the Auth token
export const verify = (req: Request, res: Response, next: NextFunction) => {
  const { AuthToken } = res.locals.cookie;
  try {
    if (AuthToken) {
      const verified = jwt.verify(AuthToken, secretKey);
      res.locals.tokenData = { userId: (<any>verified).id };
      // console.log(res.locals.tokenData);
      next();
    } else {
      return res
        .status(400)
        .json({ error: { message: "Forbiden \n No credencials" } });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ error: { message: "Forbiden \n Invalid crendencials" } });
  }
};
// verify the refresh token
export const verifyRefresh = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { RefreshToken } = res.locals.cookie;
  try {
    if (RefreshToken) {
      const verified = jwt.verify(RefreshToken, secretRefreshKey);
      res.locals.refreshTokenData = { userId: (<any>verified).id };
      next();
    } else {
      return res.status(400).json({ error: { message: "Forbiden" } });
    }
  } catch (error) {
    return res.status(400).json({ error: { message: "Forbiden" } });
  }
};

// // return the auth token data
// export const getTokenData = (token: string) => {
//   try {
//     return jwt.verify(token, secretKey);
//   } catch (error) {}
// };

// return the refresh token data
export const getRefreshTokenData = (token: string) => {
  try {
    return jwt.verify(token, secretRefreshKey);
  } catch (error) {}
};

// reaturns the auth token
export const getToken = (payload: {
  id: string;
  email: string;
  name: string;
}) => {
  const token = jwt.sign(payload, secretKey, { expiresIn: "30s" });
  return token;
};

// reaturns the refresh token
export const getRefreshToken = (payload: {
  id: string;
  email: string;
  name: string;
}) => {
  const token = jwt.sign(payload, secretRefreshKey);
  return token;
};
