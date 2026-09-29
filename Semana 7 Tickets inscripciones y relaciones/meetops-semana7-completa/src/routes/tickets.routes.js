import { Router } from "express";
import { TicketsController } from "../controllers/tickets.controller.js";
import { authenticateJwt } from "../middlewares/auth.middleware.js";

const router = Router();
router.get("/my-tickets", authenticateJwt, TicketsController.mine);
router.patch("/:tid/cancel", authenticateJwt, TicketsController.cancel);
export default router;
