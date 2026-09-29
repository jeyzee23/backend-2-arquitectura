import { EventsService } from "../services/events.service.js";

const eventsService = new EventsService();

export const EventsController = {
  async list(request, response, next) {
    try {
      const result = await eventsService.list(request.query);
      return response.status(200).json({ status: "success", ...result });
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

  async update(request, response, next) {
    try {
      const item = await eventsService.update(request.params.id, request.body, request.user);
      return response.status(200).json({ status: "success", item });
    } catch (error) {
      return next(error);
    }
  },

  async changeStatus(request, response, next) {
    try {
      const item = await eventsService.changeStatus(
        request.params.id,
        request.body.status,
        request.user,
      );
      return response.status(200).json({ status: "success", item });
    } catch (error) {
      return next(error);
    }
  },
};
