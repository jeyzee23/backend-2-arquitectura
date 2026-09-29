import mongoose from "mongoose";
import crypto from "crypto";

const ticketSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    status: {
      type: String,
      enum: ["confirmed", "pending", "cancelled"],
      default: "confirmed",
    },
    quantity: { type: Number, default: 1, min: 1 },
    reservationCode: { type: String, required: true },
    cancelledAt: { type: Date, default: null },
  },
  { timestamps: true, versionKey: false },
);

ticketSchema.index(
  { event: 1, user: 1 },
  {
    unique: true,
    partialFilterExpression: { status: { $in: ["confirmed", "pending"] } },
  },
);

export const TicketModel = mongoose.model("Ticket", ticketSchema);

export const createReservationCode = () =>
  `TCK-${crypto.randomBytes(3).toString("hex").toUpperCase()}`;
