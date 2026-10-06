import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Inicio from "./sections/Inicio";
import SobreMi from "./sections/SobreMi";
import Proyectos from "./sections/Proyectos";
import Habilidades from "./sections/Habilidades";
import Contacto from "./sections/Contacto";
import ScrollRail from "./components/ScrollRail";
import "./index.css";

const headingAlignedSections = new Set(["sobremi", "proyectos", "habilidades"]);
const headingNavbarGap = 96;

export default function App() {
  useEffect(() => {
    const handleInternalNavigation = (event) => {
      if (
        event.defaultPrevented
        || event.button !== 0
        || event.metaKey
        || event.ctrlKey
        || event.shiftKey
        || event.altKey
        || !(event.target instanceof Element)
      ) {
        return;
      }

      const link = event.target.closest('a[href^="#"]');
      if (!link || link.target === "_blank" || link.hasAttribute("download")) return;

      const id = decodeURIComponent(link.getAttribute("href").slice(1));
      const target = document.getElementById(id);
      if (!target) return;

      event.preventDefault();
      navigateToSection(target);
    };

    document.addEventListener("click", handleInternalNavigation);
    window.addEventListener("popstate", cancelActiveScroll);

    return () => {
      document.removeEventListener("click", handleInternalNavigation);
      window.removeEventListener("popstate", cancelActiveScroll);
      cancelActiveScroll();
    };
  }, []);

  return (
    <>
      <Navbar />
      <ScrollRail />
      <Inicio />
      <SobreMi />
      <Proyectos />
      <Habilidades />
      <Contacto />
      <Footer />
    </>
  );
}

let activeScrollFrame = null;
let activeScrollCleanup = null;

function navigateToSection(target) {
  cancelActiveScroll();

  const hash = `#${encodeURIComponent(target.id)}`;
  if (window.location.hash !== hash) {
    window.history.pushState(null, "", hash);
  }

  const rootStyle = window.getComputedStyle(document.documentElement);
  const scrollPadding = Number.parseFloat(rootStyle.scrollPaddingTop) || 0;
  const targetStyle = window.getComputedStyle(target);
  const scrollMargin = Number.parseFloat(targetStyle.scrollMarginTop) || 0;
  const sectionHeading = headingAlignedSections.has(target.id)
    ? target.querySelector("h2")
    : null;
  const navbarBottom = document.querySelector(".navbar")?.getBoundingClientRect().bottom ?? 0;
  const targetTop = sectionHeading
    ? getDocumentTop(sectionHeading) - navbarBottom - headingNavbarGap
    : getDocumentTop(target) - scrollPadding - scrollMargin;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const destination = Math.max(0, Math.min(targetTop, maxScroll));
  const start = window.scrollY;
  const distance = destination - start;

  if (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
    || Math.abs(distance) < 1
  ) {
    window.scrollTo(0, destination);
    return;
  }

  const duration = Math.min(1100, 320 + Math.sqrt(Math.abs(distance)) * 10);
  let startTime;

  const cleanup = () => {
    window.removeEventListener("wheel", cancelOnUserInput);
    window.removeEventListener("touchstart", cancelOnUserInput);
    window.removeEventListener("keydown", cancelOnNavigationKey);
    activeScrollCleanup = null;
    activeScrollFrame = null;
  };

  const cancelOnUserInput = () => cancelActiveScroll();
  const cancelOnNavigationKey = (event) => {
    if (["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " "].includes(event.key)) {
      cancelActiveScroll();
    }
  };

  const animate = (timestamp) => {
    if (startTime === undefined) startTime = timestamp;

    const progress = Math.min((timestamp - startTime) / duration, 1);
    const easedProgress = (1 - Math.cos(Math.PI * progress)) / 2;
    window.scrollTo(0, start + distance * easedProgress);

    if (progress < 1) {
      activeScrollFrame = window.requestAnimationFrame(animate);
    } else {
      window.scrollTo(0, destination);
      cleanup();
    }
  };

  activeScrollCleanup = cleanup;
  window.addEventListener("wheel", cancelOnUserInput, { passive: true });
  window.addEventListener("touchstart", cancelOnUserInput, { passive: true });
  window.addEventListener("keydown", cancelOnNavigationKey);
  activeScrollFrame = window.requestAnimationFrame(animate);
}

function cancelActiveScroll() {
  if (activeScrollFrame !== null) {
    window.cancelAnimationFrame(activeScrollFrame);
    activeScrollFrame = null;
  }

  activeScrollCleanup?.();
}

function getDocumentTop(element) {
  let top = 0;
  let current = element;

  while (current) {
    top += current.offsetTop;
    current = current.offsetParent;
  }

  return top;
}
