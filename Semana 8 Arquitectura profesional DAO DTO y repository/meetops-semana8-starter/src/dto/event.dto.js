import { UserDTO } from "./user.dto.js";

/** TODO: id, title, description, starts_at, capacity, status, organizer(UserDTO) */
export class EventDTO {
  constructor(_event) {
    this.id = _event._id;
    this.title = _event.title;
    this.description = _event.description;
    this.starts_at = _event.starts_at;
    this.capacity = _event.capacity;
    this.status = _event.status;
    this.organizer = UserDTO.from(_event.organizer);
  }

  static from(event) {
    return event ? new EventDTO(event) : null;
  }

  static many(events) {
    return events.map((event) => EventDTO.from(event));
  }
}
