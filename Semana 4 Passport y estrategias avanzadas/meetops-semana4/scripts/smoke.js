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
  const email = `user.${stamp}@meetops.test`;
  await req("POST", "/sessions/register", {
    body: { first_name: "Ada", last_name: "Lovelace", email, password: "Secret123!" },
  });
  const login = await req("POST", "/sessions/login", {
    body: { email, password: "Secret123!" },
  });
  const current = await req("GET", "/sessions/current", { token: login.token });
  if (current.user.password) throw new Error("password expuesto en current");
  console.log("SMOKE OK — health, register, login, current");
};

run().catch((error) => {
  console.error("SMOKE FAIL:", error.message);
  process.exit(1);
});
