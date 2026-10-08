import { useEffect, useRef } from "react";
import portfolioData from "../data/portfolioData";
import "./Proyectos.css";

export default function Proyectos() {
  const projectsListRef = useRef(null);

  useEffect(() => {
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
      || !("IntersectionObserver" in window)
    ) {
      return undefined;
    }

    const projectElements = projectsListRef.current?.querySelectorAll("[data-project-reveal]");
    if (!projectElements?.length) return undefined;

    projectElements.forEach((project) => project.classList.add("project-reveal-ready"));

    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("project-revealed");
          currentObserver.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    projectElements.forEach((project) => observer.observe(project));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="proyectos" className="section projects-section" aria-labelledby="projects-title">
      <header className="section-heading projects-heading">
        <div>
          <p className="eyebrow">02 — Casos de desarrollo</p>
          <h2 id="projects-title">Proyectos</h2>
        </div>
        <p className="projects-intro">
          Interfaces, productos y decisiones técnicas detrás de cada proyecto.
        </p>
      </header>

      <div className="projects-list" ref={projectsListRef}>
        {portfolioData.projects.map((project, index) => (
          <article
            className={`project-case project-case--media-${project.mediaSide}`}
            key={project.id}
            aria-labelledby={`project-title-${project.id}`}
            data-project-reveal
          >
            <div className="project-copy">
              <header className="project-header">
                <p className="project-number">{project.number} <span>/ 03</span></p>
                <h3 id={`project-title-${project.id}`}>{project.title}</h3>
                <p className="project-subtitle">{project.subtitle}</p>
              </header>

              <p className="project-description">{project.description}</p>

              <dl className="project-details">
                <div>
                  <dt>Rol</dt>
                  <dd>{project.role}</dd>
                </div>
                <div>
                  <dt>Enfoque</dt>
                  <dd>{project.focus}</dd>
                </div>
                <div>
                  <dt>Tecnologías</dt>
                  <dd>{project.technologies.join(" · ")}</dd>
                </div>
              </dl>

              <section className="project-implementation" aria-labelledby={`implementation-${project.id}`}>
                <h4 id={`implementation-${project.id}`}>Implementación</h4>
                <ul>
                  {project.features.map((feature) => <li key={feature}>{feature}</li>)}
                </ul>
                <h4 className="project-decisions-heading">Decisiones técnicas</h4>
                <ul>
                  {project.technicalDecisions.map((decision) => <li key={decision}>{decision}</li>)}
                </ul>
              </section>

              <div className="project-links">
                <a
                  className="project-link project-link-primary"
                  href={project.demoUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Ver proyecto <span aria-hidden="true">↗</span>
                </a>
                <a
                  className="project-link"
                  href={project.repoUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Ver código <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>

            <a
              aria-label={`Abrir el proyecto ${project.title} en una pestaña nueva`}
              className="project-visual"
              href={project.demoUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              <img
                alt={project.imageAlt}
                decoding="async"
                loading={index === 0 ? "eager" : "lazy"}
                src={project.image}
              />
              <span className="project-visual-caption">
                <span>Vista del proyecto</span>
                <span aria-hidden="true">↗</span>
              </span>
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
