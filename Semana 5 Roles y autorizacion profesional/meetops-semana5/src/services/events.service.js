import { EventModel } from "../models/event.model.js";
import { HttpError } from "../utils/http-error.js";

export class EventsService {
  async list() {
    return EventModel.find({ status: "published" }).sort({ starts_at: 1 }).lean();
  }

  async create(payload, organizerId) {
    const { title, description, starts_at, capacity } = payload;
    if (!title || !starts_at || !capacity) {
      throw new HttpError(400, "title, starts_at y capacity son obligatorios");
    }
    return EventModel.create({
      title,
      description: description || "",
      starts_at,
      capacity: Number(capacity),
      organizer: organizerId,
      status: "published",
    });
  }
}
