const base = `http://127.0.0.1:${process.env.PORT || 8080}/api`;
const stamp = Date.now();

const req = async (method, path, { body } = {}) => {
  const response = await fetch(`${base}${path}`, {
    method,
    headers: { "Content-Type": "application/json" },
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
  const registered = await req("POST", "/sessions/register", {
    body: {
      first_name: "Ada",
      last_name: "Lovelace",
      email,
      password: "Secret123!",
    },
  });
  if (registered.user.password) {
    throw new Error("password expuesto en register");
  }
  console.log("SMOKE OK — health, register (sin password)");
};

run().catch((error) => {
  console.error("SMOKE FAIL:", error.message);
  process.exit(1);
});
