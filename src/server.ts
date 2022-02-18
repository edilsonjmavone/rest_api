import "reflect-metadata";
import "./database";
import cors from "cors";
import express, { NextFunction, Response, Request } from "express";
import { config } from "dotenv";
import { routes } from "./routes/router";
import { HandleError } from "./error/handleError";
import { verify } from "./validation/acessValidator";
config();
const app = express();

app.use(cors());
app.use(express.json({ limit: "1mb" }));

app.use((req, res, next) => {
  const {
    headers: { cookie }
  } = req;
  if (cookie) {
    const values = cookie.split(";").reduce((res, item) => {
      const data = item.trim().split("=");
      return { ...res, [data[0]]: data[1] };
    }, {});
    res.locals.cookie = values;
  } else res.locals.cookie = {};
  next();
});

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} request to ${req.path}`);
  next();
});
// TODO: FIX: /users/sigin returns "Forbiden" instead of "unavailable"
app.use(routes);

app.use((err: HandleError, req: Request, res: Response, next: NextFunction) => {
  if (!err.status) {
    next();
    return;
  }
  res.status(err.status).json({
    Error: {
      name: err.name,
      message: err.message
    }
  });
});

app.use((req: Request, res: Response) => {
  res.status(400).json({ msg: `${req.path} unavailable` });
});

export default app;
