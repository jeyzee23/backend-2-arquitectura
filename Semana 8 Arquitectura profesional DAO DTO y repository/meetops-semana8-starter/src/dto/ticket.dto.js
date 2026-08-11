import { EventDTO } from "./event.dto.js";
import { UserDTO } from "./user.dto.js";

/** TODO: id, status, event, user (usar EventDTO / UserDTO si vienen populate) */
export class TicketDTO {
  constructor(_ticket) {
    this.status = _ticket.status;
    this.event = EventDTO.from(_ticket.event);
    this.user = UserDTO.from(_ticket.user);
  }

  static from(ticket) {
    return ticket ? new TicketDTO(ticket) : null;
  }

  static many(tickets) {
    return tickets.map((ticket) => TicketDTO.from(ticket));
  }
}
