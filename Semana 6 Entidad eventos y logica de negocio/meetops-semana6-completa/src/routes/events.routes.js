import { Router } from "express";
import { EventsController } from "../controllers/events.controller.js";
import {
  authenticateJwt,
  authorizeRoles,
  authorizeEventOwnerOrAdmin,
} from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", EventsController.list);
router.get("/:id", EventsController.getById);
router.post("/", authenticateJwt, authorizeRoles("admin", "organizer"), EventsController.create);
router.put(
  "/:id",
  authenticateJwt,
  authorizeRoles("admin", "organizer"),
  authorizeEventOwnerOrAdmin,
  EventsController.update,
);
router.patch(
  "/:id/status",
  authenticateJwt,
  authorizeRoles("admin", "organizer"),
  authorizeEventOwnerOrAdmin,
  EventsController.changeStatus,
);

export default router;
