import { env } from "../config/env.js";

export const HealthController = {
  check(_request, response) {
    return response.status(200).json({
      status: "ok",
      service: "meetops-api",
      module: "semana-8-dao-dto-repository",
      environment: env.nodeEnv,
    });
  },
};
