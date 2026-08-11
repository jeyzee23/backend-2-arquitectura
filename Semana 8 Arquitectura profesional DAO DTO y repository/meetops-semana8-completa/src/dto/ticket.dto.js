import { EventDTO } from "./event.dto.js";
import { UserDTO } from "./user.dto.js";

/** DTO de salida HTTP — forma segura del ticket. */
export class TicketDTO {
  constructor(ticket) {
    this.id = ticket._id?.toString?.() || ticket.id;
    this.status = ticket.status;
    this.event =
      ticket.event && typeof ticket.event === "object"
        ? EventDTO.from(ticket.event)
        : ticket.event?.toString?.() || ticket.event;
    this.user =
      ticket.user && typeof ticket.user === "object"
        ? UserDTO.from(ticket.user)
        : ticket.user?.toString?.() || ticket.user;
  }

  static from(ticket) {
    return ticket ? new TicketDTO(ticket) : null;
  }

  static many(tickets) {
    return tickets.map((ticket) => TicketDTO.from(ticket));
  }
}
