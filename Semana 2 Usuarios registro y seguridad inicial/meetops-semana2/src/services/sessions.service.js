import { UserModel } from "../models/user.model.js";
import { createHash } from "../utils/hash.js";
import { sanitizeUser } from "../utils/sanitize-user.js";
import { HttpError } from "../utils/http-error.js";

export class SessionsService {
  async register({ first_name, last_name, email, password, role }) {
    if (!first_name || !last_name || !email || !password) {
      throw new HttpError(400, "Faltan campos obligatorios");
    }

    const existing = await UserModel.findOne({ email: email.toLowerCase() });
    if (existing) {
      throw new HttpError(409, "El email ya está registrado");
    }

    const user = await UserModel.create({
      first_name,
      last_name,
      email,
      password: createHash(password),
      role: role || "user",
    });

    return sanitizeUser(user);
  }
}
