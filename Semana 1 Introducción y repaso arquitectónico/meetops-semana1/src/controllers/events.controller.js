export const EventsController = {
  async list(_request, response, next) {
    try {
      return response.status(200).json({
        status: "success",
        total: 0,
        items: [],
        // items: EventsService.list() -> // varios eventos enlistados en JSON,
      });
    } catch (error) {
      return next(error);
    }
  },
};
