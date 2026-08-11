import { TicketRepository } from "../repositories/ticket.repository.js";
import { EventRepository } from "../repositories/event.repository.js";
import { TicketDTO } from "../dto/ticket.dto.js";
import { HttpError } from "../utils/http-error.js";

export class TicketsService {
  constructor(
    ticketRepository = new TicketRepository(),
    eventRepository = new EventRepository(),
  ) {
    this.ticketRepository = ticketRepository;
    this.eventRepository = eventRepository;
  }

  async register(eventId, userId) {
    const event = await this.eventRepository.getById(eventId);
    if (!event || event.status !== "published") {
      throw new HttpError(404, "Evento no disponible");
    }

    const existing = await this.ticketRepository.getByEventAndUser(
      eventId,
      userId,
    );
    if (existing) {
      throw new HttpError(409, "Ya estás inscripto en este evento");
    }

    const confirmed = await this.ticketRepository.countConfirmed(eventId);
    if (confirmed >= event.capacity) {
      throw new HttpError(409, "Evento sin cupos");
    }

    const ticket = await this.ticketRepository.create({
      event: eventId,
      user: userId,
      status: "confirmed",
    });

    return TicketDTO.from(ticket);
  }

  async mine(userId) {
    const tickets = await this.ticketRepository.listByUser(userId);
    return TicketDTO.many(tickets);
  }
}
