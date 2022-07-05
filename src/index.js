import express from "express";
import boom from "@hapi/boom";
import morgan from "morgan";
import passport from "passport";
import { defineJWTStrategy } from "./config/passport";
import apiRouter from "../src/features/api.router";
import db from "./config/db";
import config from "./config/index";
import { handleValidationError } from "./errors/handleErrors";
import logger from "./config/winston";

const app = express();

app.use(express.json());

app.use(morgan("combined", { stream: logger.stream }));

// Stablish mongoose connection
db.connect();

defineJWTStrategy(passport);
app.use(passport.initialize());

app.use(apiRouter);

// Process ping
app.get("/ping", async (req, res) =>
  res.send({
    status: "pong",
    name,
    uptime: process.uptime(),
    db: mongoose.connection.readyState,
  })
);

app.listen(config.port, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Stolen bikes app listening on port ${config.port}`);
});

app.use(handleValidationError);

app.use((err, req, res, next) => {
  console.log(err);
  const error = err.isBoom ? err : boom.internal(err.message);
  const { statusCode, payload } = error.output;

  res.status(statusCode).json(payload);
});
