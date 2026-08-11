import { TicketsService } from "../services/tickets.service.js";

const ticketsService = new TicketsService();

export const TicketsController = {
  async register(request, response, next) {
    try {
      const item = await ticketsService.register(request.params.eventId, request.user._id);
      return response.status(201).json({ status: "success", item });
    } catch (error) {
      return next(error);
    }
  },

  async mine(request, response, next) {
    try {
      const items = await ticketsService.mine(request.user._id);
      return response.status(200).json({ status: "success", total: items.length, items });
    } catch (error) {
      return next(error);
    }
  },
};
