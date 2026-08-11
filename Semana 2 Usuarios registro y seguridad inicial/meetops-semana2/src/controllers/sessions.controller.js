import { SessionsService } from "../services/sessions.service.js";

const sessionsService = new SessionsService();

export const SessionsController = {
  async register(request, response, next) {
    try {
      const user = await sessionsService.register(request.body);
      return response.status(201).json({ status: "success", user });
    } catch (error) {
      return next(error);
    }
  },
};
