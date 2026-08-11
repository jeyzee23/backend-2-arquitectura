import { env } from "../config/env.js";

export const errorMiddleware = (error, _request, response, _next) => {
  console.error("[MeetOps]", error);

  const statusCode = error.statusCode || 500;
  const isTodo = String(error.message || "").startsWith("TODO");
  const message =
    statusCode === 500 && env.nodeEnv === "production" && !isTodo
      ? "Error interno del servidor"
      : error.message || "Error en la solicitud";

  return response.status(statusCode).json({
    status: "error",
    message,
  });
};
