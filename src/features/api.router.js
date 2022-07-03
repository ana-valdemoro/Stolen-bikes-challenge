import { Router } from "express";
import userRouter from "./api/users/users.router";
import stotenBikesRouter from "./api/stolenBike/stolenBike.router";
import departmentRouter from "./api/deparment/department.router";

const router = Router();

const baseRoute = "/";
router.use(`${baseRoute}users`, userRouter);
router.use(`${baseRoute}stolen-bikes`, stotenBikesRouter);
router.use(`${baseRoute}departments`, departmentRouter);

export default router;
