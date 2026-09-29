import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

/** Sigue usándose en login (SessionsService). La verificación pasa a Passport. */
export const generateToken = (payload) =>
  jwt.sign(payload, env.jwtSecret, { expiresIn: "1h" });

/** Queda de Semana 3: ya no lo usa el middleware de auth. */
export const verifyToken = (token) => jwt.verify(token, env.jwtSecret);
