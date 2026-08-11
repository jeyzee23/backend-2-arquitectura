import app from "./app.js";
import { env } from "./config/env.js";
import { connectDB } from "./config/database.js";

const start = async () => {
  await connectDB();
  app.listen(env.port, () => {
    console.log(`MeetOps S4 listening on http://localhost:${env.port}`);
    console.log("Auth: Passport JWT (Bearer + cookie opcional)");
  });
};

start().catch((error) => {
  console.error("No se pudo iniciar MeetOps:", error);
  process.exit(1);
});
