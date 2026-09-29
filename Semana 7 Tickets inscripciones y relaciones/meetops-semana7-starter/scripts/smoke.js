const base = `http://127.0.0.1:${process.env.PORT || 8081}/api`;
const stamp = Date.now();

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

const run = async () => {
  await req("GET", "/health");
  const email = `org.${stamp}@meetops.test`;
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
  const event = await req("POST", "/events", {
    token: login.token,
    body: { title: `Workshop ${stamp}`, starts_at: "2027-06-01T19:00:00.000Z", capacity: 10 },
  });
  await req("POST", `/events/${event.item._id}/tickets`, {
    token: login.token,
    expectedStatus: 501,
  });
  console.log("SMOKE PARCIAL OK — health, evento. La inscripción responde 501 hasta completar el lab.");
};

run().catch((error) => {
  console.error("SMOKE FAIL:", error.message);
  process.exit(1);
});
