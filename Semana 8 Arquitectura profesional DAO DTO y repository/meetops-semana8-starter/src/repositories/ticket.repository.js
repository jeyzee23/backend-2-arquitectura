import { TicketDAO } from "../dao/ticket.dao.js";

/** TODO: create, countConfirmed, getByEventAndUser, listByUser, listAll */
export class TicketRepository {
  constructor(dao = new TicketDAO()) {
    this.dao = dao;
  }

  create(_data) {
    return this.dao.create(_data);
  }

  countConfirmed(_eventId) {
    return this.dao.countByEvent(_eventId);
  }

  getByEventAndUser(_eventId, _userId) {
    return this.dao.findByEventAndUser(_eventId, _userId);
  }

  listByUser(_userId) {
    return this.dao.findByUser(_userId);
  }

  listAll() {
    return this.dao.findAll();
  }
}
