import { Router } from "express";
import { saveContent } from "../controllers/content.controller.js";

const router = Router();

router.route("/create").post(saveContent);

export default router;
