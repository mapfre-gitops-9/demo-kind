const assert = require("node:assert/strict");
const { after, before, test } = require("node:test");

const { app } = require("./app");

let baseUrl;
let server;

before(async () => {
  await new Promise((resolve) => {
    server = app.listen(0, "127.0.0.1", () => {
      const address = server.address();
      baseUrl = `http://127.0.0.1:${address.port}`;
      resolve();
    });
  });
});

after(async () => {
  await new Promise((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()));
  });
});

test("expone la comprobación de salud", async () => {
  const response = await fetch(`${baseUrl}/healthz`);

  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { estado: "ok" });
});

test("usa un alias neutro cuando no se proporciona ninguno", async () => {
  const response = await fetch(`${baseUrl}/api/saludo`);
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.equal(body.mensaje, "Hola, equipo.");
  assert.equal(typeof body.instancia, "string");
  assert.ok(body.instancia.length > 0);
});

test("acepta un alias ficticio válido", async () => {
  const response = await fetch(
    `${baseUrl}/api/saludo?alias=${encodeURIComponent("equipo_demo-9")}`,
  );

  assert.equal(response.status, 200);
  assert.equal((await response.json()).mensaje, "Hola, equipo_demo-9.");
});

test("rechaza caracteres no permitidos", async () => {
  const response = await fetch(
    `${baseUrl}/api/saludo?alias=${encodeURIComponent("<script>")}`,
  );

  assert.equal(response.status, 400);
  assert.equal(typeof (await response.json()).error, "string");
});

test("rechaza alias de más de 32 caracteres", async () => {
  const response = await fetch(
    `${baseUrl}/api/saludo?alias=${"a".repeat(33)}`,
  );

  assert.equal(response.status, 400);
});

test("no abre CORS ni publica la tecnología del backend", async () => {
  const response = await fetch(`${baseUrl}/api/saludo`);

  assert.equal(response.headers.get("access-control-allow-origin"), null);
  assert.equal(response.headers.get("x-powered-by"), null);
  assert.match(response.headers.get("content-type"), /^application\/json/);
});
