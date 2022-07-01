import { Router } from "express";
import { createStolenBike } from "./stolenBike.controller";
import validator from "./stolenBike.validator";

const router = Router();

router.post("/", validator.createStolenBike, createStolenBike);

export default router;
