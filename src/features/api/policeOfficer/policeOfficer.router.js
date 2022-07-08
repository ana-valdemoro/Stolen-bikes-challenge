import { Router } from "express";
import {
  createPoliceOfficer,
  listPoliceOfficers,
} from "./policeOfficer.controller";
import validator from "./policeOfficer.validator";
import { checkIfDepartmentExist } from "./policeOfficer.middleware";
import { checkUserIsAuthorized } from "../../../utils/middleware/authorization";
const router = Router();
router.get(
  "/",
  checkUserIsAuthorized("polices-officer:view"),
  listPoliceOfficers
);

router.post(
  "/",
  checkUserIsAuthorized("polices-officer:create"),
  validator.createPoliceOfficer,
  checkIfDepartmentExist,
  createPoliceOfficer
);

export default router;
