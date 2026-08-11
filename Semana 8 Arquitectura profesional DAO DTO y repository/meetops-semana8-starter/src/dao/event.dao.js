import { EventModel } from "../models/event.model.js";

/** TODO: create, findAll, findById, updateById */
export class EventDAO {
    create(data) {
        return EventModel.create(data);
    }

    findAll(filter={}) {
        return EventModel.find(filter).populate("organizer", "first_name last_name email").lean()
    }

    findyById(id) {
        return EventModel.findById(id).populate("organizer", "first_name last_name email").lean()
    }

    updateById(id, data) {
        return EventModel.findByIdAndUpdate(id, data, { new: true }).lean()
    }
};
