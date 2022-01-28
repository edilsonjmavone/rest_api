import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { HandleError } from "../error/handleError";
const secretKey = process.env.SECRET_KEY || "asdajsdalsbdklhbakhbskdasdasd"; // this value can not be undefined so...

export const verify = (req: Request, res: Response, next: NextFunction) => {
  let token = req.header("Auth-Token");
  console.log("jsdf");
  try {
    if (token) {
      const verified = jwt.verify(token, secretKey);
      console.log(verified);
      next();
    } else {
      return res.status(400).send("Forbiden");
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send("Forbiden");
  }
};

export const getToken = (payload: { id: string }) => {
  const token = jwt.sign(payload, secretKey);
  return token;
};
