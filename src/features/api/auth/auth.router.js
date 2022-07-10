import { Router } from "express";
import { login, register } from "./auth.controller";
import validator from "../users/users.validator";
import { hasPoliceOfficerPermissions } from "../../../utils/middleware/authorization";
import { loadPoliceOfficer } from "./auth.middeware";
import { getAssignedStolenBike } from "../stolenBike/stolenBike.controller";
import { authorizeHeader } from "../../../utils/middleware/jwt";

const router = Router();

router.post("/login", validator.login, login);

router.post("/register", validator.createUser, register);

router.get(
  "/police-officer/stolen-bike",
  authorizeHeader,
  hasPoliceOfficerPermissions,
  loadPoliceOfficer,
  getAssignedStolenBike
);

export default router;
