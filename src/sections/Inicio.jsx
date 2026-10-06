import { useEffect, useRef } from "react";
import portfolioData from "../data/portfolioData";

export default function Inicio() {
  const heroRef = useRef(null);
  const primaryCtaRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    const primaryCta = primaryCtaRef.current;
    if (!hero || !primaryCta) return undefined;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let targetX = 50;
    let targetY = 50;
    let currentX = 50;
    let currentY = 50;
    let animationFrame = null;

    const updateGrid = () => {
      animationFrame = null;

      if (reducedMotion.matches) {
        hero.style.setProperty("--hero-glow-opacity", "0");
        targetX = 50;
        targetY = 50;
      }

      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;
      hero.style.setProperty("--hero-pointer-x", `${currentX}%`);
      hero.style.setProperty("--hero-pointer-y", `${currentY}%`);

      if (Math.abs(targetX - currentX) > 0.1 || Math.abs(targetY - currentY) > 0.1) {
        animationFrame = window.requestAnimationFrame(updateGrid);
      }
    };

    const handleHeroPointerMove = (event) => {
      if (event.pointerType === "touch" || reducedMotion.matches) return;
      const bounds = hero.getBoundingClientRect();
      targetX = ((event.clientX - bounds.left) / bounds.width) * 100;
      targetY = ((event.clientY - bounds.top) / bounds.height) * 100;
      hero.style.setProperty("--hero-glow-opacity", "1");

      if (animationFrame === null) {
        animationFrame = window.requestAnimationFrame(updateGrid);
      }
    };

    const resetGrid = () => {
      targetX = 50;
      targetY = 50;
      hero.style.setProperty("--hero-glow-opacity", "0");

      if (animationFrame === null) {
        animationFrame = window.requestAnimationFrame(updateGrid);
      }
    };

    const handleCtaPointerMove = (event) => {
      if (event.pointerType === "touch" || reducedMotion.matches) return;

      const bounds = primaryCta.getBoundingClientRect();
      const deltaX = event.clientX - (bounds.left + bounds.width / 2);
      const deltaY = event.clientY - (bounds.top + bounds.height / 2);
      const distance = Math.hypot(deltaX, deltaY);
      const radius = 64;

      if (distance >= radius) {
        primaryCta.style.setProperty("--hero-magnetic-x", "0px");
        primaryCta.style.setProperty("--hero-magnetic-y", "0px");
        return;
      }

      const influence = (1 - distance / radius) * 0.35;
      const offsetX = Math.max(-6, Math.min(6, deltaX * influence));
      const offsetY = Math.max(-6, Math.min(6, deltaY * influence));
      primaryCta.style.setProperty("--hero-magnetic-x", `${offsetX}px`);
      primaryCta.style.setProperty("--hero-magnetic-y", `${offsetY}px`);
    };

    const resetCta = () => {
      primaryCta.style.setProperty("--hero-magnetic-x", "0px");
      primaryCta.style.setProperty("--hero-magnetic-y", "0px");
    };

    const handleMotionPreferenceChange = () => {
      if (!reducedMotion.matches) return;

      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame);
        animationFrame = null;
      }
      targetX = 50;
      targetY = 50;
      currentX = 50;
      currentY = 50;
      hero.style.setProperty("--hero-pointer-x", "50%");
      hero.style.setProperty("--hero-pointer-y", "50%");
      hero.style.setProperty("--hero-glow-opacity", "0");
      resetCta();
    };

    hero.addEventListener("pointermove", handleHeroPointerMove);
    hero.addEventListener("pointerleave", resetGrid);
    primaryCta.addEventListener("pointermove", handleCtaPointerMove);
    primaryCta.addEventListener("pointerleave", resetCta);
    primaryCta.addEventListener("pointercancel", resetCta);
    primaryCta.addEventListener("blur", resetCta);
    reducedMotion.addEventListener("change", handleMotionPreferenceChange);

    return () => {
      hero.removeEventListener("pointermove", handleHeroPointerMove);
      hero.removeEventListener("pointerleave", resetGrid);
      primaryCta.removeEventListener("pointermove", handleCtaPointerMove);
      primaryCta.removeEventListener("pointerleave", resetCta);
      primaryCta.removeEventListener("pointercancel", resetCta);
      primaryCta.removeEventListener("blur", resetCta);
      reducedMotion.removeEventListener("change", handleMotionPreferenceChange);
      if (animationFrame !== null) window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <section id="inicio" className="hero section" aria-labelledby="hero-title" ref={heroRef}>
      <div className="hero-content">
        <p className="hero-name hero-reveal" style={{ "--hero-reveal-delay": "0ms" }}>
          {portfolioData.personal.name}
        </p>
        <h1 className="hero-reveal" id="hero-title" style={{ "--hero-reveal-delay": "65ms" }}>
          <span>Frontend</span>
          <span>Developer</span>
        </h1>
        <p className="hero-copy hero-reveal" style={{ "--hero-reveal-delay": "130ms" }}>
          Desarrollo aplicaciones web con foco en frontend, integrando interfaces,
          lógica de aplicación y servicios para construir productos funcionales y
          mantenibles.
        </p>
        <div className="hero-actions">
          <a
            className="button button-primary hero-projects-cta hero-reveal"
            href="#proyectos"
            ref={primaryCtaRef}
            style={{ "--hero-reveal-delay": "195ms" }}
          >
            Ver proyectos <span aria-hidden="true">↗</span>
          </a>
          <a
            className="button button-ghost hero-reveal"
            href="#contacto"
            style={{ "--hero-reveal-delay": "260ms" }}
          >
            Hablemos <span aria-hidden="true">→</span>
          </a>
        </div>
        <a
          className="hero-cv-link hero-reveal"
          download="Nicolas-Gomez-CV.pdf"
          href="/CV_Nicolas.pdf"
          style={{ "--hero-reveal-delay": "325ms" }}
        >
          <svg aria-hidden="true" fill="none" viewBox="0 0 16 16">
            <path d="M8 1.75v8.5m0 0 3-3m-3 3-3-3M2.75 10.5v2.75h10.5V10.5" />
          </svg>
          <span>Descargar CV</span>
        </a>
        <div className="hero-meta">
          <p className="hero-availability hero-reveal" style={{ "--hero-reveal-delay": "390ms" }}>
            <span className="status-dot" aria-hidden="true" />
            {portfolioData.personal.availability}
          </p>
          <p className="hero-location hero-reveal" style={{ "--hero-reveal-delay": "455ms" }}>
            {portfolioData.personal.location}
          </p>
        </div>
      </div>
    </section>
  );
}
