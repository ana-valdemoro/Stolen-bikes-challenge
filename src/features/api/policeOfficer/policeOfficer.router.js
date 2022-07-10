import { Router } from "express";
import {
  createPoliceOfficer,
  listPoliceOfficers,
} from "./policeOfficer.controller";
import validator from "./policeOfficer.validator";
import { checkIfDepartmentExist } from "./policeOfficer.middleware";
import { hasPoliceOfficerPermissions } from "../../../utils/middleware/authorization";

const router = Router();
router.get("/", hasPoliceOfficerPermissions, listPoliceOfficers);

router.post(
  "/",
  hasPoliceOfficerPermissions,
  validator.createPoliceOfficer,
  checkIfDepartmentExist,
  createPoliceOfficer
);

export default router;
