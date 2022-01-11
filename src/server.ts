import "reflect-metadata";
import "./database";
import cors from "cors";
import express from "express";
import "dotenv/config";
import { router } from "./router";
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(router);

if (!port) {
  console.log(`can't get PORT`);
  process.exit;
}
app.listen(port, () => console.log(`Runnig at port ${port}`));
