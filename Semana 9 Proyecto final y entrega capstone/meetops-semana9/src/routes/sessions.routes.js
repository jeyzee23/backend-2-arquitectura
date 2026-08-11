import { Router } from "express";
import { SessionsController } from "../controllers/sessions.controller.js";
import { authenticateJwt } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", SessionsController.register);
router.post("/login", SessionsController.login);
router.get("/current", authenticateJwt, SessionsController.current);
router.post("/logout", authenticateJwt, SessionsController.logout);

export default router;
