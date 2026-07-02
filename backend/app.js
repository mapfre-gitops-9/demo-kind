const express = require("express");

const app = express();
const port = Number.parseInt(process.env.PORT || "3000", 10);
const aliasPattern = /^[\p{L}\p{N} _-]+$/u;

app.disable("x-powered-by");

function validateAlias(value) {
  const alias = typeof value === "string" ? value.trim() : "";
  const normalizedAlias = alias || "equipo";

  if (normalizedAlias.length > 32 || !aliasPattern.test(normalizedAlias)) {
    return {
      error:
        "El alias debe tener entre 1 y 32 caracteres y usar solo letras, " +
        "números, espacios, guiones o guiones bajos.",
    };
  }

  return { alias: normalizedAlias };
}

app.get("/healthz", (_request, response) => {
  response.json({ estado: "ok" });
});

app.get("/api/saludo", (request, response) => {
  const result = validateAlias(request.query.alias);

  if (result.error) {
    response.status(400).json({ error: result.error });
    return;
  }

  response.json({
    mensaje: `Hola, ${result.alias}.`,
    instancia: process.env.HOSTNAME || "local",
  });
});

if (require.main === module) {
  const server = app.listen(port, "0.0.0.0", () => {
    console.log(`Backend disponible en el puerto ${port}`);
  });

  const shutdown = () => {
    server.close(() => process.exit(0));
  };

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
}

module.exports = { app, validateAlias };
