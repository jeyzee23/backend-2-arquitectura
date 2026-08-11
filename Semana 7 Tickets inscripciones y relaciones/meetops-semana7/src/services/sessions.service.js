import { UserModel } from "../models/user.model.js";
import { createHash, isValidPassword } from "../utils/hash.js";
import { sanitizeUser } from "../utils/sanitize-user.js";
import { generateToken } from "../utils/jwt.js";
import { HttpError } from "../utils/http-error.js";

export class SessionsService {
  async register({ first_name, last_name, email, password, role }) {
    if (!first_name || !last_name || !email || !password) {
      throw new HttpError(400, "Faltan campos obligatorios");
    }
    const existing = await UserModel.findOne({ email: email.toLowerCase() });
    if (existing) throw new HttpError(409, "El email ya está registrado");
    const user = await UserModel.create({
      first_name,
      last_name,
      email,
      password: createHash(password),
      role: role || "user",
    });
    return sanitizeUser(user);
  }

  async login({ email, password }) {
    if (!email || !password) {
      throw new HttpError(400, "Email y password son obligatorios");
    }
    const user = await UserModel.findOne({ email: email.toLowerCase() });
    if (!user || !isValidPassword(password, user.password)) {
      throw new HttpError(401, "Credenciales inválidas");
    }
    const token = generateToken({
      id: user._id.toString(),
      email: user.email,
      role: user.role,
    });
    return { token, user: sanitizeUser(user) };
  }

  async current(userId) {
    const user = await UserModel.findById(userId);
    if (!user) throw new HttpError(404, "Usuario no encontrado");
    return sanitizeUser(user);
  }
}
