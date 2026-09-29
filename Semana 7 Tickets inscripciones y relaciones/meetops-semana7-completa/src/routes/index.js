import { Router } from "express";
import healthRouter from "./health.routes.js";
import sessionsRouter from "./sessions.routes.js";
import eventsRouter from "./events.routes.js";
import ticketsRouter from "./tickets.routes.js";

const router = Router();
router.use("/health", healthRouter);
router.use("/sessions", sessionsRouter);
router.use("/events", eventsRouter);
router.use("/tickets", ticketsRouter);
export default router;
