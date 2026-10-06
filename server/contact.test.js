import assert from "node:assert/strict";
import { once } from "node:events";
import { createServer } from "node:http";
import test from "node:test";
import { createApp } from "./app.js";
import { createEmailSender } from "./email.js";

async function withApi(options, run) {
  const server = createServer(createApp(options));
  server.listen(0, "127.0.0.1");
  await once(server, "listening");

  try {
    const { port } = server.address();
    await run(`http://127.0.0.1:${port}`);
  } finally {
    server.close();
    await once(server, "close");
  }
}

const validMessage = {
  name: "Nicolas",
  email: "visitor@example.com",
  message: "Hola, quisiera conversar sobre una oportunidad.",
};
const quietLogger = { error() {} };

test("accepts valid contact requests and sends reply-to data to the provider", async () => {
  let delivered;
  await withApi({
    allowedOrigins: ["https://portfolio.example"],
    emailConfigured: true,
    logger: quietLogger,
    sendEmail: async (content) => { delivered = content; },
  }, async (baseUrl) => {
    const response = await fetch(`${baseUrl}/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: "https://portfolio.example",
      },
      body: JSON.stringify(validMessage),
    });

    assert.equal(response.status, 202);
    assert.deepEqual(await response.json(), { ok: true });
    assert.equal(response.headers.get("access-control-allow-origin"), "https://portfolio.example");
    assert.deepEqual(delivered, validMessage);
  });
});

test("rejects invalid inputs and honeypot submissions without sending email", async () => {
  let sendCount = 0;
  await withApi({
    emailConfigured: true,
    logger: quietLogger,
    sendEmail: async () => { sendCount += 1; },
  }, async (baseUrl) => {
    const invalidRequests = [
      { ...validMessage, name: " " },
      { ...validMessage, email: "not-an-email" },
      { ...validMessage, message: "short" },
      { ...validMessage, website: "bot-filled-this" },
    ];

    for (const body of invalidRequests) {
      const response = await fetch(`${baseUrl}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      assert.equal(response.status, 400);
      assert.equal((await response.json()).ok, false);
    }

    assert.equal(sendCount, 0);
  });
});

test("reports missing provider configuration without claiming success", async () => {
  await withApi({ logger: quietLogger }, async (baseUrl) => {
    const response = await fetch(`${baseUrl}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validMessage),
    });

    assert.equal(response.status, 503);
    assert.equal((await response.json()).ok, false);
  });
});

test("does not expose provider errors and does not claim a failed delivery", async () => {
  const logged = [];
  await withApi({
    emailConfigured: true,
    logger: { error: (...args) => logged.push(args) },
    sendEmail: async () => { throw new Error("provider secret detail"); },
  }, async (baseUrl) => {
    const response = await fetch(`${baseUrl}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validMessage),
    });
    const result = await response.json();

    assert.equal(response.status, 502);
    assert.equal(result.ok, false);
    assert.equal(JSON.stringify(result).includes("provider secret detail"), false);
    assert.deepEqual(logged, [["Contact email delivery failed:", "Error"]]);
  });
});

test("limits JSON body size and rejects unapproved origins", async () => {
  await withApi({
    allowedOrigins: ["https://portfolio.example"],
    emailConfigured: true,
    logger: quietLogger,
    sendEmail: async () => {},
  }, async (baseUrl) => {
    const corsResponse = await fetch(`${baseUrl}/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: "https://unexpected.example",
      },
      body: JSON.stringify(validMessage),
    });
    assert.equal(corsResponse.status, 403);

    const largeBodyResponse = await fetch(`${baseUrl}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...validMessage, message: "x".repeat(25000) }),
    });
    assert.equal(largeBodyResponse.status, 413);
  });
});

test("rate limits repeated contact requests", async () => {
  let sendCount = 0;
  await withApi({
    emailConfigured: true,
    logger: quietLogger,
    sendEmail: async () => { sendCount += 1; },
  }, async (baseUrl) => {
    const responses = [];
    for (let requestNumber = 0; requestNumber < 6; requestNumber += 1) {
      responses.push(await fetch(`${baseUrl}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validMessage),
      }));
    }

    assert.equal(responses.slice(0, 5).every((response) => response.status === 202), true);
    assert.equal(responses[5].status, 429);
    assert.equal(sendCount, 5);
  });
});

test("configures a Resend sender only when credentials and addresses are present", () => {
  const missing = createEmailSender({ apiKey: "", from: "", to: "" });
  const configured = createEmailSender({
    apiKey: "re_example_test_key",
    from: "Portfolio <contact@example.com>",
    to: "owner@example.com",
  });

  assert.equal(missing.configured, false);
  assert.equal(configured.configured, true);
});

test("uses the visitor address as reply-to and rejects provider errors", async () => {
  let providerPayload;
  const sender = createEmailSender({
    apiKey: "re_example_test_key",
    from: "Portfolio <contact@example.com>",
    to: "owner@example.com",
    providerClient: {
      emails: {
        send: async (payload) => {
          providerPayload = payload;
          return { data: { id: "mock-accepted-message" }, error: null };
        },
      },
    },
  });

  await sender.send(validMessage);
  assert.equal(providerPayload.replyTo, validMessage.email);
  assert.equal(providerPayload.to, "owner@example.com");
  assert.equal(providerPayload.from, "Portfolio <contact@example.com>");
  assert.match(providerPayload.text, /Hola, quisiera conversar sobre una oportunidad/u);

  const rejectedSender = createEmailSender({
    apiKey: "re_example_test_key",
    from: "Portfolio <contact@example.com>",
    to: "owner@example.com",
    providerClient: {
      emails: {
        send: async () => ({ data: null, error: { message: "mock provider rejection" } }),
      },
    },
  });

  await assert.rejects(rejectedSender.send(validMessage), /did not accept the message/u);
});
