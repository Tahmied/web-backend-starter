import express from "express";
import { validate } from "../../middlewares/validate.middleware.js";
import { login, register } from "./auth.controller.js";
import { loginValidator, registerValidator } from "./auth.validator.js";

const router = express.Router();

router.post("/register", registerValidator, validate, register);
router.post("/login", loginValidator, validate, login);

export default router;