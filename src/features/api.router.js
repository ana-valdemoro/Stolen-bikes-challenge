import { Router } from "express";
import userRouter from "./api/users/users.router";
import authRouter from "./api/auth/auth.router";
import stotenBikesRouter from "./api/stolenBike/stolenBike.router";
const router = Router();

const baseRoute = "/";
router.use(`${baseRoute}auth`, authRouter);
router.use(`${baseRoute}users`, userRouter);
router.use(`${baseRoute}stolen-bikes`, stotenBikesRouter);

export default router;
