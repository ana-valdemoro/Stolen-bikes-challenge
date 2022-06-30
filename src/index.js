import express from "express";
import apiRouter from "../src/features/api.router";

const app = express();
const port = 3000;

app.use(express.json());

app.use(apiRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
