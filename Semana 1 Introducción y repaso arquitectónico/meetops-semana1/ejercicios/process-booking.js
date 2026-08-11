/**
 * Ejercicio — Semana 1 · Arquitectura
 * SRP + inyección de dependencias + fail-fast
 *
 * Flujo obligatorio: Validar → Guardar → Notificar
 *
 * Demo: node ejercicios/process-booking.js
 */

import { pathToFileURL } from "node:url";

/**
 * Verifica exclusivamente que los datos de la reserva sean correctos.
 * Fail-fast: lanza error si falta eventId o userEmail.
 */
export function validateBookingData(booking) {
  if (!booking?.eventId) {
    throw new Error("Falta eventId en la reserva");
  }

  if (!booking?.userEmail) {
    throw new Error("Falta userEmail en la reserva");
  }
}

/**
 * Orquesta la reserva inyectando DB y servicio de notificaciones
 * (sin hardcodear dependencias globales).
 */
export async function processBooking(booking, database, mailService) {
  validateBookingData(booking);

  await database.save(booking);

  await mailService.send(
    `Reserva confirmada para el evento ${booking.eventId} (${booking.userEmail})`,
  );

  return { status: "success", booking };
}

/* --- Stubs para demos / tests locales (inyectables) --- */

export const memoryDatabase = {
  items: [],
  async save(booking) {
    this.items.push(booking);
    return booking;
  },
};

export const consoleMailService = {
  async send(message) {
    console.log(`[mail] ${message}`);
  },
};

const isMain =
  Boolean(process.argv[1]) &&
  import.meta.url === pathToFileURL(process.argv[1]).href;

if (isMain) {
  const booking = { eventId: "DEV-FEST", userEmail: "dev@test.com" };

  processBooking(booking, memoryDatabase, consoleMailService)
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.error(error.message);
      process.exitCode = 1;
    });
}
