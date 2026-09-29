import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const base = `http://127.0.0.1:${process.env.PORT || 8080}/api`;
const stamp = Date.now();
const future = "2027-06-01T19:00:00.000Z";

const req = async (method, path, { body, token, expectedStatus } = {}) => {
  const headers = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;
  const response = await fetch(`${base}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await response.json().catch(() => ({}));
  if (expectedStatus) {
    if (response.status !== expectedStatus) {
      throw new Error(
        `${method} ${path} -> esperado ${expectedStatus}, llegó ${response.status} ${JSON.stringify(data)}`,
      );
    }
    return data;
  }
  if (!response.ok) {
    throw new Error(`${method} ${path} -> ${response.status} ${JSON.stringify(data)}`);
  }
  return data;
};

const register = (email, role, first) =>
  req("POST", "/sessions/register", {
    body: { first_name: first, last_name: "Test", email, password: "Secret123!", role },
  });

const login = (email) =>
  req("POST", "/sessions/login", { body: { email, password: "Secret123!" } });

const run = async () => {
  await req("GET", "/health");

  const orgEmail = `org.${stamp}@meetops.test`;
  const otherEmail = `org2.${stamp}@meetops.test`;
  const userEmail = `user.${stamp}@meetops.test`;
  const user2Email = `user2.${stamp}@meetops.test`;
  await register(orgEmail, "organizer", "Ada");
  await register(otherEmail, "organizer", "Grace");
  await register(userEmail, "user", "Ana");
  await register(user2Email, "user", "Lin");
  const org = await login(orgEmail);
  const other = await login(otherEmail);
  const user = await login(userEmail);
  const user2 = await login(user2Email);

  const event = await req("POST", "/events", {
    token: org.token,
    body: {
      title: `Workshop ${stamp}`,
      starts_at: future,
      location: "Buenos Aires",
      capacity: 1,
    },
  });
  const eventId = event.item._id;

  await req("POST", "/events", {
    token: org.token,
    body: { title: "Viejo", starts_at: "2020-01-01T00:00:00.000Z", capacity: 10 },
    expectedStatus: 400,
  });
  await req("POST", "/events", {
    token: org.token,
    body: { title: "Sin cupo", starts_at: future, capacity: 0 },
    expectedStatus: 400,
  });

  const dated = await req("POST", "/events", {
    token: org.token,
    body: { title: "Para pasar la fecha", starts_at: future, capacity: 10 },
  });
  await mongoose.connect(process.env.MONGO_URL);
  await mongoose.connection.collection("events").updateOne(
    { _id: new mongoose.Types.ObjectId(dated.item._id) },
    { $set: { starts_at: new Date("2020-01-01T00:00:00.000Z") } },
  );
  await mongoose.disconnect();

  await req("POST", `/events/${eventId}/tickets`, { expectedStatus: 401 });
  await req("POST", "/events/aaaaaaaaaaaaaaaaaaaaaaaa/tickets", {
    token: user.token,
    expectedStatus: 404,
  });
  await req("POST", `/events/${dated.item._id}/tickets`, {
    token: user.token,
    expectedStatus: 400,
  });
  await req("POST", `/events/${eventId}/tickets`, {
    token: user.token,
    body: { quantity: 0 },
    expectedStatus: 400,
  });
  await req("POST", `/events/${eventId}/tickets`, {
    token: user.token,
    body: { quantity: 2 },
    expectedStatus: 400,
  });

  const ticket = await req("POST", `/events/${eventId}/tickets`, {
    token: user.token,
    body: { quantity: 1 },
  });
  if (!ticket.item.reservationCode?.startsWith("TCK-")) {
    throw new Error("Falta reservationCode");
  }

  await req("POST", `/events/${eventId}/tickets`, {
    token: user.token,
    expectedStatus: 409,
  });
  await req("POST", `/events/${eventId}/tickets`, {
    token: user2.token,
    expectedStatus: 409,
  });

  await req("GET", `/events/${eventId}/tickets`, {
    token: user.token,
    expectedStatus: 403,
  });
  await req("GET", `/events/${eventId}/tickets`, {
    token: other.token,
    expectedStatus: 403,
  });
  const roster = await req("GET", `/events/${eventId}/tickets`, { token: org.token });
  if (roster.total !== 1) throw new Error("El organizador no ve la inscripción");
  if (roster.items[0].user.password) throw new Error("Se filtró la contraseña");

  await req("PATCH", `/tickets/${ticket.item._id}/cancel`, {
    token: user2.token,
    expectedStatus: 403,
  });
  const cancelled = await req("PATCH", `/tickets/${ticket.item._id}/cancel`, {
    token: user.token,
  });
  if (cancelled.item.status !== "cancelled" || !cancelled.item.cancelledAt) {
    throw new Error("La cancelación no guardó estado y fecha");
  }
  await req("PATCH", `/tickets/${ticket.item._id}/cancel`, {
    token: user.token,
    expectedStatus: 400,
  });

  const again = await req("POST", `/events/${eventId}/tickets`, { token: user2.token });
  if (again.item.status !== "confirmed") throw new Error("El cupo no se liberó");

  const mine = await req("GET", "/tickets/my-tickets", { token: user2.token });
  if (!mine.total || mine.items[0].event.title !== `Workshop ${stamp}`) {
    throw new Error("Mis tickets no traen el evento");
  }

  await mongoose.connect(process.env.MONGO_URL);
  await mongoose.connection.collection("events").updateOne(
    { _id: new mongoose.Types.ObjectId(eventId) },
    { $set: { status: "cancelled" } },
  );
  await mongoose.disconnect();

  await req("POST", `/events/${eventId}/tickets`, {
    token: user.token,
    expectedStatus: 400,
  });

  console.log(
    "SMOKE OK — inscripción, cupo, duplicado, cancelar, cupo liberado, dueño, mail simulado",
  );
};

run().catch((error) => {
  console.error("SMOKE FAIL:", error.message);
  process.exit(1);
});
