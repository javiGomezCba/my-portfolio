import { Resend } from "resend";

export function createEmailSender({ apiKey, from, to, providerClient }) {
  const configured = Boolean(apiKey && from && to);
  const resend = configured ? providerClient ?? new Resend(apiKey) : null;

  return {
    configured,
    async send({ name, email, message }) {
      if (!resend) throw new Error("Email provider is not configured");

      const { data, error } = await resend.emails.send({
        from,
        to,
        replyTo: email,
        subject: `Portfolio: mensaje de ${name}`,
        text: `Nombre: ${name}\nEmail: ${email}\n\n${message}`,
      });

      if (error || !data?.id) {
        throw new Error("Email provider did not accept the message");
      }
    },
  };
}
