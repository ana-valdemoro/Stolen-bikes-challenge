import { Router } from "express";
import { checkUserIsAuthorized } from "../../../utils/middleware/authorization";
import { createDeparment, listDepartments } from "./department.controller";
import validator from "./department.validator";

const router = Router();
checkUserIsAuthorized;
router.get("/", checkUserIsAuthorized("departments:view"), listDepartments);
router.post(
  "/",
  checkUserIsAuthorized("departments:create"),
  validator.createDeparment,
  createDeparment
);

export default router;
