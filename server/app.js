import express from "express";
import rateLimit from "express-rate-limit";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/u;
const hasControlCharacters = (value) => (
  [...value].some((character) => {
    const codePoint = character.codePointAt(0);
    return codePoint < 32 || codePoint === 127;
  })
);

export function createApp({
  allowedOrigins = [],
  emailConfigured = false,
  sendEmail = async () => {
    throw new Error("Email provider is not configured");
  },
  logger = console,
  trustProxyHops = 0,
} = {}) {
  const app = express();
  app.disable("x-powered-by");
  if (trustProxyHops > 0) app.set("trust proxy", trustProxyHops);

  const originSet = new Set(allowedOrigins);

  app.use((request, response, next) => {
    const origin = request.get("origin");
    response.vary("Origin");

    if (!origin) return next();
    if (!originSet.has(origin)) {
      return response.status(403).json({ ok: false, message: "Origen no permitido." });
    }

    response.set("Access-Control-Allow-Origin", origin);
    response.set("Access-Control-Allow-Methods", "POST, OPTIONS");
    response.set("Access-Control-Allow-Headers", "Content-Type");

    if (request.method === "OPTIONS") return response.sendStatus(204);
    return next();
  });

  app.use(express.json({ limit: "24kb", strict: true }));

  app.post(
    "/api/contact",
    rateLimit({
      windowMs: 15 * 60 * 1000,
      limit: 5,
      standardHeaders: "draft-8",
      legacyHeaders: false,
      message: { ok: false, message: "Demasiadas solicitudes. Probá de nuevo más tarde." },
    }),
    async (request, response) => {
      const body = request.body;
      if (!body || typeof body !== "object" || Array.isArray(body)) {
        return response.status(400).json({ ok: false, message: "Completá los campos requeridos." });
      }

      if (typeof body.website === "string" && body.website.trim()) {
        return response.status(400).json({ ok: false, message: "No se pudo procesar la solicitud." });
      }

      const name = typeof body.name === "string" ? body.name.trim() : "";
      const email = typeof body.email === "string" ? body.email.trim() : "";
      const message = typeof body.message === "string" ? body.message.trim() : "";

      if (
        name.length < 2
        || name.length > 100
        || hasControlCharacters(name)
        || email.length > 254
        || !emailPattern.test(email)
        || hasControlCharacters(email)
        || message.length < 10
        || message.length > 5000
      ) {
        return response.status(400).json({
          ok: false,
          message: "Revisá el nombre, el formato del correo y el largo del mensaje.",
        });
      }

      if (!emailConfigured) {
        return response.status(503).json({
          ok: false,
          message: "El servicio de contacto todavía no está configurado. Escribime directamente por email.",
        });
      }

      try {
        await sendEmail({ name, email, message });
        return response.status(202).json({ ok: true });
      } catch (error) {
        logger.error(
          "Contact email delivery failed:",
          error instanceof Error ? error.name : "UnknownError",
        );
        return response.status(502).json({
          ok: false,
          message: "No pudimos enviar el mensaje. Probá de nuevo más tarde.",
        });
      }
    },
  );

  app.use((error, request, response, next) => {
    if (response.headersSent) return next(error);

    if (error?.type === "entity.too.large") {
      return response.status(413).json({ ok: false, message: "La solicitud excede el tamaño permitido." });
    }

    if (error instanceof SyntaxError && "body" in error) {
      return response.status(400).json({ ok: false, message: "El formato de la solicitud no es válido." });
    }

    logger.error(
      "Unhandled contact API error:",
      error instanceof Error ? error.name : "UnknownError",
    );
    return response.status(500).json({ ok: false, message: "No se pudo procesar la solicitud." });
  });

  return app;
}
