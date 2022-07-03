import { Router } from "express";
import { login } from "./auth.controller";
import validator from "../users/users.validator";

const router = Router();

router.post("/login", validator.login, login);

export default router;
