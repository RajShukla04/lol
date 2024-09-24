import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { registerUser, loginUser } from "../controllers/user.controller.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

export default router;
