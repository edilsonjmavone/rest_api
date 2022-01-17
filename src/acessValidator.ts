import { NextFunction, Request, Response } from "express";

export const verify = (req: Request, res: Response, next: NextFunction) => {
  let code = req.header("header-test");
  if (code == "Alowed") {
    next();
  } else {
    res
      .status(401)
      .json({
        error: {
          message: "Forbiden"
        }
      })
      .end();
  }
};
