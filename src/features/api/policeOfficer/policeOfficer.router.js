import { Router } from "express";
import {
  createPoliceOfficer,
  listPoliceOfficers,
  getPoliceOfficer,
} from "./policeOfficer.controller";
import validator from "./policeOfficer.validator";
import { checkIfDepartmentExist } from "./policeOfficer.middleware";
import {
  hasDirectorPermissions,
  hasPermissions,
} from "../../../utils/middleware/authorization";

const router = Router();
router.get("/", hasPermissions, listPoliceOfficers);

router.get("/:policeOfficerId", hasPermissions, getPoliceOfficer);

router.post(
  "/",
  hasDirectorPermissions,
  validator.createPoliceOfficer,
  checkIfDepartmentExist,
  createPoliceOfficer
);

export default router;
