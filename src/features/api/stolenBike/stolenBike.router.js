import { Router } from "express";
import {
  hasDirectorPermissions,
  hasPermissions,
} from "../../../utils/middleware/authorization";
import {
  createStolenBike,
  resolveStolenBike,
  listStolenBike,
  getStolenBike,
} from "./stolenBike.controller";
import {
  loadStolenBike,
  bookFreePoliceOfficer,
  loadBikeOwner,
} from "./stolenBike.middleware";
import validator from "./stolenBike.validator";

const router = Router();

router.get("/", hasPermissions, validator.queryParams, listStolenBike);

router.get("/:stolenBikeId", hasPermissions, getStolenBike);

router.post(
  "/",
  validator.createStolenBike,
  loadBikeOwner,
  bookFreePoliceOfficer,
  createStolenBike
);

router.post(
  "/:stolenBikeId/solve",
  hasDirectorPermissions,
  validator.resolveStolenBike,
  loadStolenBike,
  resolveStolenBike
);

export default router;
