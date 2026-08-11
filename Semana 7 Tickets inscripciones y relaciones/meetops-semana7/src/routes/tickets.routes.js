import { Router } from "express";
import { TicketsController } from "../controllers/tickets.controller.js";
import { authenticateJwt } from "../middlewares/auth.middleware.js";

const router = Router();
router.post("/events/:eventId", authenticateJwt, TicketsController.register);
router.get("/mine", authenticateJwt, TicketsController.mine);
export default router;
