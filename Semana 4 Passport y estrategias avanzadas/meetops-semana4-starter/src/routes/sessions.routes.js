import { Router } from "express";
import { SessionsController } from "../controllers/sessions.controller.js";
import {
  authenticateJwt,
  authenticateCurrent,
  authenticateRegister,
} from "../middlewares/auth.middleware.js";

const router = Router();
router.post("/register", authenticateRegister, SessionsController.register);
router.post("/login", SessionsController.login);
router.get("/current", authenticateCurrent, SessionsController.current);
router.post("/logout", authenticateJwt, SessionsController.logout);

export default router;
