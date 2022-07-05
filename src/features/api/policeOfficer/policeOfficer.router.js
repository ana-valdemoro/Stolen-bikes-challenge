import { Router } from "express";
import { createPoliceOfficer } from "./policeOfficer.controller";
import validator from "./policeOfficer.validator";

const router = Router();

router.post("/", validator.createPoliceOfficer, createPoliceOfficer);

export default router;
