import "reflect-metadata";
import "./database";
import cors from "cors";
import express, { NextFunction, Response, Request } from "express";
import "dotenv/config";
import { privateRoutes, publicRoutes } from "./routes/router";
import { HandleError } from "./error/handleError";
import { verify } from "./acessValidator";
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
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
  res.status(400).json({ msg: `${req.path} unavalidable` });
});

if (!port) {
  console.log(`can't get PORT`);
  process.exit;
}
app.listen(port, () => {
  console.clear();
  console.log(`Api server runnig at http://localhost:${port}`);
});
