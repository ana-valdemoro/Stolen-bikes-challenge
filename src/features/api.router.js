import { Router } from "express";
import userRouter from "./api/users/users.router";
import authRouter from "./api/auth/auth.router";
import stotenBikesRouter from "./api/stolenBike/stolenBike.router";
import departmentRouter from "./api/deparment/department.router";
import policeOfficerRouter from "./api/policeOfficer/policeOfficer.router";
import { authorizeHeader } from "../utils/middleware/jwt";

const router = Router();

const baseRoute = "/";
router.use(`${baseRoute}auth`, authRouter);
router.use(`${baseRoute}users`, authorizeHeader, userRouter);
router.use(`${baseRoute}stolen-bikes`, authorizeHeader, stotenBikesRouter);
router.use(`${baseRoute}departments`, authorizeHeader, departmentRouter);
router.use(`${baseRoute}polices-officer`, authorizeHeader, policeOfficerRouter);

export default router;
