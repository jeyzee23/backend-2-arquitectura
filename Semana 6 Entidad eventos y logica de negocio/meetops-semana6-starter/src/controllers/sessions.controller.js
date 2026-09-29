import { SessionsService } from "../services/sessions.service.js";
import { env } from "../config/env.js";

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

  async login(request, response, next) {
    try {
      const { token, user } = await sessionsService.login(request.body);
      response.cookie(env.cookieName, token, { httpOnly: true, sameSite: "lax" });
      return response.status(200).json({ status: "success", token, user });
    } catch (error) {
      return next(error);
    }
  },

  async current(request, response, next) {
    try {
      const user = await sessionsService.current(request.user._id);
      return response.status(200).json({ status: "success", user });
    } catch (error) {
      return next(error);
    }
  },

  async logout(_request, response) {
    response.clearCookie(env.cookieName);
    return response.status(200).json({ status: "success", message: "Sesión cerrada" });
  },
};
