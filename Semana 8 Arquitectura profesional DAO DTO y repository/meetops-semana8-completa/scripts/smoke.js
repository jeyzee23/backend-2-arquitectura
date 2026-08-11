/**
 * Smoke test end-to-end contra el server en PORT (default 8080).
 * Uso: npm run start (otra terminal) && npm run smoke
 */
const base = `http://127.0.0.1:${process.env.PORT || 8080}/api`;
const stamp = Date.now();

const req = async (method, path, { body, token } = {}) => {
  const headers = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;
  const response = await fetch(`${base}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(`${method} ${path} -> ${response.status} ${JSON.stringify(data)}`);
  }
  return data;
};

const run = async () => {
  await req("GET", "/health");

  const email = `organizer.${stamp}@meetops.test`;
  await req("POST", "/sessions/register", {
    body: {
      first_name: "Ada",
      last_name: "Lovelace",
      email,
      password: "Secret123!",
      role: "organizer",
    },
  });

  const login = await req("POST", "/sessions/login", {
    body: { email, password: "Secret123!" },
  });
  const token = login.token;

  const current = await req("GET", "/sessions/current", { token });
  if (current.user.password) {
    throw new Error("DTO falló: password expuesto en current");
  }

  const created = await req("POST", "/events", {
    token,
    body: {
      title: `Arquitectura Night ${stamp}`,
      description: "DAO / DTO / Repository en vivo",
      starts_at: "2026-09-01T19:00:00.000Z",
      capacity: 2,
    },
  });

  const list = await req("GET", "/events");
  if (!list.total) throw new Error("Lista de eventos vacía");

  const userEmail = `user.${stamp}@meetops.test`;
  await req("POST", "/sessions/register", {
    body: {
      first_name: "Grace",
      last_name: "Hopper",
      email: userEmail,
      password: "Secret123!",
      role: "user",
    },
  });
  const userLogin = await req("POST", "/sessions/login", {
    body: { email: userEmail, password: "Secret123!" },
  });

  await req("POST", `/tickets/events/${created.item.id}`, {
    token: userLogin.token,
  });
  const mine = await req("GET", "/tickets/mine", { token: userLogin.token });
  if (!mine.total) throw new Error("Sin tickets del usuario");

  console.log("SMOKE OK — health, register, login, current(DTO), events, tickets");
};

run().catch((error) => {
  console.error("SMOKE FAIL:", error.message);
  process.exit(1);
});
