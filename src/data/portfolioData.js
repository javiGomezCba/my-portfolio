import under23Image from "../assets/under-23-home.png";
import codeayaImage from "../assets/codeaya-home.jpg";
import tildinImage from "../assets/tildin-home.png";

const portfolioData = {
  personal: {
    name: "Nicolas Gomez",
    initials: "NG",
    role: "Frontend Developer",
    location: "Córdoba, Argentina",
    availability: "Disponible para nuevos proyectos",
    about: {
      introduction:
        "Soy desarrollador web, con foco en frontend. Construyo productos y aplicaciones con interfaces claras, lógica organizada e integración entre frontend y backend.",
      waysOfWorking: [
        "Entiendo el flujo de la aplicación antes de definir cómo se presenta.",
        "Organizo la interfaz en componentes y conecto servicios cuando el producto lo necesita.",
        "Cuido la experiencia en distintos tamaños de pantalla y estados de uso.",
      ],
      direction:
        "Me interesa aportar en equipos que desarrollan productos web, combinando frontend e integración y asumiendo responsabilidades a medida que avanzo profesionalmente.",
    },
    email: "hola@nicolasgomez.dev",
    socials: [
      { label: "GitHub", href: "https://github.com/", icon: "GH" },
      { label: "LinkedIn", href: "https://www.linkedin.com/", icon: "in" },
      { label: "Email", href: "mailto:hola@nicolasgomez.dev", icon: "@" },
    ],
  },
  projects: [
    {
      id: "under-23",
      number: "01",
      title: "UNDER 23",
      subtitle: "Experiencia web para una barbería con flujo de reserva.",
      description:
        "Una experiencia digital que presenta la barbería y acompaña al visitante desde la exploración hasta la solicitud de un turno.",
      role: "Frontend Developer",
      focus: "Product UI · Responsive · Booking",
      technologies: ["React", "Vite", "JavaScript", "CSS"],
      features: [
        "Flujo de reserva guiado para elegir servicio, fecha y horario.",
        "Resumen de la selección y continuación de la solicitud por WhatsApp.",
        "Secciones de navegación, galería e información para presentar el negocio y sus vías de contacto.",
      ],
      technicalDecisions: [
        "Disponibilidad y precios aparecen identificados como datos de demo, no como agenda real.",
        "El mensaje se prepara a partir de la selección; el diseño mobile-first adapta navegación y llamadas a la acción.",
      ],
      architecture: null,
      image: under23Image,
      imageAlt: "Captura de Under 23 con navegación principal, presentación de la barbería y llamadas a reservar un turno.",
      demoUrl: "https://underbarbershop.vercel.app/",
      repoUrl: "https://github.com/javiGomezCba/Under-23",
      mediaSide: "right",
    },
    {
      id: "codeaya",
      number: "02",
      title: "CODEAYA",
      subtitle: "E-commerce de cursos de programación.",
      description:
        "Una tienda de cursos que combina catálogo y carrito en el frontend con un formulario conectado a un backend propio.",
      role: "Full Stack Developer",
      focus: "E-commerce · REST API · Backend Integration",
      technologies: [
        "React",
        "Vite",
        "JavaScript",
        "Node.js",
        "Express",
        "React Router",
        "Bootstrap",
        "Swiper",
      ],
      features: [
        "Catálogo de cursos y carrito gestionados en estado React, con panel lateral para agregar y quitar cursos.",
        "React Router configura la ruta principal y Swiper presenta el catálogo en un carrusel adaptable.",
        "El formulario valida los campos y envía sus datos mediante POST JSON al endpoint de contacto del backend Express.",
      ],
      technicalDecisions: [
        "Separación del código en frontend React/Vite y backend Node.js/Express.",
        "La integración REST verificada corresponde al formulario de contacto; el catálogo se define en el frontend.",
      ],
      architecture: null,
      image: codeayaImage,
      imageAlt: "Captura de CodeaYa con el catálogo visual de cursos de programación.",
      demoUrl: "https://codea-ya.vercel.app/",
      repoUrl: "https://github.com/javiGomezCba/ecommerce-react",
      mediaSide: "left",
    },
    {
      id: "tildin",
      number: "03",
      title: "TILDIN",
      subtitle: "Organizador personal de tareas con prioridades, subtareas y persistencia local.",
      description:
        "Una SPA personal para planificar tareas, dividirlas en pasos y revisar el progreso. La información se guarda en el navegador, sin cuentas ni sincronización remota.",
      role: "Frontend Developer",
      focus: "State Management · UX · Local Persistence",
      technologies: ["React 18", "Vite", "JavaScript", "CSS", "React Icons"],
      features: [
        "Creación, edición, completado y eliminación de tareas con fechas límite, prioridades, etiquetas y subtareas.",
        "Búsqueda, filtros combinados, progreso calculado y ordenamiento por distintos criterios.",
        "Reordenamiento manual con drag & drop y controles alternativos; deshacer con aviso temporal o Ctrl+Z / Cmd+Z.",
      ],
      technicalDecisions: [
        "useReducer centraliza operaciones; useTodo y useDarkMode separan la lógica de tareas y tema.",
        "useMemo deriva etiquetas y vistas filtradas/ordenadas; tareas y tema persisten en localStorage.",
        "Deshacer conserva una instantánea temporal; controles de movimiento ofrecen una alternativa al drag & drop.",
      ],
      architecture: "React → Hooks → Reducer → localStorage",
      image: tildinImage,
      imageAlt: "Captura de Tildin con filtros de tareas, panel de progreso y formulario con fecha, etiqueta y prioridad",
      demoUrl: "https://to-do-list-app-con-react-theta.vercel.app/",
      repoUrl: "https://github.com/javiGomezCba/to-do-app-con-react",
      mediaSide: "right",
    },
  ],
  skills: [
    {
      id: "frontend",
      category: "FRONTEND",
      description: "La base de mi trabajo: interfaces web, componentes reutilizables y experiencias responsive.",
      technologies: [
        { name: "React", icon: "react" },
        { name: "Next.js", icon: "next" },
        { name: "TypeScript", icon: "typescript" },
        { name: "JavaScript", icon: "javascript" },
        { name: "HTML", icon: "html" },
        { name: "CSS", icon: "css" },
        { name: "Vite", icon: "vite" },
      ],
    },
    {
      id: "backend",
      category: "BACKEND & APIs",
      description: "Integración de interfaces con servicios y rutas HTTP.",
      technologies: [
        { name: "Node.js", icon: "node" },
        { name: "Express", icon: "express" },
        { name: "REST APIs", icon: "rest" },
      ],
    },
    {
      id: "tools",
      category: "TOOLS & WORKFLOW",
      description: "Herramientas presentes en mi flujo de desarrollo y colaboración.",
      technologies: [
        { name: "Git", icon: "git" },
        { name: "GitHub", icon: "github" },
        { name: "Jira", icon: "jira" },
        { name: "ESLint", icon: "eslint" },
        { name: "Prettier", icon: "prettier" },
        { name: "AI-assisted development", icon: "ai" },
      ],
    },
    {
      id: "practices",
      category: "PRACTICES",
      description: "Criterios y capacidades que conectan las distintas capas del producto.",
      technologies: [
        "State Management",
        "API Integration",
        "Responsive Design",
        "Component Architecture",
        "Authentication",
        "Accessibility",
      ],
    },
  ],
};

export default portfolioData;
