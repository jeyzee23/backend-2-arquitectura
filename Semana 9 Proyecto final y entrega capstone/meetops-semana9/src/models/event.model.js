import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true, default: "" },
    starts_at: { type: Date, required: true },
    capacity: { type: Number, required: true, min: 1 },
    status: {
      type: String,
      enum: ["draft", "published", "cancelled"],
      default: "published",
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
