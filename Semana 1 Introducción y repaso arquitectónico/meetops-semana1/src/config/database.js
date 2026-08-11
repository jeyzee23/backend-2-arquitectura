// // conexion a la base de datos
// import mongoose from "mongoose";
// import { env } from "./env.js";

// export const connectDB = async () => {
//   mongoose.set("strictQuery", true);
//   await mongoose.connect(env.mongoUrl);
//   return mongoose.connection;
// };