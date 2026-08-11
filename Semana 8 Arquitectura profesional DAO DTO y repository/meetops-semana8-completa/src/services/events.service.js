import { EventRepository } from "../repositories/event.repository.js";
import { EventDTO } from "../dto/event.dto.js";
import { HttpError } from "../utils/http-error.js";

export class EventsService {
  constructor(eventRepository = new EventRepository()) {
    this.eventRepository = eventRepository;
  }

  async list() {
    const events = await this.eventRepository.list({ status: "published" });
    return EventDTO.many(events);
  }

  async getById(id) {
    const event = await this.eventRepository.getById(id);
    if (!event) {
      throw new HttpError(404, "Evento no encontrado");
    }
    return EventDTO.from(event);
  }

  async create(payload, organizerId) {
    const { title, description, starts_at, capacity } = payload;
    if (!title || !starts_at || !capacity) {
      throw new HttpError(400, "title, starts_at y capacity son obligatorios");
    }

    const event = await this.eventRepository.create({
      title,
      description: description || "",
      starts_at,
      capacity: Number(capacity),
      organizer: organizerId,
      status: "published",
    });

    return EventDTO.from(event);
  }
}
