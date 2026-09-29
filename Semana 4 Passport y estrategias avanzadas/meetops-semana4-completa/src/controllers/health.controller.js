import { env } from "../config/env.js";

export const HealthController = {
  check(_request, response) {
    return response.status(200).json({
      status: "ok",
      service: "meetops-api",
      module: "semana-4-passport",
      environment: env.nodeEnv,
    });
  },
};
