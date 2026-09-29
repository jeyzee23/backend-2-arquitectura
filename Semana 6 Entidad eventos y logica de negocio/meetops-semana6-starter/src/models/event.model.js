import mongoose from "mongoose";

// TODO 1 — Revisar este schema.
// El modelo define la FORMA del dato. Las reglas (fecha futura, no editar cancelados)
// van en el service, no acá.
const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    // En un proyecto más grande esto sería ObjectId ref: "Category".
    // Hoy usamos String para filtrar sin armar otra colección.
    category: { type: String, required: true, trim: true },
    date: { type: Date, required: true },
    location: { type: String, required: true, trim: true },
    capacity: { type: Number, required: true, min: 1 },
    price: { type: Number, default: 0, min: 0 },
    status: {
      type: String,
      enum: ["draft", "published", "cancelled", "finished"],
      default: "draft",
    },
    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true, versionKey: false },
);

export const EventModel = mongoose.model("Event", eventSchema);
