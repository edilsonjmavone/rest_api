import app from "./server";
import { config } from "dotenv";
config();
const port = process.env.PORT || 3000;

app.listen(port, () => {
  // console.clear();
  console.log(
    `Api server runnig at http://localhost:${port} in ${process.env.NODE_ENV} env`
  );
});
