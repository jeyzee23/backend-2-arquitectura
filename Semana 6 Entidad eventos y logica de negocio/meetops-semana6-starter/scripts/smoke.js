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
  const login = await req("POST", "/sessions/login", { body: { email, password: "Secret123!" } });
  const created = await req("POST", "/events", {
    token: login.token,
    body: {
      title: `Meetup ${stamp}`,
      description: "Starter demo",
      category: "backend",
      date: "2027-03-15T19:00:00.000Z",
      location: "Buenos Aires",
      capacity: 10,
      price: 0,
    },
  });
  if (!created.item?._id) throw new Error("Evento no creado");
  await req("GET", `/events/${created.item._id}`);
  console.log("SMOKE PARCIAL OK — health, register, login, create, getById");
  console.log("Cuando termines el lab, usá el smoke de meetops-semana6-completa.");
};

run().catch((error) => {
  console.error("SMOKE FAIL:", error.message);
  process.exit(1);
});
