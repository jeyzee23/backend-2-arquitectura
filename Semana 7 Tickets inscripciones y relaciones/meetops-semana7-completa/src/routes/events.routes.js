import { Router } from "express";
import { EventsController } from "../controllers/events.controller.js";
import { TicketsController } from "../controllers/tickets.controller.js";
import { authenticateJwt, authorizeRoles } from "../middlewares/auth.middleware.js";

const router = Router();
router.get("/", EventsController.list);
router.get("/:id", EventsController.getById);
router.post("/", authenticateJwt, authorizeRoles("admin", "organizer"), EventsController.create);
router.post("/:eid/tickets", authenticateJwt, TicketsController.register);
router.get(
  "/:eid/tickets",
  authenticateJwt,
  authorizeRoles("admin", "organizer"),
  TicketsController.listByEvent,
);
export default router;
