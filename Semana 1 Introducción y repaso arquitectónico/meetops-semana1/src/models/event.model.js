import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true, // -> title: "  title  " -> despues de trim: "title"
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    starts_at: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const EventModel = mongoose.model("Event", eventSchema);
