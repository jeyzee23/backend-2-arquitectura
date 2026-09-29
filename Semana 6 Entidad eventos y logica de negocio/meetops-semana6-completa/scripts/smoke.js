const base = `http://127.0.0.1:${process.env.PORT || 8080}/api`;
const stamp = Date.now();
const futureDate = "2027-03-15T19:00:00.000Z";

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

const eventBody = (overrides = {}) => ({
  title: `Meetup ${stamp}`,
  description: "Workshop de backend con reglas de negocio",
  category: "backend",
  date: futureDate,
  location: "Buenos Aires",
  capacity: 30,
  price: 0,
  ...overrides,
});

const run = async () => {
  await req("GET", "/health");

  const userEmail = `user.${stamp}@meetops.test`;
  await req("POST", "/sessions/register", {
    body: {
      first_name: "Ana",
      last_name: "User",
      email: userEmail,
      password: "Secret123!",
      role: "user",
    },
  });
  const userLogin = await req("POST", "/sessions/login", {
    body: { email: userEmail, password: "Secret123!" },
  });

  const organizerEmail = `organizer.${stamp}@meetops.test`;
  await req("POST", "/sessions/register", {
    body: {
      first_name: "Ada",
      last_name: "Lovelace",
      email: organizerEmail,
      password: "Secret123!",
      role: "organizer",
    },
  });
  const organizerLogin = await req("POST", "/sessions/login", {
    body: { email: organizerEmail, password: "Secret123!" },
  });

  const otherEmail = `organizer.b.${stamp}@meetops.test`;
  await req("POST", "/sessions/register", {
    body: {
      first_name: "Grace",
      last_name: "Hopper",
      email: otherEmail,
      password: "Secret123!",
      role: "organizer",
    },
  });
  const otherLogin = await req("POST", "/sessions/login", {
    body: { email: otherEmail, password: "Secret123!" },
  });

  const adminEmail = `admin.${stamp}@meetops.test`;
  await req("POST", "/sessions/register", {
    body: {
      first_name: "Root",
      last_name: "Admin",
      email: adminEmail,
      password: "Secret123!",
      role: "admin",
    },
  });
  const adminLogin = await req("POST", "/sessions/login", {
    body: { email: adminEmail, password: "Secret123!" },
  });

  await req("POST", "/events", {
    token: userLogin.token,
    body: eventBody(),
    expectedStatus: 403,
  });

  await req("POST", "/events", {
    token: organizerLogin.token,
    body: eventBody({ date: "2020-01-01T00:00:00.000Z" }),
    expectedStatus: 400,
  });

  await req("POST", "/events", {
    token: organizerLogin.token,
    body: eventBody({ capacity: 0 }),
    expectedStatus: 400,
  });

  const created = await req("POST", "/events", {
    token: organizerLogin.token,
    body: eventBody(),
  });
  const eventId = created.item._id;
  if (!eventId) throw new Error("Evento no creado");
  if (created.item.status !== "draft") throw new Error("El evento debería nacer como draft");
  if (created.item.organizer.toString() !== organizerLogin.user._id) {
    throw new Error("organizer no se asignó desde req.user");
  }

  const draftList = await req("GET", "/events");
  const foundDraft = (draftList.data || []).some((item) => item._id === eventId);
  if (foundDraft) throw new Error("Un draft no debería aparecer en el listado público");

  const published = await req("PATCH", `/events/${eventId}/status`, {
    token: organizerLogin.token,
    body: { status: "published" },
  });
  if (published.item.status !== "published") throw new Error("No se publicó el evento");

  const listed = await req("GET", `/events?status=published&category=backend&page=1&limit=5`);
  if (!listed.data) throw new Error("Falta data en el listado");
  if (listed.page !== 1) throw new Error("Falta page en el listado");
  if (!listed.total) throw new Error("Lista vacía después de publicar");

  await req("GET", `/events/${eventId}`);
  await req("GET", "/events/aaaaaaaaaaaaaaaaaaaaaaaa", { expectedStatus: 404 });

  await req("PUT", `/events/${eventId}`, {
    token: otherLogin.token,
    body: { title: "Hackeo" },
    expectedStatus: 403,
  });

  const updated = await req("PUT", `/events/${eventId}`, {
    token: organizerLogin.token,
    body: { title: "Meetup actualizado", capacity: 40 },
  });
  if (updated.item.title !== "Meetup actualizado") throw new Error("No actualizó el dueño");

  const adminUpdate = await req("PUT", `/events/${eventId}`, {
    token: adminLogin.token,
    body: { location: "Córdoba" },
  });
  if (adminUpdate.item.location !== "Córdoba") throw new Error("El admin debería poder editar");

  await req("PATCH", `/events/${eventId}/status`, {
    token: organizerLogin.token,
    body: { status: "cancelled" },
  });

  await req("PUT", `/events/${eventId}`, {
    token: organizerLogin.token,
    body: { title: "Ya cancelado" },
    expectedStatus: 400,
  });

  await req("PATCH", `/events/${eventId}/status`, {
    token: organizerLogin.token,
    body: { status: "published" },
    expectedStatus: 400,
  });

  console.log(
    "SMOKE OK — health, roles, fecha, capacity, create draft, publish, filtros, owner, admin, cancel",
  );
};

run().catch((error) => {
  console.error("SMOKE FAIL:", error.message);
  process.exit(1);
});
