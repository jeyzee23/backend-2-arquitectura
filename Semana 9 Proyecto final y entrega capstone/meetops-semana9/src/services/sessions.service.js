import { UserRepository } from "../repositories/user.repository.js";
import { UserDTO } from "../dto/user.dto.js";
import { createHash, isValidPassword } from "../utils/hash.js";
import { generateToken } from "../utils/jwt.js";
import { HttpError } from "../utils/http-error.js";

export class SessionsService {
  constructor(userRepository = new UserRepository()) {
    this.userRepository = userRepository;
  }

  async register({ first_name, last_name, email, password, role }) {
    if (!first_name || !last_name || !email || !password) {
      throw new HttpError(400, "Faltan campos obligatorios");
    }

    const existing = await this.userRepository.getByEmail(email);
    if (existing) {
      throw new HttpError(409, "El email ya está registrado");
    }

    const user = await this.userRepository.create({
      first_name,
      last_name,
      email,
      password: createHash(password),
      role: role || "user",
    });

    return UserDTO.from(user);
  }

  async login({ email, password }) {
    if (!email || !password) {
      throw new HttpError(400, "Email y password son obligatorios");
    }

    const user = await this.userRepository.getByEmail(email);
    if (!user || !isValidPassword(password, user.password)) {
      throw new HttpError(401, "Credenciales inválidas");
    }

    const token = generateToken({
      id: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    return { token, user: UserDTO.from(user) };
  }

  async current(userId) {
    const user = await this.userRepository.getById(userId);
    if (!user) {
      throw new HttpError(404, "Usuario no encontrado");
    }
    return UserDTO.from(user);
  }
}
