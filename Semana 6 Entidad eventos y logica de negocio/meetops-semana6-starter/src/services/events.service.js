import { EventModel } from "../models/event.model.js";
import { HttpError } from "../utils/http-error.js";

export class EventsService {
  async list(_query = {}) {
    // TODO 3 — Filtros + paginación + sort.
    // Query params: status, category, location, dateFrom, dateTo, search, page, limit, sort
    // Default: status=published (el listado público no muestra borradores).
    // Respuesta: { data, page, limit, total, totalPages }
    const items = await EventModel.find({ status: "published" })
      .populate("organizer", "first_name last_name email role")
      .sort({ date: 1 })
      .lean();

    return {
      data: items,
      page: 1,
      limit: items.length,
      total: items.length,
      totalPages: 1,
    };
  }

  async getById(id) {
    const event = await EventModel.findById(id)
      .populate("organizer", "first_name last_name email role")
      .lean();
    if (!event) throw new HttpError(404, "Evento no encontrado");
    return event;
  }

  async create(payload, organizerId) {
    const { title, description, category, date, location, capacity, price } = payload;

    if (!title || !description || !category || !date || !location || capacity === undefined) {
      throw new HttpError(
        400,
        "title, description, category, date, location y capacity son obligatorios",
      );
    }

    // TODO 2 — Reglas de negocio al crear:
    // 1) date debe ser futura
    // 2) capacity > 0
    // 3) price >= 0
    // 4) organizer SIEMPRE sale de organizerId (req.user), NUNCA del body
    // 5) status inicial: draft (ya lo pone el schema)

    const event = await EventModel.create({
      title,
      description,
      category,
      date,
      location,
      capacity: Number(capacity),
      price: Number(price ?? 0),
      organizer: organizerId,
      status: "draft",
    });

    return event.toObject();
  }

  async update(_id, _payload, _actor) {
    // TODO 4 — Actualizar evento
    // - 404 si no existe
    // - 403 si no es dueño ni admin
    // - 400 si está cancelled o finished
    // - si cambia date, también debe ser futura
    // - no aceptar organizer ni status desde el body
    throw new HttpError(501, "TODO: implementar update en EventsService");
  }

  async changeStatus(_id, _status, _actor) {
    // TODO 5 — Cambiar estado (draft | published | cancelled | finished)
    // - no publicar cancelados / finalizados / con fecha pasada
    // - cancelar = cambiar status, NUNCA borrar el documento
    // - un cancelled no vuelve a otro estado
    throw new HttpError(501, "TODO: implementar changeStatus en EventsService");
  }
}
