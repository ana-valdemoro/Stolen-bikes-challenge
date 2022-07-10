import { Router } from "express";
import {
  hasDirectorPermissions,
  hasPoliceOfficerPermissions,
} from "../../../utils/middleware/authorization";
import { createDeparment, listDepartments } from "./department.controller";
import validator from "./department.validator";

const router = Router();

router.get("/", hasPoliceOfficerPermissions, listDepartments);
router.post(
  "/",
  hasDirectorPermissions,
  validator.createDeparment,
  createDeparment
);

export default router;
