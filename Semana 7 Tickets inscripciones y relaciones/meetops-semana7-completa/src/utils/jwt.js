import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export const generateToken = (payload) =>
  jwt.sign(payload, env.jwtSecret, { expiresIn: "1h" });

export const verifyToken = (token) => jwt.verify(token, env.jwtSecret);
