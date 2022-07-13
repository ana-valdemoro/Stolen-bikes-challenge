import { Router } from "express";
import {
  hasDirectorPermissions,
  hasPermissions,
  hasPoliceOfficerPermissions,
} from "../../../utils/middleware/authorization";
import { createDeparment, listDepartments } from "./department.controller";
import { loadDirectorDepartment } from "./department.middleware";
import validator from "./department.validator";

const router = Router();

router.get("/", hasPermissions, listDepartments);
router.post(
  "/",
  hasDirectorPermissions,
  validator.createDeparment,
  loadDirectorDepartment,
  createDeparment
);

export default router;
