import { EventsService } from "../services/events.service.js";

const eventsService = new EventsService();

export const EventsController = {
  async list(_request, response, next) {
    try {
      const items = await eventsService.list();
      return response.status(200).json({ status: "success", total: items.length, items });
    } catch (error) {
      return next(error);
    }
  },

  async getById(request, response, next) {
    try {
      const item = await eventsService.getById(request.params.id);
      return response.status(200).json({ status: "success", item });
    } catch (error) {
      return next(error);
    }
  },

  async create(request, response, next) {
    try {
      const item = await eventsService.create(request.body, request.user._id);
      return response.status(201).json({ status: "success", item });
    } catch (error) {
      return next(error);
    }
  },
};
