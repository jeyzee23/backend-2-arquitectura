import { verifyToken } from "../utils/jwt.js";
import { UserModel } from "../models/user.model.js";
import { HttpError } from "../utils/http-error.js";

export const authenticateBearer = async (request, _response, next) => {
  try {
    const header = request.headers.authorization || "";
    const [scheme, token] = header.split(" ");
    if (scheme !== "Bearer" || !token) {
      return next(new HttpError(401, "No autenticado"));
    }
    const payload = verifyToken(token);
    const user = await UserModel.findById(payload.id);
    if (!user) {
      return next(new HttpError(401, "No autenticado"));
    }
    request.user = user;
    return next();
  } catch (_error) {
    return next(new HttpError(401, "Token inválido"));
  }
};
