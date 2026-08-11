import { Router } from "express";
import { EventsController } from "../controllers/events.controller.js";
import { authenticateJwt, authorizeRoles } from "../middlewares/auth.middleware.js";

const router = Router();
router.get("/", EventsController.list);
router.post("/", authenticateJwt, authorizeRoles("admin", "organizer"), EventsController.create);
export default router;
