import "reflect-metadata";
import "./database";
import cors from "cors";
import express, { NextFunction, Response, Request } from "express";
import "dotenv/config";
import { router } from "./router";
import { HandleError } from "./error/handleError";
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(router);

app.use((err: HandleError, req: Request, res: Response, next: NextFunction) => {
  res
    .json({
      Error: {
        name: err.name,
        message: err.message
      }
    })
    .status(err.status || 500);
});

if (!port) {
  console.log(`can't get PORT`);
  process.exit;
}
app.listen(port, () => console.log(`Runnig at port ${port}`));
