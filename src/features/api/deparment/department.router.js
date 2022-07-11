import { Router } from "express";
import {
  hasDirectorPermissions,
  hasPoliceOfficerPermissions,
} from "../../../utils/middleware/authorization";
import { createDeparment, listDepartments } from "./department.controller";
import { loadDirectorDepartment } from "./department.middleware";
import validator from "./department.validator";

const router = Router();

router.get("/", hasPoliceOfficerPermissions, listDepartments);
router.post(
  "/",
  hasDirectorPermissions,
  loadDirectorDepartment,
  validator.createDeparment,
  createDeparment
);

export default router;
