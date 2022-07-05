import { Router } from "express";
import {
  createPoliceOfficer,
  listPoliceOfficers,
} from "./policeOfficer.controller";
import validator from "./policeOfficer.validator";

const router = Router();
router.get("/", listPoliceOfficers);

router.post("/", validator.createPoliceOfficer, createPoliceOfficer);

export default router;
