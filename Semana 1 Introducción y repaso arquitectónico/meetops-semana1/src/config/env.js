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
};
