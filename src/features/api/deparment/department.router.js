import { Router } from "express";
import {
  hasDirectorPermissions,
  hasPermissions,
} from "../../../utils/middleware/authorization";
import { validatePaginationParams } from "../../../utils/pagination";
import { createDeparment, listDepartments } from "./department.controller";
import { loadDirectorDepartment } from "./department.middleware";
import validator from "./department.validator";

const router = Router();

router.get("/", hasPermissions, validatePaginationParams, listDepartments);

router.post(
  "/",
  hasDirectorPermissions,
  validator.createDeparment,
  loadDirectorDepartment,
  createDeparment
);

export default router;
