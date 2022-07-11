import { Router } from "express";
import { login, register } from "./auth.controller";
import validator from "../users/users.validator";
import { hasPoliceOfficerPermissions } from "../../../utils/middleware/authorization";
import {
  loadPoliceOfficer,
  loadPoliceOfficerStolenBike,
} from "./auth.middeware";
import {
  getAssignedStolenBike,
  resolveStolenBike,
} from "../stolenBike/stolenBike.controller";
import { authorizeHeader } from "../../../utils/middleware/jwt";
import stolenBikeValidator from "../stolenBike/stolenBike.validator";

const router = Router();

router.post("/login", validator.login, login);

router.post("/register", validator.createUser, register);

router.get(
  "/police-officer/stolen-bike",
  authorizeHeader,
  hasPoliceOfficerPermissions,
  loadPoliceOfficer,
  loadPoliceOfficerStolenBike,
  getAssignedStolenBike
);

router.post(
  "/police-officer/stolen-bike/solve",
  authorizeHeader,
  hasPoliceOfficerPermissions,
  stolenBikeValidator.resolveStolenBike,
  loadPoliceOfficer,
  loadPoliceOfficerStolenBike,
  resolveStolenBike
);

export default router;
