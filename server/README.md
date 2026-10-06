# Contact API

The contact form uses the Resend API from this Node.js/Express service. The API key, sender address, and recipient address stay on the server; no email is sent by local tests.

## Local setup

1. Keep real credentials only in `.env` at the project root. `.env.example` is a placeholder template and must never contain API keys.
2. For local development, keep `NODE_ENV=development` and the two Vite origins in `FRONTEND_ORIGINS`.
3. Set `RESEND_API_KEY`, `EMAIL_FROM`, and `EMAIL_TO` in `.env` after configuring Resend (see below).
4. In separate terminals, run `npm run server` and `npm run dev`. Vite proxies `/api` requests to Express on port 3001. Set `PORT` if the backend needs a different port and update the Vite proxy target accordingly.
5. Run the API tests with `npm run test:server`.

Without valid mail settings, the API starts but responds with HTTP 503 to valid form submissions. This is intentional: the frontend must not show a successful send unless the email provider accepts the message.

## Resend setup

1. Create a Resend account and an API key with permission to send email. Keep it only in the server environment as `RESEND_API_KEY`.
2. Add and verify a domain in Resend. Publish the DNS records Resend provides (typically SPF and DKIM; configure DMARC according to your domain policy).
3. Set `EMAIL_FROM` to a sender address on that verified domain, for example `Portfolio <contact@your-domain.example>`.
4. Set `EMAIL_TO` to the mailbox where portfolio messages should arrive. The current direct-contact address shown in the portfolio is `jngomezcordoba@gmail.com`; set `EMAIL_TO` to that address if it is still the intended destination. The recipient is configured only in this backend.
5. The visitor's validated address is sent as `replyTo`; the provider's delivery response must include an accepted message ID before the API returns success.

Resend may restrict sending to verified recipients while an account/domain is still in test mode. Complete its verification and account requirements before expecting delivery to your inbox. No live message is sent by the automated tests.

## Production deployment

- Deploy the Node service to a platform that supports a persistent Express process. It listens on `process.env.PORT` (default 3001).
- Configure `NODE_ENV=production`, `FRONTEND_ORIGINS` as a comma-separated exact list of trusted frontend origins, `RESEND_API_KEY`, `EMAIL_FROM`, and `EMAIL_TO` in the backend's secret/environment settings. Do not include a wildcard origin.
- If the platform is behind a known reverse proxy, set `TRUST_PROXY_HOPS` to the platform's documented proxy hop count so rate limiting can use client IPs correctly.
- Serve the frontend over HTTPS and route `/api/*` to the backend through the hosting provider/reverse proxy. If the frontend and backend use separate hostnames without a frontend rewrite, set the public frontend build variable `VITE_CONTACT_API_URL` to the full API endpoint (for example, `https://api.your-domain.example/api/contact`) and include the exact frontend origin in `FRONTEND_ORIGINS`. This variable is a public URL only; never put credentials, sender details, or the destination address in any `VITE_*` variable.
- Verify DNS, HTTPS, allowed-origin behavior, and the provider's sender/domain verification in the deployed environment. Automated tests use a mock sender and do not prove production delivery.
