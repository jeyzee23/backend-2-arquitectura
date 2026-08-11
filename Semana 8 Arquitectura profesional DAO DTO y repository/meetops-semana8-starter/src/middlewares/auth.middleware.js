import passport from "passport";
import { HttpError } from "../utils/http-error.js";

export const authenticateJwt = (request, response, next) => {
  passport.authenticate("jwt", { session: false }, (error, user) => {
    if (error) {
      return next(error);
    }
    if (!user) {
      return next(new HttpError(401, "No autenticado"));
    }
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
