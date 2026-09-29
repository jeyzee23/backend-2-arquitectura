import app from "./app.js";
import { env } from "./config/env.js";
import { connectDB } from "./config/database.js";

const start = async () => {
  await connectDB();
  app.listen(env.port, () => {
    console.log(`MeetOps S7 STARTER on http://localhost:${env.port}`);
    console.log("Los pasos pendientes están en src/services/tickets.service.js");
  });
};

start().catch((error) => {
  console.error("No se pudo iniciar MeetOps:", error);
  process.exit(1);
});
