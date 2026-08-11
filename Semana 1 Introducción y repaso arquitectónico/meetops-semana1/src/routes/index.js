import { Router } from "express";
import healthRouter from "./health.routes.js";
import eventsRouter from "./events.routes.js";
import sessionsRouter from "./sessions.routes.js";
import { errorMiddleware } from "../middlewares/error.middleware.js";

const router = Router();

router.use("/health" ,healthRouter);
router.use("/events", eventsRouter);
router.use("/sessions",sessionsRouter);

export default router;
