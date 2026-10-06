import "dotenv/config";
import process from "node:process";
import { createApp } from "./app.js";
import { createEmailSender } from "./email.js";

const production = process.env.NODE_ENV === "production";
const allowedOrigins = process.env.FRONTEND_ORIGINS
  ? process.env.FRONTEND_ORIGINS.split(",").map((origin) => origin.trim()).filter(Boolean)
  : production
    ? []
    : ["http://localhost:5173", "http://127.0.0.1:5173"];

if (production && allowedOrigins.length === 0) {
  throw new Error("FRONTEND_ORIGINS must be configured in production.");
}

const emailSender = createEmailSender({
  apiKey: process.env.RESEND_API_KEY,
  from: process.env.EMAIL_FROM,
  to: process.env.EMAIL_TO,
});

if (!emailSender.configured) {
  console.warn("Contact email is not configured; POST /api/contact will return 503.");
}

const parsedTrustProxyHops = Number.parseInt(process.env.TRUST_PROXY_HOPS ?? "0", 10);
const trustProxyHops = Number.isInteger(parsedTrustProxyHops) && parsedTrustProxyHops >= 0
  ? parsedTrustProxyHops
  : 0;
const port = Number.parseInt(process.env.PORT ?? "3001", 10);
const app = createApp({
  allowedOrigins,
  emailConfigured: emailSender.configured,
  sendEmail: emailSender.send,
  trustProxyHops,
});

app.listen(port, () => {
  console.info(`Contact API listening on port ${port}.`);
});
