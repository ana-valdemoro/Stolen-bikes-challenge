import express from "express";
import boom from "@hapi/boom";
import apiRouter from "../src/features/api.router";
import db from "./config/db";
import config from "./config/index";
import { handleValidationError } from "./errors/handleErrors";

const app = express();

app.use(express.json());

// Stablish mongoose connection
db.connect();

app.use(apiRouter);

// Process ping
app.get("/ping", async (req, res) =>
  res.send({
    status: "pong",
    name,
    uptime: process.uptime(),
    db: mongoose.connection.readyState,
    // cache: redisClient.connected
  })
); // eslint-disable-line

app.listen(config.port, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Stolen bikes app listening on port ${config.port}`);
});

app.use(handleValidationError);

app.use((err, req, res, next) => {
  const error = err.isBoom ? err : boom.internal(err.message);
  const { statusCode, payload } = error.output;

  res.status(statusCode).json(payload);
});
