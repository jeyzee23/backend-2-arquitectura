import { EventModel } from "../models/event.model.js";
import { HttpError } from "../utils/http-error.js";

export class EventsService {
  async list() {
    return EventModel.find({ status: "published" })
      .populate("organizer", "first_name last_name email role")
      .sort({ starts_at: 1 })
      .lean();
  }

  async getById(id) {
    const event = await EventModel.findById(id)
      .populate("organizer", "first_name last_name email role")
      .lean();
    if (!event) throw new HttpError(404, "Evento no encontrado");
    return event;
  }

  async create(payload, organizerId) {
    const { title, description, starts_at, capacity, location } = payload;
    if (!title || !starts_at || capacity === undefined || capacity === null || capacity === "") {
      throw new HttpError(400, "title, starts_at y capacity son obligatorios");
    }

    const eventDate = new Date(starts_at);
    if (Number.isNaN(eventDate.getTime()) || eventDate <= new Date()) {
      throw new HttpError(400, "La fecha del evento debe ser futura");
    }

    const seats = Number(capacity);
    if (!Number.isFinite(seats) || seats <= 0) {
      throw new HttpError(400, "La capacidad debe ser mayor a cero");
    }

    const event = await EventModel.create({
      title,
      description: description || "",
      starts_at: eventDate,
      location: location || "",
      capacity: seats,
      organizer: organizerId,
      status: "published",
    });
    return event.toObject();
  }
}
