import dotenv from "dotenv";

dotenv.config();

const required = ["PORT", "NODE_ENV", "MONGO_URL", "JWT_SECRET"];

for (const key of required) {
  if (!process.env[key]) {
    throw new Error(`Falta la variable de entorno obligatoria: ${key}`);
  }
}

export const env = {
  port: Number(process.env.PORT),
  nodeEnv: process.env.NODE_ENV,
  mongoUrl: process.env.MONGO_URL,
  jwtSecret: process.env.JWT_SECRET,
  cookieName: process.env.COOKIE_NAME || "meetopsToken",
  mailHost: process.env.MAIL_HOST || "",
  mailPort: Number(process.env.MAIL_PORT || 587),
  mailUser: process.env.MAIL_USER || "",
  mailPass: process.env.MAIL_PASS || "",
  mailFrom: process.env.MAIL_FROM || "MeetOps <noreply@meetops.test>",
};
