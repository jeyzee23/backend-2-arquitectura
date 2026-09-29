import nodemailer from "nodemailer";
import { env } from "../config/env.js";

export const sendMail = async ({ to, subject, text }) => {
  if (!env.mailHost || !env.mailPass) {
    console.log(`[mail simulado] para=${to}`);
    console.log(`asunto: ${subject}`);
    console.log(text);
    return { simulated: true };
  }

  const transport = nodemailer.createTransport({
    host: env.mailHost,
    port: env.mailPort,
    secure: env.mailPort === 465,
    auth: env.mailUser ? { user: env.mailUser, pass: env.mailPass } : undefined,
  });

  return transport.sendMail({
    from: env.mailFrom,
    to,
    subject,
    text,
  });
};
