export const errorMiddleware = (error, _request, response, _next) => {
  console.error("[MeetOps]", error);

  const statusCode = error.statusCode || 500;
  const message =
    statusCode === 500
      ? "Error interno del servidor"
      : error.message || "Error en la solicitud";

  return response.status(statusCode).json({
    status: "error",
    message,
  });
};
