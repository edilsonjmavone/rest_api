import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const secretKey = process.env.SECRET_KEY!;
const secretRefreshKey = process.env.SECRET_REFRESH_KEY!;

//verify the Auth token
export const verify = (req: Request, res: Response, next: NextFunction) => {
  let token = req.header("Auth-Token");
  console.log("jsdf");
  try {
    if (token) {
      const verified = jwt.verify(token, secretKey);
      next();
    } else {
      return res.status(400).json({ error: { message: "Forbiden" } });
    }
  } catch (error) {
    return res.status(400).json({ error: { message: "Forbiden" } });
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
      next();
    } else {
      return res.status(400).json({ error: { message: "Forbiden" } });
    }
  } catch (error) {
    return res.status(400).json({ error: { message: "Forbiden" } });
  }
};

// return the auth token data
export const getTokenData = (token: string) => {
  return jwt.verify(token, secretKey);
};

// return the refresh token data
export const getRefreshTokenData = (token: string) => {
  return jwt.verify(token, secretRefreshKey);
};

// reaturns a refresh token
export const getToken = (payload: {
  id: string;
  email: string;
  name: string;
}) => {
  const token = jwt.sign(payload, secretKey, { expiresIn: "30s" });
  return token;
};

// reaturns a refresh token
export const getRefreshToken = (payload: {
  id: string;
  email: string;
  name: string;
}) => {
  const token = jwt.sign(payload, secretRefreshKey);
  return token;
};
