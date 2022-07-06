import { Router } from "express";
import { createDeparment, listDepartments } from "./department.controller";
import validator from "./department.validator";

const router = Router();

router.get("/", listDepartments);
router.post("/", validator.createDeparment, createDeparment);

export default router;
