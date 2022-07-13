import { Router } from "express";
import {
  createPoliceOfficer,
  listPoliceOfficers,
  getPoliceOfficer,
  deletePoliceOfficer,
} from "./policeOfficer.controller";
import validator from "./policeOfficer.validator";
import {
  checkIfDepartmentExist,
  loadPoliceOfficer,
} from "./policeOfficer.middleware";
import {
  hasDirectorPermissions,
  hasPermissions,
} from "../../../utils/middleware/authorization";
import { validatePaginationParams } from "../../../utils/pagination";

const router = Router();
router.get("/", hasPermissions, validatePaginationParams, listPoliceOfficers);

router.get("/:policeOfficerId", hasPermissions, getPoliceOfficer);
router.post(
  "/",
  hasDirectorPermissions,
  validator.createPoliceOfficer,
  checkIfDepartmentExist,
  createPoliceOfficer
);

router.delete(
  "/:policeOfficerId",
  hasDirectorPermissions,
  loadPoliceOfficer,
  deletePoliceOfficer
);

export default router;
