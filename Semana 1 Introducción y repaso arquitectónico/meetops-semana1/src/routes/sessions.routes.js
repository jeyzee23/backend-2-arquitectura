import { Router } from "express";
import { SessionsController } from "../controllers/sessions.controller.js";

const router = Router();

// RUTAS PUBLICAS
router.get("/", SessionsController.status);
router.post("/", SessionsController.create);


// RUTAS PRIVADAS
router.get("/", sessionMiddleware, SessionsController.status);
router.delete("/", sessionMiddleware, SessionsController.delete);

export default router;
