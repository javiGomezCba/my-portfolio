import { useEffect, useState } from "react";
import "./ScrollRail.css";

const sections = [
  { id: "sobremi", label: "Sobre mí", icon: "profile" },
  { id: "proyectos", label: "Proyectos", icon: "projects" },
  { id: "habilidades", label: "Habilidades", icon: "code" },
  { id: "contacto", label: "Contacto", icon: "mail" },
];

function SectionIcon({ name }) {
  const sharedProps = {
    "aria-hidden": true,
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 1.6,
    viewBox: "0 0 24 24",
  };

  switch (name) {
    case "profile":
      return (
        <svg {...sharedProps}>
          <circle cx="12" cy="8" r="3.5" />
          <path d="M4.5 20c.8-4 3.3-6 7.5-6s6.7 2 7.5 6" />
        </svg>
      );
    case "projects":
      return (
        <svg {...sharedProps}>
          <rect x="4" y="4" width="7" height="7" rx="1" />
          <rect x="13" y="4" width="7" height="7" rx="1" />
          <rect x="4" y="13" width="7" height="7" rx="1" />
          <rect x="13" y="13" width="7" height="7" rx="1" />
        </svg>
      );
    case "code":
      return (
        <svg {...sharedProps}>
          <path d="m8 6-5 6 5 6m8-12 5 6-5 6m-2-14-4 16" />
        </svg>
      );
    case "mail":
      return (
        <svg {...sharedProps}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m4 7 8 6 8-6" />
        </svg>
      );
    default:
      return null;
  }
}

export default function ScrollRail() {
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    let observer;
    let revealObserver;
    let returningHome = false;
    let visibleSections = new Set();
    const sectionElements = sections
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean);

    const showHomeState = () => {
      visibleSections.clear();
      setActiveIndex(-1);
    };

    const handleScroll = () => {
      if (window.scrollY <= 16) {
        returningHome = false;
        showHomeState();
      } else {
        if (returningHome && window.location.hash !== "#inicio") {
          returningHome = false;
        }

        if (!returningHome && visibleSections.size === 0) {
          setActiveIndex(-1);
        }
      }
    };

    const handleDocumentClick = (event) => {
      if (!(event.target instanceof Element)) return;

      if (event.target.closest('a[href="#inicio"]')) {
        returningHome = window.scrollY > 16;
        showHomeState();
      }
    };

    const handleHashChange = () => {
      if (window.location.hash === "#inicio") {
        returningHome = window.scrollY > 16;
        showHomeState();
      } else {
        returningHome = false;
      }
    };

    const observeSections = () => {
      observer?.disconnect();
      visibleSections = new Set();

      const activationInset = Math.round(window.innerHeight * 0.4);
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              visibleSections.add(entry.target);
            } else {
              visibleSections.delete(entry.target);
            }
          });

          if (window.scrollY <= 16 || (returningHome && window.location.hash === "#inicio")) {
            showHomeState();
            return;
          }

          if (visibleSections.size === 0) {
            setActiveIndex(-1);
            return;
          }

          const viewportCenter = window.innerHeight / 2;
          const currentSection = [...visibleSections].reduce((closest, section) => {
            const sectionCenter = section.getBoundingClientRect().top
              + section.getBoundingClientRect().height / 2;
            const closestCenter = closest.getBoundingClientRect().top
              + closest.getBoundingClientRect().height / 2;

            return Math.abs(sectionCenter - viewportCenter)
              < Math.abs(closestCenter - viewportCenter)
              ? section
              : closest;
          });
          const nextIndex = sectionElements.indexOf(currentSection);

          setActiveIndex((currentIndex) => (
            currentIndex === nextIndex ? currentIndex : nextIndex
          ));
        },
        {
          rootMargin: `-${activationInset}px 0px -${activationInset}px 0px`,
          threshold: 0,
        },
      );

      sectionElements.forEach((section) => observer.observe(section));
    };

    observeSections();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", observeSections);
    window.addEventListener("hashchange", handleHashChange);
    document.addEventListener("click", handleDocumentClick);

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      sectionElements.forEach((section) => section.classList.add("scroll-section-reveal"));
      revealObserver = new IntersectionObserver(
        (entries, currentObserver) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            entry.target.classList.add("scroll-section-revealed");
            currentObserver.unobserve(entry.target);
          });
        },
        { rootMargin: "0px 0px -12% 0px", threshold: 0 },
      );
      sectionElements.forEach((section) => revealObserver.observe(section));
    }

    return () => {
      observer?.disconnect();
      revealObserver?.disconnect();
      sectionElements.forEach((section) => {
        section.classList.remove("scroll-section-reveal", "scroll-section-revealed");
      });
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", observeSections);
      window.removeEventListener("hashchange", handleHashChange);
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  return (
    <nav className="scroll-rail" aria-label="Navegación por secciones">
      <span
        aria-hidden="true"
        className={`scroll-rail-progress scroll-rail-progress-${Math.max(activeIndex, 0)}`}
      />
      <ul>
        {sections.map(({ id, label, icon }, index) => (
          <li key={id}>
            <a
              aria-current={activeIndex === index ? "location" : undefined}
              aria-label={`Ir a ${label}`}
              className={`scroll-rail-link${activeIndex === index ? " is-active" : ""}`}
              href={`#${id}`}
            >
              <SectionIcon name={icon} />
              <span aria-hidden="true" className="scroll-rail-tooltip">{label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
