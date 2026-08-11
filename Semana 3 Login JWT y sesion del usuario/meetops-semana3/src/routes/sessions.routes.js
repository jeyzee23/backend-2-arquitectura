import { Router } from "express";
import { SessionsController } from "../controllers/sessions.controller.js";
import { authenticateBearer } from "../middlewares/auth.middleware.js";

const router = Router();
router.post("/register", SessionsController.register);
router.post("/login", SessionsController.login);
router.get("/current", authenticateBearer, SessionsController.current);
export default router;
