import { Router } from "express";
import { createStolenBike, resolveStolenBike } from "./stolenBike.controller";
import { loadStolenBike } from "./stolenBike.middleware";
import validator from "./stolenBike.validator";

const router = Router();

router.post("/", validator.createStolenBike, createStolenBike);

router.post(
  "/:stolenBikeId/solve",
  validator.resolveStolenBike,
  loadStolenBike,
  resolveStolenBike
);

export default router;
