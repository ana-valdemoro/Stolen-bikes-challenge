import { Router } from "express";
import { listUsers } from "./users.controller";

const router = Router();

router.get("/", listUsers);

export default router;
