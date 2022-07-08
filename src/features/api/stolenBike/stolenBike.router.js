import { Router } from "express";
import { checkUserIsAuthorized } from "../../../utils/middleware/authorization";
import {
  createStolenBike,
  resolveStolenBike,
  listStolenBike,
  getStolenBike,
} from "./stolenBike.controller";
import { loadStolenBike, bookFreePoliceOfficer } from "./stolenBike.middleware";
import validator from "./stolenBike.validator";

const router = Router();

router.get("/", checkUserIsAuthorized("stolen-bikes:view"), listStolenBike);

router.get(
  "/:stolenBikeId",
  checkUserIsAuthorized("stolen-bikes:view"),
  getStolenBike
);

router.post(
  "/",
  checkUserIsAuthorized("stolen-bikes:create"),
  validator.createStolenBike,
  bookFreePoliceOfficer,
  createStolenBike
);

router.post(
  "/:stolenBikeId/solve",
  checkUserIsAuthorized("stolen-bikes:solve"),
  validator.resolveStolenBike,
  loadStolenBike,
  resolveStolenBike
);

export default router;
