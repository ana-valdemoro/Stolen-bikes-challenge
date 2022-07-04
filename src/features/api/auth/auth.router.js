import { Router } from "express";
import { login, register } from "./auth.controller";
import validator from "../users/users.validator";

const router = Router();

router.post("/login", validator.login, login);

router.post("/register", validator.createUser, register);

export default router;
