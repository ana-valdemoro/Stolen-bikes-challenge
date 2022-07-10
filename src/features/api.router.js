import { Router } from "express";
import userRouter from "./api/users/users.router";
import authRouter from "./api/auth/auth.router";
import stolenBikesRouter from "./api/stolenBike/stolenBike.router";
import departmentRouter from "./api/deparment/department.router";
import policeOfficerRouter from "./api/policeOfficer/policeOfficer.router";
import { authorizeHeader } from "../utils/middleware/jwt";
import { hasDirectorPermissions } from "../utils/middleware/authorization";

const router = Router();

const baseRoute = "/";
router.use(`${baseRoute}auth`, authRouter);
router.use(
  `${baseRoute}users`,
  authorizeHeader,
  hasDirectorPermissions,
  userRouter
);
router.use(`${baseRoute}stolen-bikes`, authorizeHeader, stolenBikesRouter);
router.use(`${baseRoute}departments`, authorizeHeader, departmentRouter);
router.use(`${baseRoute}police-officers`, authorizeHeader, policeOfficerRouter);

export default router;
