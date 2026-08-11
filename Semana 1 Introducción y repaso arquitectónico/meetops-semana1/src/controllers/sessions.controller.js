export const SessionsController = {
  async status(_request, response) {
    return response.status(200).json({
      status: "success",
      message: "Recurso sessions preparado. Sin lógica de autenticación en Semana 1.",
    });
  },
};
