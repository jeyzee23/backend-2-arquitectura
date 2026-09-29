import express from "express";
import cookieParser from "cookie-parser";
import passport from "passport";
import apiRouter from "./routes/index.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import { initPassport } from "./config/passport.config.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

initPassport();
app.use(passport.initialize());

app.use("/api", apiRouter);

app.use((_request, response) => {
  response.status(404).json({ status: "error", message: "Ruta no encontrada" });
});

app.use(errorMiddleware);
export default app;
