import { Router } from "express";
import healthRouter from "./health.routes.js";
import sessionsRouter from "./sessions.routes.js";
import eventsRouter from "./events.routes.js";

const router = Router();
router.use("/health", healthRouter);
router.use("/sessions", sessionsRouter);
router.use("/events", eventsRouter);
export default router;
