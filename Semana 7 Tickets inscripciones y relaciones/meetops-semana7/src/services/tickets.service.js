import { TicketModel } from "../models/ticket.model.js";
import { EventModel } from "../models/event.model.js";
import { HttpError } from "../utils/http-error.js";

export class TicketsService {
  async register(eventId, userId) {
    const event = await EventModel.findById(eventId);
    if (!event || event.status !== "published") {
      throw new HttpError(404, "Evento no disponible");
    }

    const existing = await TicketModel.findOne({ event: eventId, user: userId });
    if (existing) {
      throw new HttpError(409, "Ya estás inscripto en este evento");
    }

    const confirmed = await TicketModel.countDocuments({
      event: eventId,
      status: "confirmed",
    });
    if (confirmed >= event.capacity) {
      throw new HttpError(409, "Evento sin cupos");
    }

    return TicketModel.create({ event: eventId, user: userId, status: "confirmed" });
  }

  async mine(userId) {
    return TicketModel.find({ user: userId })
      .populate("event", "title starts_at capacity status")
      .sort({ createdAt: -1 })
      .lean();
  }
}
