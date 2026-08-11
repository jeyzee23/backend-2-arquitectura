import { Router } from "express";
import healthRouter from "./health.routes.js";
import sessionsRouter from "./sessions.routes.js";

const router = Router();
router.use("/health", healthRouter);
router.use("/sessions", sessionsRouter);
export default router;
