import { Router } from "express";
import { hasPoliceOfficerPermissions } from "../../../utils/middleware/authorization";
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

router.get("/", hasPoliceOfficerPermissions, listStolenBike);

router.get("/:stolenBikeId", hasPoliceOfficerPermissions, getStolenBike);

router.post(
  "/",
  validator.createStolenBike,
  loadBikeOwner,
  bookFreePoliceOfficer,
  createStolenBike
);

router.post(
  "/:stolenBikeId/solve",
  hasPoliceOfficerPermissions,
  validator.resolveStolenBike,
  loadStolenBike,
  resolveStolenBike
);

export default router;
