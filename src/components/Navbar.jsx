import { useEffect, useState } from "react";
import "./Navbar.css";

const sectionIds = ["inicio", "sobremi", "proyectos", "habilidades", "contacto"];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");

  useEffect(() => {
    const updateScrollState = () => setIsScrolled(window.scrollY > 16);

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    let observer;
    let visibleSections = new Set();

    const observeSections = () => {
      observer?.disconnect();
      visibleSections = new Set();
      const activationInset = Math.round(window.innerHeight * 0.4);
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
          if (entry.isIntersecting) visibleSections.add(entry.target);
          else visibleSections.delete(entry.target);
          });

          if (window.scrollY <= 16) {
          setActiveSection("inicio");
          return;
          }

          const candidates = [...visibleSections];
          if (candidates.length === 0) return;

          const viewportCenter = window.innerHeight / 2;
          const currentSection = candidates.reduce((closest, section) => {
          const sectionCenter = section.getBoundingClientRect().top
            + section.getBoundingClientRect().height / 2;
          const closestCenter = closest.getBoundingClientRect().top
            + closest.getBoundingClientRect().height / 2;
          return Math.abs(sectionCenter - viewportCenter)
            < Math.abs(closestCenter - viewportCenter)
            ? section
            : closest;
          });

          setActiveSection((current) => (
          current === currentSection.id ? current : currentSection.id
          ));
        },
        {
          rootMargin: `-${activationInset}px 0px -${activationInset}px 0px`,
          threshold: 0,
        },
      );

      sections.forEach((section) => observer.observe(section));
    };

    observeSections();
    window.addEventListener("resize", observeSections);
    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", observeSections);
    };
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return undefined;

    const closeOnEscape = (event) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={`navbar${isScrolled ? " navbar-scrolled" : ""}`}>
      <nav className="navbar-inner" aria-label="Navegación principal">
        <a href="#inicio" className="navbar-logo" aria-label="Ir al inicio" onClick={closeMenu}>
          <span aria-hidden="true" className="navbar-logo-wordmark">
            <span>Nic</span><span className="navbar-logo-period">.</span>
          </span>
        </a>
        <button
          aria-controls="navbar-links"
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          className={`navbar-toggle${isMenuOpen ? " is-open" : ""}`}
          onClick={() => setIsMenuOpen((open) => !open)}
          type="button"
        >
          <span />
          <span />
        </button>
        <div
          className={`navbar-links${isMenuOpen ? " navbar-links-open" : ""}`}
          id="navbar-links"
        >
          <a aria-current={activeSection === "inicio" ? "location" : undefined} href="#inicio" onClick={closeMenu}>Inicio</a>
          <a aria-current={activeSection === "sobremi" ? "location" : undefined} href="#sobremi" onClick={closeMenu}>Sobre mí</a>
          <a aria-current={activeSection === "proyectos" ? "location" : undefined} href="#proyectos" onClick={closeMenu}>Proyectos</a>
          <a aria-current={activeSection === "habilidades" ? "location" : undefined} href="#habilidades" onClick={closeMenu}>Habilidades</a>
          <a aria-current={activeSection === "contacto" ? "location" : undefined} href="#contacto" onClick={closeMenu}>Contacto</a>
          <a
            className="navbar-cv"
            download="Nicolas-Gomez-CV.pdf"
            href="/CV_Nicolas.pdf"
          >
            Descargar CV
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
