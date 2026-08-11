import { TicketDAO } from "../dao/ticket.dao.js";

export class TicketRepository {
  constructor(dao = new TicketDAO()) {
    this.dao = dao;
  }

  create(data) {
    return this.dao.create(data);
  }

  countConfirmed(eventId) {
    return this.dao.countByEvent(eventId);
  }

  getByEventAndUser(eventId, userId) {
    return this.dao.findByEventAndUser(eventId, userId);
  }

  listByUser(userId) {
    return this.dao.findByUser(userId);
  }

  listAll() {
    return this.dao.findAll();
  }
}
