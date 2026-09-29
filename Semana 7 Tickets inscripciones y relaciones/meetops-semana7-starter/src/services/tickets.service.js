import { TicketModel, createReservationCode } from "../models/ticket.model.js";
import { EventModel } from "../models/event.model.js";
import { HttpError } from "../utils/http-error.js";
import { sendMail } from "../utils/mailer.js";

const OCCUPYING = ["confirmed", "pending"];

export class TicketsService {
  async occupiedSeats(eventId) {
    const rows = await TicketModel.aggregate([
      { $match: { event: eventId, status: { $in: OCCUPYING } } },
      { $group: { _id: "$event", totalReserved: { $sum: "$quantity" } } },
    ]);
    return rows[0]?.totalReserved || 0;
  }

  async register({ eventId, userId, quantity = 1, user }) {
    const seats = Number(quantity);
    if (!Number.isFinite(seats) || seats <= 0) {
      throw new HttpError(400, "La cantidad debe ser mayor a cero");
    }

    const event = await EventModel.findById(eventId);
    if (!event) throw new HttpError(404, "Evento no encontrado");
    if (event.status !== "published") {
      throw new HttpError(400, "El evento no está disponible para inscripciones");
    }
    if (new Date(event.starts_at) <= new Date()) {
      throw new HttpError(400, "No es posible inscribirse a un evento finalizado");
    }

    const existingTicket = await TicketModel.findOne({
      user: userId,
      event: event._id,
      status: { $in: OCCUPYING },
    });
    if (existingTicket) {
      throw new HttpError(409, "Ya tenés una inscripción activa para este evento");
    }

    const reserved = await this.occupiedSeats(event._id);
    const available = event.capacity - reserved;
    if (seats > available) {
      throw new HttpError(400, "No hay cupos suficientes disponibles");
    }

    const ticket = await TicketModel.create({
      event: event._id,
      user: userId,
      quantity: seats,
      status: "confirmed",
      reservationCode: createReservationCode(),
    });

    try {
      await sendMail({
        to: user.email,
        subject: `Inscripción confirmada: ${event.title}`,
        text: `Hola ${user.first_name}. Tu lugar en ${event.title} quedó confirmado. Código: ${ticket.reservationCode}. Lugares: ${seats}.`,
      });
    } catch (error) {
      console.error("No se pudo enviar el mail de inscripción:", error.message);
    }

    return ticket.toObject();
  }

  async mine(userId) {
    return TicketModel.find({ user: userId })
      .populate("event", "title starts_at location status capacity")
      .sort({ createdAt: -1 })
      .lean();
  }

  async listByEvent(eventId, actor) {
    const event = await EventModel.findById(eventId);
    if (!event) throw new HttpError(404, "Evento no encontrado");

    const isAdmin = actor.role === "admin";
    const isOwner = event.organizer.toString() === actor._id.toString();
    if (!isAdmin && !isOwner) {
      throw new HttpError(403, "No podés ver las inscripciones de este evento");
    }

    return TicketModel.find({ event: eventId })
      .populate("user", "first_name last_name email role")
      .sort({ createdAt: -1 })
      .lean();
  }

  async cancel(ticketId, actor) {
    const ticket = await TicketModel.findById(ticketId)
      .populate("event")
      .populate("user", "first_name email");
    if (!ticket) throw new HttpError(404, "Ticket no encontrado");

    const ownerId = ticket.user._id ? ticket.user._id.toString() : ticket.user.toString();
    const isAdmin = actor.role === "admin";
    const isOwner = ownerId === actor._id.toString();
    if (!isAdmin && !isOwner) {
      throw new HttpError(403, "No podés cancelar este ticket");
    }
    if (ticket.status === "cancelled") {
      throw new HttpError(400, "El ticket ya está cancelado");
    }
    if (new Date(ticket.event.starts_at) <= new Date()) {
      throw new HttpError(400, "No se puede cancelar una inscripción de un evento finalizado");
    }

    ticket.status = "cancelled";
    ticket.cancelledAt = new Date();
    await ticket.save();

    try {
      await sendMail({
        to: ticket.user.email || actor.email,
        subject: `Inscripción cancelada: ${ticket.event.title}`,
        text: `Se canceló el ticket ${ticket.reservationCode} de ${ticket.event.title}. El cupo vuelve a estar disponible.`,
      });
    } catch (error) {
      console.error("No se pudo enviar el mail de cancelación:", error.message);
    }

    return ticket.toObject();
  }
}
