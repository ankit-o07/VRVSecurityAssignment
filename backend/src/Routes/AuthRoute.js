import express from "express";
import { register, login, logout } from "../Controllers/AuthController.js";
import { validateRegister, loginValidation } from "../Middlewares/validationMiddleware.js";

const router = express.Router();

// User registration route
router.post("/register", validateRegister, register);

// User login route
router.post("/login", loginValidation, login);

// User logout route
router.get("/logout", logout);

export { router as AuthRoutes };
