import { UserDTO } from "./user.dto.js";

export class EventDTO {
  constructor(event) {
    this.id = event._id?.toString?.() || event.id;
    this.title = event.title;
    this.description = event.description;
    this.starts_at = event.starts_at;
    this.capacity = event.capacity;
    this.status = event.status;
    this.organizer =
      event.organizer && typeof event.organizer === "object"
        ? UserDTO.from(event.organizer)
        : event.organizer?.toString?.() || event.organizer;
  }

  static from(event) {
    return event ? new EventDTO(event) : null;
  }

  static many(events) {
    return events.map((event) => EventDTO.from(event));
  }
}
