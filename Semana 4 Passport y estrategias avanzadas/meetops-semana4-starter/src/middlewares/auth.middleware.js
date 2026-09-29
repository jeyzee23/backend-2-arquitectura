import passport from "passport";
import { HttpError } from "../utils/http-error.js";

export const authenticateJwt = (request, response, next) => {
  passport.authenticate("jwt", { session: false }, (error, user) => {
    if (error) {
      return next(error);
    }
    if (!user) {
      return next(new HttpError(401, "Unauthorized"));
    }
    request.user = user;
    return next();
  })(request, response, next);
};

export const authenticateCurrent = (request, response, next) => {
  passport.authenticate("current", { session: false }, (error, user) => {
    if (error) {
      return next(error);
    }
    if (!user) {
      return next(new HttpError(401, "Unauthorized"));
    }
    request.user = user;
    return next();
  })(request, response, next);
};

export const authenticateRegister = (request, response, next) => {
  passport.authenticate("register", { session: false }, (error, user, info) => {
    if (error) {
      return next(error);
    }
    if (!user) {
      const message = info?.message || "No se pudo registrar";
      const statusCode = message.includes("ya está registrado") ? 409 : 400;
      return next(new HttpError(statusCode, message));
    }
    request.user = user;
    return next();
  })(request, response, next);
};
