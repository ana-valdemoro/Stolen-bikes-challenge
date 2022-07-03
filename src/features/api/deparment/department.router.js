import { Router } from "express";
import { createDeparment } from "./department.controller";
import validator from "./department.validator";

const router = Router();

router.post("/", validator.createDeparment, createDeparment);

export default router;
