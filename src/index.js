import express from "express";
import boom from "@hapi/boom";
import morgan from "morgan";
import cors from "cors";
import passport from "passport";
import { defineJWTStrategy } from "./config/passport";
import apiRouter from "./features/api.router";
import db from "./config/db";
import config from "./config/index";
import { handleValidationError } from "./errors/handleErrors";
import logger from "./config/winston";
import solveStolenBikeListener from "./listeners/SolveStolenBikeListener";

const app = express();

app.use(cors());
app.use(express.json());

app.use(morgan("combined", { stream: logger.stream }));

// Stablish mongoose connection
db.connect().then(() => solveStolenBikeListener());

defineJWTStrategy(passport);
app.use(passport.initialize());

app.use(apiRouter);

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
