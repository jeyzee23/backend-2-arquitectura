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

  const orgEmail = `organizer.${stamp}@meetops.test`;
  await req("POST", "/sessions/register", {
    body: {
      first_name: "Ada",
      last_name: "Lovelace",
      email: orgEmail,
      password: "Secret123!",
      role: "organizer",
    },
  });
  const orgLogin = await req("POST", "/sessions/login", {
    body: { email: orgEmail, password: "Secret123!" },
  });

  const created = await req("POST", "/events", {
    token: orgLogin.token,
    body: {
      title: `Capstone prep ${stamp}`,
      starts_at: "2026-09-01T19:00:00.000Z",
      capacity: 2,
    },
  });

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

  await req("POST", `/tickets/events/${created.item._id}`, { token: userLogin.token });
  const mine = await req("GET", "/tickets/mine", { token: userLogin.token });
  if (!mine.total) throw new Error("Sin tickets del usuario");

  console.log("SMOKE OK — health, events, register ticket, mine");
};

run().catch((error) => {
  console.error("SMOKE FAIL:", error.message);
  process.exit(1);
});
