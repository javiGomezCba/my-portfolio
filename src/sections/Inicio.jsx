import { useEffect, useRef, useState } from "react";
import portfolioData from "../data/portfolioData";

const roleTitles = [
  "Desarrollo frontend",
  "Interfaces con React",
  "Diseño de interfaces",
  "Integración de servicios",
];

export default function Inicio() {
  const heroRef = useRef(null);
  const primaryCtaRef = useRef(null);
  const [typedTitle, setTypedTitle] = useState(roleTitles[0]);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let roleIndex = 0;
    let characterIndex = roleTitles[0].length;
    let deleting = true;
    let timeoutId;

    const animateTitle = () => {
      if (reducedMotion.matches) {
        setTypedTitle(roleTitles[0]);
        return;
      }

      const currentTitle = roleTitles[roleIndex];
      if (deleting) {
        characterIndex = Math.max(0, characterIndex - 1);
        setTypedTitle(currentTitle.slice(0, characterIndex));

        if (characterIndex === 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % roleTitles.length;
          timeoutId = window.setTimeout(animateTitle, 420);
          return;
        }

        timeoutId = window.setTimeout(animateTitle, 42);
        return;
      }

      characterIndex = Math.min(currentTitle.length, characterIndex + 1);
      setTypedTitle(currentTitle.slice(0, characterIndex));
      if (characterIndex === currentTitle.length) {
        deleting = true;
        timeoutId = window.setTimeout(animateTitle, 1500);
        return;
      }

      timeoutId = window.setTimeout(animateTitle, 72);
    };

    const resetTitle = () => {
      window.clearTimeout(timeoutId);
      roleIndex = 0;
      characterIndex = roleTitles[0].length;
      deleting = true;
      setTypedTitle(roleTitles[0]);
      if (!reducedMotion.matches) {
        timeoutId = window.setTimeout(animateTitle, 1500);
      }
    };

    resetTitle();
    reducedMotion.addEventListener("change", resetTitle);
    return () => {
      window.clearTimeout(timeoutId);
      reducedMotion.removeEventListener("change", resetTitle);
    };
  }, []);

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
        <h1 className="hero-name hero-reveal" id="hero-title" style={{ "--hero-reveal-delay": "0ms" }}>
          {portfolioData.personal.name}
        </h1>
        <p className="hero-role hero-reveal" style={{ "--hero-reveal-delay": "65ms" }}>
          <span className="hero-role-accessible">Desarrollador frontend</span>
          <span aria-hidden="true" className="hero-role-typed">{typedTitle}</span>
        </p>
        <p className="hero-copy hero-reveal" style={{ "--hero-reveal-delay": "130ms" }}>
          Construyo interfaces web claras y las conecto con la lógica y los servicios
          que necesita cada producto.
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
        <nav className="hero-socials hero-reveal" aria-label="Perfiles sociales" style={{ "--hero-reveal-delay": "325ms" }}>
          <a aria-label="GitHub" href="https://github.com/javiGomezCba" rel="noopener noreferrer" target="_blank">
            <i aria-hidden="true" className="fa-brands fa-github" />
          </a>
          <a
            aria-label="LinkedIn"
            href="https://www.linkedin.com/in/nicolas-gomez-cordoba/"
            rel="noopener noreferrer"
            target="_blank"
          >
            <i aria-hidden="true" className="fa-brands fa-linkedin-in" />
          </a>
        </nav>
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
