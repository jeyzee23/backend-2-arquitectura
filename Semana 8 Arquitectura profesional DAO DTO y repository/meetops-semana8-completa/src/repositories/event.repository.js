import { EventDAO } from "../dao/event.dao.js";

/** Repository: orquesta el DAO. El service no importa mongoose. */
export class EventRepository {
  constructor(dao = new EventDAO()) {
    this.dao = dao;
  }

  create(data) {
    return this.dao.create(data);
  }

  list(filter) {
    return this.dao.findAll(filter);
  }

  getById(id) {
    return this.dao.findById(id);
  }

  update(id, data) {
    return this.dao.updateById(id, data);
  }
}
