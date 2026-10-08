import under23Image from "../assets/under-23-home.png";
import codeayaImage from "../assets/codeaya-home.jpg";
import tildinImage from "../assets/tildin-home.png";

const portfolioData = {
  personal: {
    name: "Nicolas Gomez",
    location: "Córdoba, Argentina",
    availability: "Disponible para nuevos proyectos",
    about: {
      introduction:
        "Soy desarrollador web de Córdoba capital. Me entusiasma resolver problemas con herramientas simples y bien pensadas.",
      waysOfWorking: [
        "Priorizo la información y los pasos para que cada flujo resulte claro.",
        "Organizo la UI en componentes reutilizables e integro servicios cuando el proyecto lo requiere.",
        "Adapto la experiencia a distintos tamaños de pantalla y estados de uso.",
      ],
      direction:
        "Quiero seguir creciendo en equipo, asumir nuevos desafíos y aprender de otras personas durante el proceso.",
    },
  },
  projects: [
    {
      id: "under-23",
      number: "01",
      title: "UNDER 23",
      subtitle: "Reservas online para una barbería.",
      description:
        "Presenta los servicios y guía al visitante para elegir un turno antes de continuar la solicitud por WhatsApp.",
      role: "Desarrollo frontend",
      focus: "Interfaz de producto · Adaptable · Reservas",
      technologies: ["React", "Vite", "JavaScript", "CSS"],
      features: [
        "Selección guiada de servicio, fecha y horario.",
        "Resumen del turno y envío de la solicitud por WhatsApp.",
        "Galería, navegación e información de contacto del negocio.",
      ],
      technicalDecisions: [
        "La disponibilidad y los precios se identifican como datos de demostración, no como agenda real.",
        "La interfaz prioriza dispositivos móviles y adapta la navegación a pantallas más amplias.",
      ],
      image: under23Image,
      imageAlt: "Captura de Under 23 con navegación, presentación de la barbería y opciones para reservar un turno.",
      demoUrl: "https://underbarbershop.vercel.app/",
      repoUrl: "https://github.com/javiGomezCba/Under-23",
      mediaSide: "right",
    },
    {
      id: "codeaya",
      number: "02",
      title: "CODEAYA",
      subtitle: "Tienda online de cursos de programación.",
      description:
        "Catálogo de cursos con un formulario de contacto conectado a un backend en Express.",
      role: "Desarrollo full stack",
      focus: "Comercio electrónico · API REST · Integración de backend",
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
        "Panel lateral para agregar o quitar cursos del carrito.",
        "React Router organiza la navegación y Swiper muestra los cursos en un carrusel adaptable.",
        "El formulario valida los campos y envía un POST JSON al backend.",
      ],
      technicalDecisions: [
        "El catálogo se define en el frontend; la conexión REST se usa para el formulario de contacto.",
      ],
      image: codeayaImage,
      imageAlt: "Captura de CODEAYA con el catálogo visual de cursos de programación.",
      demoUrl: "https://codea-ya.vercel.app/",
      repoUrl: "https://github.com/javiGomezCba/ecommerce-react",
      mediaSide: "left",
    },
    {
      id: "tildin",
      number: "03",
      title: "TILDIN",
      subtitle: "Planificación personal con seguimiento visual del avance.",
      description:
        "SPA personal para planificar tareas y seguir su avance. Los datos quedan guardados en el navegador, sin cuenta ni sincronización remota.",
      role: "Desarrollo frontend",
      focus: "Gestión de estado · UX · Guardado local",
      technologies: ["React 18", "Vite", "JavaScript", "CSS", "React Icons"],
      features: [
        "Crear, editar, completar y eliminar tareas con fechas, prioridades, etiquetas y subtareas.",
        "Buscar, combinar filtros, consultar el progreso y ordenar tareas.",
        "Reordenar con drag & drop o controles alternativos; deshacer con aviso temporal o Ctrl+Z / Cmd+Z.",
      ],
      technicalDecisions: [
        "useReducer centraliza las operaciones; hooks separan la lógica de tareas y tema.",
        "useMemo prepara las vistas filtradas y localStorage conserva tareas y preferencias.",
        "El historial conserva una instantánea anterior durante un breve período para deshacer cambios.",
      ],
      image: tildinImage,
      imageAlt: "Captura de Tildin con filtros, progreso y un formulario de tareas con fecha, etiqueta y prioridad.",
      demoUrl: "https://to-do-list-app-con-react-theta.vercel.app/",
      repoUrl: "https://github.com/javiGomezCba/to-do-app-con-react",
      mediaSide: "right",
    },
  ],
  skills: [
    {
      id: "frontend",
      category: "Frontend",
      description: "Interfaces web, componentes reutilizables y experiencias adaptables a distintos dispositivos.",
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
      category: "Backend y APIs",
      description: "Conexión de interfaces con servicios y rutas HTTP.",
      technologies: [
        { name: "Node.js", icon: "node" },
        { name: "Express", icon: "express" },
        { name: "REST APIs", icon: "rest" },
      ],
    },
    {
      id: "tools",
      category: "Herramientas y flujo",
      description: "Herramientas que uso para desarrollar y colaborar.",
      technologies: [
        { name: "Git", icon: "git" },
        { name: "GitHub", icon: "github" },
        { name: "Jira", icon: "jira" },
        { name: "ESLint", icon: "eslint" },
        { name: "Prettier", icon: "prettier" },
        { name: "Desarrollo asistido por IA", icon: "ai" },
      ],
    },
    {
      id: "practices",
      category: "Prácticas",
      description: "Prácticas para conectar las distintas partes de una aplicación.",
      technologies: [
        "Gestión de estado",
        "Integración con APIs",
        "Diseño adaptable",
        "Arquitectura de componentes",
        "Autenticación",
        "Accesibilidad",
      ],
    },
  ],
};

export default portfolioData;
