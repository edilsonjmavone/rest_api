import "reflect-metadata";
import "./database";
import cors from "cors";
import express, { NextFunction, Response, Request } from "express";
import { config } from "dotenv";
import { privateRoutes, publicRoutes } from "./routes/router";
import { HandleError } from "./error/handleError";
import { verify } from "./validation/acessValidator";
config();
const app = express();

app.use(cors());
app.use(express.json());
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} request to ${req.path}`);
  next();
});
app.use(publicRoutes);
app.use(verify, privateRoutes);

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
/**
 * "

"id": "4dfc300f-5ae5-4650-bc50-45d8c8bcb254",
"name": "test",
"email": "testemail@wezz.com"
},
{
"id": "a4146933-1538-491d-b34e-3ebe31597610",
"name": "test",
"email": "testemail@wezz.com"

 */
