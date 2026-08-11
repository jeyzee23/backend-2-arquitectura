import { EventModel } from "../models/event.model.js";

/** Acceso crudo a Mongo — solo habla con el model. */
export class EventDAO {
  create(data) {
    return EventModel.create(data);
  }

  findAll(filter = {}) {
    return EventModel.find(filter).populate("organizer", "first_name last_name email").lean();
  }

  findById(id) {
    return EventModel.findById(id).populate("organizer", "first_name last_name email").lean();
  }

  updateById(id, data) {
    return EventModel.findByIdAndUpdate(id, data, { new: true }).lean();
  }
}
