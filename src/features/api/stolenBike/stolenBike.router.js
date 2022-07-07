import { Router } from "express";
import {
  createStolenBike,
  resolveStolenBike,
  listStolenBike,
} from "./stolenBike.controller";
import { loadStolenBike, bookFreePoliceOfficer } from "./stolenBike.middleware";
import validator from "./stolenBike.validator";

const router = Router();

router.get("/", listStolenBike);

router.post(
  "/",
  validator.createStolenBike,
  bookFreePoliceOfficer,
  createStolenBike
);

router.post(
  "/:stolenBikeId/solve",
  validator.resolveStolenBike,
  loadStolenBike,
  resolveStolenBike
);

export default router;
