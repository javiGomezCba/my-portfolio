import { useEffect, useState } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const updateScrollState = () => setIsScrolled(window.scrollY > 16);

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollState);
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
          <img src="/icono-N.svg" alt="" />
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
          <a href="#sobremi" onClick={closeMenu}>Sobre mí</a>
          <a href="#proyectos" onClick={closeMenu}>Proyectos</a>
          <a href="#habilidades" onClick={closeMenu}>Habilidades</a>
          <a href="#contacto" onClick={closeMenu}>Contacto</a>
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
