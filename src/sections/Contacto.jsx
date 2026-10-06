import { useState } from "react";

const initialForm = { name: "", email: "", message: "", website: "" };
const contactApiUrl = import.meta.env.VITE_CONTACT_API_URL || "/api/contact";

export default function Contacto() {
  const [form, setForm] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((currentForm) => ({ ...currentForm, [name]: value }));
    if (status.message) setStatus({ type: "", message: "" });
  };

  const submitForm = async (event) => {
    event.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setStatus({ type: "loading", message: "Enviando tu mensaje..." });

    try {
      const response = await fetch(contactApiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = await response.json().catch(() => null);

      if (!response.ok || result?.ok !== true) {
        setStatus({
          type: "error",
          message: result?.message || "No pudimos enviar el mensaje. Inténtalo nuevamente.",
        });
        return;
      }

      setForm(initialForm);
      setStatus({ type: "success", message: "Mensaje enviado. Gracias por escribirme." });
    } catch {
      setStatus({
        type: "error",
        message: "No se pudo conectar con el servicio. Conservé tu mensaje; inténtalo nuevamente.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contacto" className="section contact-section" aria-labelledby="contact-title">
      <div className="contact-copy">
        <p className="eyebrow">04 — Contacto</p>
        <h2 id="contact-title"><span>Contacto</span></h2>
        <p>Estoy disponible para conversar sobre oportunidades laborales y proyectos.</p>
        <div className="contact-options">
          <p className="contact-links-label">También podés encontrarme en</p>
          <nav className="contact-socials" aria-label="Contacto y perfiles">
            <a aria-label="Email" href="mailto:jngomezcordoba@gmail.com">
              <i aria-hidden="true" className="fa-regular fa-envelope" />
            </a>
            <a
              aria-label="LinkedIn"
              href="https://www.linkedin.com/in/nicolas-gomez-cordoba/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <i aria-hidden="true" className="fa-brands fa-linkedin-in" />
            </a>
            <a
              aria-label="GitHub"
              href="https://github.com/javiGomezCba"
              rel="noopener noreferrer"
              target="_blank"
            >
              <i aria-hidden="true" className="fa-brands fa-github" />
            </a>
          </nav>
          <p className="contact-location">Córdoba, Argentina</p>
        </div>
      </div>
      <form aria-busy={isSubmitting} className="contact-form" onSubmit={submitForm}>
        <div className="contact-form-fields">
          <div className="contact-field">
            <label htmlFor="contact-name">Nombre</label>
            <input
              autoComplete="name"
              disabled={isSubmitting}
              id="contact-name"
              maxLength={100}
              minLength={2}
              name="name"
              onChange={updateField}
              required
              value={form.name}
            />
          </div>
          <div className="contact-field">
            <label htmlFor="contact-email">Email</label>
            <input
              autoComplete="email"
              disabled={isSubmitting}
              id="contact-email"
              maxLength={254}
              name="email"
              onChange={updateField}
              required
              type="email"
              value={form.email}
            />
          </div>
          <div className="contact-field contact-field-message">
            <label htmlFor="contact-message">Mensaje</label>
            <textarea
              id="contact-message"
              disabled={isSubmitting}
              maxLength={5000}
              minLength={10}
              name="message"
              onChange={updateField}
              required
              rows={5}
              value={form.message}
            />
          </div>
        </div>
        <div className="contact-honeypot" aria-hidden="true">
          <label htmlFor="contact-website">Dejá este campo vacío</label>
          <input
            autoComplete="off"
            id="contact-website"
            name="website"
            onChange={updateField}
            tabIndex={-1}
            value={form.website}
          />
        </div>
        <div className="contact-form-footer">
          <button className="button button-primary contact-submit" disabled={isSubmitting} type="submit">
            {isSubmitting ? "Enviando..." : "Enviar mensaje"}
            {!isSubmitting && <span aria-hidden="true">↗</span>}
          </button>
          <p
            aria-live={status.type === "error" ? "assertive" : "polite"}
            className={`contact-form-status${status.type ? ` is-${status.type}` : ""}`}
            role={status.type === "error" ? "alert" : "status"}
          >
            {status.message}
          </p>
        </div>
      </form>
    </section>
  );
}
