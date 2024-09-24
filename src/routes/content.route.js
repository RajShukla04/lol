import { Router } from "express";
import { saveContent, showContent } from "../controllers/content.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";
const router = Router();
router.use(verifyJwt);
router.route("/").post(showContent);
router.route("/create").post(saveContent);

export default router;
