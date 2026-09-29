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
    const event = await EventModel.findById(request.params.id);
    if (!event) return next(new HttpError(404, "Evento no encontrado"));

    const isAdmin = request.user.role === "admin";
    const isOwner = event.organizer.toString() === request.user._id.toString();
    if (!isAdmin && !isOwner) {
      return next(new HttpError(403, "No tenés permisos para modificar este evento"));
    }

    request.event = event;
    return next();
  } catch (error) {
    return next(error);
  }
};
