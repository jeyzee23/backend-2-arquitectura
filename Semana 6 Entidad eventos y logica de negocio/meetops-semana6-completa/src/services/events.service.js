import mongoose from "mongoose";
import { EventModel } from "../models/event.model.js";
import { HttpError } from "../utils/http-error.js";

const ALLOWED_STATUS = ["draft", "published", "cancelled", "finished"];
const ALLOWED_SORT = [
  "date",
  "-date",
  "title",
  "-title",
  "price",
  "-price",
  "createdAt",
  "-createdAt",
];

export class EventsService {
  // permisos — solo el organizer del evento o un admin pueden tocarlo.
  assertOwnerOrAdmin(event, actor) {
    const organizerId = event.organizer._id
      ? event.organizer._id.toString()
      : event.organizer.toString();
    const isAdmin = actor.role === "admin";
    const isOwner = organizerId === actor._id.toString();
    if (!isAdmin && !isOwner) {
      throw new HttpError(403, "No tenés permisos para modificar este evento");
    }
  }

  // editable — cancelado o finalizado: el documento queda, pero no se edita.
  assertEditable(event) {
    if (event.status === "cancelled") {
      throw new HttpError(400, "Un evento cancelado no puede modificarse");
    }
    if (event.status === "finished") {
      throw new HttpError(400, "Un evento finalizado no puede modificarse");
    }
  }

  // fechas — la fecha tiene que ser válida y posterior a ahora.
  parseFutureDate(value) {
    const eventDate = new Date(value);
    if (Number.isNaN(eventDate.getTime())) {
      throw new HttpError(400, "La fecha del evento no es válida");
    }
    if (eventDate <= new Date()) {
      throw new HttpError(400, "La fecha del evento debe ser futura");
    }
    return eventDate;
  }

  // cupo — número mayor a cero.
  parseCapacity(value) {
    const capacity = Number(value);
    if (!Number.isFinite(capacity) || capacity <= 0) {
      throw new HttpError(400, "La capacidad debe ser mayor a cero");
    }
    return capacity;
  }

  // precio — 0 es gratis; no puede ser negativo.
  parsePrice(value) {
    const price = Number(value);
    if (!Number.isFinite(price) || price < 0) {
      throw new HttpError(400, "El precio no puede ser negativo");
    }
    return price;
  }

  // querys — filtros, paginación y sort del listado.
  async list(query = {}) {
    const {
      status,
      category,
      location,
      dateFrom,
      dateTo,
      search,
      page = 1,
      limit = 10,
      sort = "date",
    } = query;


    // Listado público: si no piden status, solo published.
    if (status) {
      if (!ALLOWED_STATUS.includes(status)) {
        throw new HttpError(400, "status inválido");
      }
      filter.status = status;
    } else {
      filter.status = "published";
    }

    // category y location: coincidencia parcial, sin importar mayúsculas.
    if (category) {
      filter.category = { $regex: category, $options: "i" };
    }

    if (location) {
      filter.location = { $regex: location, $options: "i" };
    }

    // Rango de fechas del evento.
    if (dateFrom || dateTo) {
      filter.date = {};
      if (dateFrom) filter.date.$gte = new Date(dateFrom);
      if (dateTo) filter.date.$lte = new Date(dateTo);
    }

    // search busca en título o descripción.
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // page/limit acotan el lote; sort solo acepta campos de ALLOWED_SORT.
    const pageNumber = Math.max(Number(page) || 1, 1);
    const limitNumber = Math.min(Math.max(Number(limit) || 10, 1), 50);
    const skip = (pageNumber - 1) * limitNumber;
    const sortOption = ALLOWED_SORT.includes(sort) ? sort : "date";

    const [data, total] = await Promise.all([
      EventModel.find(filter)
        .populate("organizer", "first_name last_name email role")
        .sort(sortOption)
        .skip(skip)
        .limit(limitNumber)
        .lean(),
      EventModel.countDocuments(filter),
    ]);

    return {
      data,
      page: pageNumber,
      limit: limitNumber,
      total,
      totalPages: Math.ceil(total / limitNumber) || 0,
    };
  }

  async getById(id) {
    if (!mongoose.isValidObjectId(id)) {
      throw new HttpError(400, "Id de evento inválido");
    }

    const event = await EventModel.findById(id)
      .populate("organizer", "first_name last_name email role")
      .lean();

    if (!event) throw new HttpError(404, "Evento no encontrado");
    return event;
  }

  // crear — reglas al dar de alta: fecha futura, cupo, precio, organizer del token, nace draft.
  async create(payload, organizerId) {
    const { title, description, category, date, location, capacity, price } = payload;

    if (!title || !description || !category || !date || !location || capacity === undefined) {
      throw new HttpError(
        400,
        "title, description, category, date, location y capacity son obligatorios",
      );
    }

    // organizer sale del token; nace como draft; fecha, cupo y precio se validan acá.
    const event = await EventModel.create({
      title,
      description,
      category,
      date: this.parseFutureDate(date),
      location,
      capacity: this.parseCapacity(capacity),
      price: this.parsePrice(price ?? 0),
      organizer: organizerId,
      status: "draft",
    });

    return event.toObject();
  }

  // editar — dueño/admin, no tocar cancelado/finished, fecha futura si cambia.
  async update(id, payload, actor) {
    const event = await EventModel.findById(id);
    if (!event) throw new HttpError(404, "Evento no encontrado");

    this.assertOwnerOrAdmin(event, actor);
    this.assertEditable(event);
    // organizer y status no se toman del body: el dueño se setea al crear, el estado va por PATCH.

    if (payload.title !== undefined) event.title = payload.title;
    if (payload.description !== undefined) event.description = payload.description;
    if (payload.category !== undefined) event.category = payload.category;
    if (payload.location !== undefined) event.location = payload.location;
    if (payload.date !== undefined) event.date = this.parseFutureDate(payload.date);
    if (payload.capacity !== undefined) event.capacity = this.parseCapacity(payload.capacity);
    if (payload.price !== undefined) event.price = this.parsePrice(payload.price);

    await event.save();
    return event.toObject();
  }

  // estados — transiciones: cancelado no vuelve, finished no se mueve, publicar pide fecha futura.
  async changeStatus(id, status, actor) {
    if (!ALLOWED_STATUS.includes(status)) {
      throw new HttpError(400, "status inválido");
    }

    const event = await EventModel.findById(id);
    if (!event) throw new HttpError(404, "Evento no encontrado");

    this.assertOwnerOrAdmin(event, actor);
    // Transiciones: cancelado no vuelve atrás; finished no se mueve; publicar pide fecha futura.

    if (event.status === "cancelled" && status !== "cancelled") {
      throw new HttpError(400, "Un evento cancelado no puede cambiar de estado");
    }

    if (event.status === "finished") {
      throw new HttpError(400, "Un evento finalizado no puede cambiar de estado");
    }

    if (status === "published") {
      if (event.status === "cancelled" || event.status === "finished") {
        throw new HttpError(400, "No se puede publicar un evento cancelado o finalizado");
      }
      if (new Date(event.date) <= new Date()) {
        throw new HttpError(400, "No se puede publicar un evento con fecha pasada");
      }
    }

    if (status === "cancelled" && new Date(event.date) <= new Date()) {
      throw new HttpError(400, "No se puede cancelar un evento que ya finalizó");
    }

    event.status = status;
    await event.save();
    return event.toObject();
  }
}
