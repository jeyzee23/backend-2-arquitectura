import express from "express";
import apiRouter from "./routes/index.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRouter);

// fail fast
function failFast(par1, par2, par3) {
  const requiredParams = [par1, par2, par3];
  if(requiredParams.some(param => param === undefined)) {
    throw new Error("Parámetros requeridos");
  }

  // operacion pesada
  FileSystem.writeFileSync("output.txt", "Hello, world!");
}

app.use((_request, response) => {
  response.status(404).json({
    status: "error",
    message: "Ruta no encontrada",
  });
});

app.use(errorMiddleware);

export default app;
