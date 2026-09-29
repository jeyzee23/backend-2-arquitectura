import passport from "passport";
import { HttpError } from "../utils/http-error.js";
import { EventModel } from "../models/event.model.js";

export const authenticateJwt = (request, response, next) => {
  passport.authenticate("jwt", { session: false }, (error, user) => {
    if (error) return next(error);
    if (!user) return next(new HttpError(401, "No autenticado"));
    request.user = user;
    return next();
  })(request, response, next);
};

export const authorizeRoles =
  (...roles) =>
  (request, _response, next) => {
    if (!request.user || !roles.includes(request.user.role)) {
      return next(new HttpError(403, "No autorizado"));
    }
    return next();
  };

export const authorizeEventOwnerOrAdmin = async (request, _response, next) => {
  try {
    // TODO 6 — Dueño o admin.
    // Hoy este middleware deja pasar a cualquiera autenticado con rol organizer/admin.
    // Completalo:
    // 1) const event = await EventModel.findById(request.params.id)
    // 2) 404 si no existe
    // 3) admin puede seguir
    // 4) organizer solo si event.organizer === request.user._id
    // 5) si no, 403
    // 6) request.event = event
    void EventModel;
    return next();
  } catch (error) {
    return next(error);
  }
};
