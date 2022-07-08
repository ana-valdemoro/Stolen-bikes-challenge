import { Router } from "express";
import {
  createPoliceOfficer,
  listPoliceOfficers,
} from "./policeOfficer.controller";
import validator from "./policeOfficer.validator";
import { checkIfDepartmentExist } from "./policeOfficer.middleware";

const router = Router();
router.get("/", listPoliceOfficers);

router.post(
  "/",
  validator.createPoliceOfficer,
  checkIfDepartmentExist,
  createPoliceOfficer
);

export default router;
