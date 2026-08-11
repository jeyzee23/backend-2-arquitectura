import { TicketModel } from "../models/ticket.model.js";

export class TicketDAO {
  create(data) {
    return TicketModel.create(data);
  }

  countByEvent(eventId) {
    return TicketModel.countDocuments({ event: eventId, status: "confirmed" });
  }

  findByEventAndUser(eventId, userId) {
    return TicketModel.findOne({ event: eventId, user: userId }).lean();
  }

  findByUser(userId) {
    return TicketModel.find({ user: userId })
      .populate("event")
      .lean();
  }

  findAll() {
    return TicketModel.find()
      .populate("event")
      .populate("user", "first_name last_name email")
      .lean();
  }
}
