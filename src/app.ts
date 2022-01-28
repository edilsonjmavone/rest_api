import app from "./server";
const port = process.env.PORT || 3000;

if (!port) {
  console.log(`can't get PORT`);
  process.exit;
}

app.listen(port, () => {
  console.clear();
  console.log(
    `Api server runnig at http://localhost:${port} in ${process.env.NODE_ENV} environment`
  );
});
