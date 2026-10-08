import portfolioData from "../data/portfolioData";
import "./Habilidades.css";

function SkillIcon({ name }) {
  const sharedProps = {
    "aria-hidden": true,
    className: `skill-icon skill-icon-${name}`,
    fill: "none",
    viewBox: "0 0 32 32",
  };

  switch (name) {
    case "react":
      return (
        <svg {...sharedProps}>
          <circle cx="16" cy="16" r="2.4" fill="currentColor" />
          <ellipse cx="16" cy="16" rx="13" ry="5" stroke="currentColor" strokeWidth="1.7" />
          <ellipse cx="16" cy="16" rx="13" ry="5" stroke="currentColor" strokeWidth="1.7" transform="rotate(60 16 16)" />
          <ellipse cx="16" cy="16" rx="13" ry="5" stroke="currentColor" strokeWidth="1.7" transform="rotate(120 16 16)" />
        </svg>
      );
    case "next":
      return (
        <svg {...sharedProps}>
          <circle cx="16" cy="16" r="13" stroke="currentColor" strokeWidth="1.6" />
          <path d="M10 22V10l12 13M18 10v6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </svg>
      );
    case "typescript":
      return (
        <svg {...sharedProps}>
          <rect x="3" y="3" width="26" height="26" rx="3" fill="currentColor" />
          <path d="M6.5 13h11m-5.5 0v12m8-1c.8.7 1.6 1 2.6 1 1.5 0 2.5-.8 2.5-2s-1-1.7-2.5-2.2-2.4-1-2.4-2.3 1-2.1 2.5-2.1c.9 0 1.7.3 2.4.8" stroke="var(--background)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
        </svg>
      );
    case "javascript":
      return (
        <svg {...sharedProps}>
          <rect x="3" y="3" width="26" height="26" rx="3" fill="currentColor" />
          <path d="M14 11v10.5c0 2-1 3-3 3-1.1 0-2-.4-2.8-1.2m12.3 0c.8.8 1.8 1.2 3 1.2 1.8 0 3-.9 3-2.3 0-1.2-.8-1.8-2.6-2.5-1.7-.7-2.5-1.2-2.5-2.5 0-1.4 1.1-2.3 2.7-2.3 1 0 1.8.3 2.5.9" stroke="var(--background)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
        </svg>
      );
    case "html":
    case "css":
      return (
        <svg {...sharedProps}>
          <path d="m6 4 1.8 21L16 28l8.2-3L26 4H6Z" fill="currentColor" />
          <path d={name === "html"
            ? "M11 10h10l-.4 3.5h-6.1l.2 2h5.7l-.7 6.2-3.7 1.1-3.7-1.1-.2-2.7h3.1l.1.8.7.2.7-.2.2-1.3h-5.8L10.5 10Z"
            : "M10 10h12l-.4 3.5h-8l.2 2h7.5l-.7 6.2-4.6 1.1-4.2-1.1-.3-3h3.1l.1 1 .9.2.9-.2.2-1.5h-7.4L10 10Z"} fill="var(--background)" />
        </svg>
      );
    case "vite":
      return (
        <svg {...sharedProps}>
          <path d="m3 6 13 23L29 6l-10 2 1-6-8 2-9 2Z" fill="currentColor" />
          <path d="m18 3-7 14h5l-2 8 8-14h-5l1-8Z" fill="var(--background)" />
        </svg>
      );
    case "node":
      return (
        <svg {...sharedProps}>
          <path d="m16 3 11 6.3v13L16 29 5 22.3v-13L16 3Z" stroke="currentColor" strokeWidth="1.7" />
          <text x="16" y="18.4" fill="currentColor" fontSize="7" fontWeight="700" textAnchor="middle">node</text>
          <text x="16" y="23" fill="currentColor" fontSize="4.5" textAnchor="middle">.js</text>
        </svg>
      );
    case "express":
      return (
        <svg {...sharedProps}>
          <path d="M6 8h20M6 16h15M6 24h20" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
          <circle cx="25" cy="16" r="3" fill="var(--background)" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case "rest":
      return (
        <svg {...sharedProps}>
          <path d="m11 9-6 7 6 7m10-14 6 7-6 7m-2-16-6 18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
        </svg>
      );
    case "git":
      return (
        <svg {...sharedProps}>
          <path d="m16 3 13 13-13 13L3 16 16 3Z" fill="currentColor" />
          <path d="M12 11v10m0-6c0-3 7-2 7-5m-7 10c0-3 7-2 7-5" stroke="var(--background)" strokeLinecap="round" strokeWidth="1.5" />
          <circle cx="12" cy="11" r="1.6" fill="var(--background)" />
          <circle cx="12" cy="21" r="1.6" fill="var(--background)" />
          <circle cx="19" cy="10" r="1.6" fill="var(--background)" />
          <circle cx="19" cy="17" r="1.6" fill="var(--background)" />
        </svg>
      );
    case "github":
      return (
        <svg {...sharedProps}>
          <path d="M16 3a13 13 0 0 0-4.1 25.3c.7.1.9-.3.9-.7v-2.5c-3.7.8-4.5-1.6-4.5-1.6-.6-1.5-1.5-1.9-1.5-1.9-1.2-.8.1-.8.1-.8 1.3.1 2 1.4 2 1.4 1.2 2 3 1.4 3.8 1.1.1-.9.5-1.4.9-1.8-3-.3-6.2-1.5-6.2-6.6 0-1.5.5-2.7 1.4-3.7-.1-.4-.6-1.8.1-3.7 0 0 1.1-.4 3.8 1.4a13 13 0 0 1 6.9 0c2.6-1.8 3.8-1.4 3.8-1.4.7 1.9.3 3.3.1 3.7.9 1 1.4 2.2 1.4 3.7 0 5.1-3.2 6.3-6.2 6.6.5.4.9 1.2.9 2.4v3.6c0 .4.2.8.9.7A13 13 0 0 0 16 3Z" fill="currentColor" />
        </svg>
      );
    case "jira":
      return (
        <svg {...sharedProps}>
          <path d="M16 3 28 15 16 27 4 15 16 3Z" fill="currentColor" />
          <path d="m16 8 7 7-7 7-7-7 7-7Z" fill="var(--background)" />
          <path d="m16 12 3 3-3 3-3-3 3-3Z" fill="currentColor" />
        </svg>
      );
    case "eslint":
      return (
        <svg {...sharedProps}>
          <path d="m16 3 12 7v12l-12 7-12-7V10l12-7Z" stroke="currentColor" strokeWidth="1.7" />
          <path d="M21 11h-7a3 3 0 0 0 0 6h4a3 3 0 0 1 0 6h-7" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
        </svg>
      );
    case "prettier":
      return (
        <svg {...sharedProps}>
          <path d="M7 7h17M7 12h11M7 17h17M7 22h11" stroke="currentColor" strokeLinecap="round" strokeWidth="2.2" />
          <circle cx="4" cy="7" r="1" fill="currentColor" />
          <circle cx="4" cy="12" r="1" fill="currentColor" />
          <circle cx="4" cy="17" r="1" fill="currentColor" />
          <circle cx="4" cy="22" r="1" fill="currentColor" />
        </svg>
      );
    case "ai":
      return (
        <svg {...sharedProps}>
          <path d="M16 4v5m0 14v5M4 16h5m14 0h5M7.5 7.5l3.6 3.6m9.8 9.8 3.6 3.6m0-17-3.6 3.6m-9.8 9.8-3.6 3.6" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
          <circle cx="16" cy="16" r="4.5" stroke="currentColor" strokeWidth="1.7" />
        </svg>
      );
    default:
      return null;
  }
}

export default function Habilidades() {
  return (
    <section id="habilidades" className="section skills-section" aria-labelledby="skills-title">
      <header className="section-heading skills-heading">
        <div>
          <p className="eyebrow">03 — Cómo construyo</p>
          <h2 id="skills-title">Habilidades</h2>
        </div>
        <p className="skills-intro">
          Tecnologías y prácticas que uso para desarrollar, integrar y mantener aplicaciones web.
        </p>
      </header>
      <div className="skills-grid">
        {portfolioData.skills.map((group, index) => (
          <article
            className={`skill-group skill-group-${group.id}`}
            key={group.id}
            aria-labelledby={`skill-group-${group.id}`}
          >
            <header className="skill-group-header">
              <p className="skill-group-number">0{index + 1} <span>/ 04</span></p>
              <h3 id={`skill-group-${group.id}`}>{group.category}</h3>
              <p className="skill-group-description">{group.description}</p>
            </header>
            {group.id === "practices" ? (
              <ul className="practice-list" aria-label="Prácticas y capacidades técnicas">
                {group.technologies.map((practice, practiceIndex) => (
                  <li key={practice}>
                    <span aria-hidden="true">0{practiceIndex + 1}</span>
                    <span>{practice}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="skill-list" aria-label={`Tecnologías de ${group.category}`}>
                {group.technologies.map((technology) => (
                  <li className="skill-item" key={technology.name}>
                    <SkillIcon name={technology.icon} />
                    <span>{technology.name}</span>
                  </li>
                ))}
              </ul>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
