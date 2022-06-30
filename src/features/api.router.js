import { Router } from "express";
import userRouter from "./api/users/users.router";
const router = Router();

const baseRoute = "/";
router.use(`${baseRoute}users`, userRouter);

export default router;
