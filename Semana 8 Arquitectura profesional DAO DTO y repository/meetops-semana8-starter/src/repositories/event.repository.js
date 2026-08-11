import { EventDAO } from "../dao/event.dao.js";

/** TODO: create, list, getById, update */
export class EventRepository {
  constructor(dao = new EventDAO()) {
    this.dao = dao;
  }

  create(_data) {
    return this.dao.create(_data);
  }

  list(_filter) {
    return this.dao.findAll(_filter);
  }

  getById(_id) {
    return this.dao.findyById(_id);
  }

  updateById(_id, _data) {
    return this.dao.updateById(_id, _data);
  }
}
