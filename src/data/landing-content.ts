/**
 * Contenido estático de la landing page
 * Basado en mision-vision.md
 */

export const LANDING_CONTENT = {
  hero: {
    tagline: "LIVIC: Tranquilidad para ti, cuidado total para tu inmueble",
    subtitle: "Operamos y acompañamos inmuebles en renta turística con presencia real, control operativo y atención constante.",
    ctaPrimary: "Conoce nuestros servicios",
    ctaSecondary: "Contactar por WhatsApp",
    backgroundImage: "/portada-landing.jpg"
  },

  mision: "En LIVIC operamos y acompañamos inmuebles en renta turística de manera integral, brindando a propietarios y huéspedes una experiencia organizada, cercana y confiable. Gestionamos cada propiedad con presencia real, control operativo y atención constante, asegurando el buen estado del inmueble, la satisfacción del huésped y la tranquilidad del propietario.",

  vision: "Ser una empresa referente en la operación de inmuebles en renta turística y acompañamiento inmobiliario, reconocida por su gestión responsable, humana y eficiente, consolidándonos como el aliado estratégico de propietarios que buscan maximizar su inversión sin perder control ni tranquilidad.",

  servicios: [
    {
      id: "operacion",
      titulo: "Operación de Renta Turística",
      icono: "Home",
      descripcionCorta: "Nos encargamos de toda la gestión de tu propiedad en renta turística",
      imagen: "/servicio-operacion.jpg",
      caracteristicas: [
        "Gestión de reservas en plataformas y reservas directas",
        "Atención integral a huéspedes antes, durante y después de la estadía",
        "Coordinación de check-in y check-out",
        "Supervisión de limpieza y alistamiento",
        "Gestión de mantenimientos preventivos y correctivos",
        "Control de inventarios del inmueble",
        "Atención de novedades, daños o incidentes",
        "Acompañamiento a proveedores, técnicos y administración",
        "Reportes claros y periódicos al propietario"
      ]
    },
    {
      id: "acompanamiento",
      titulo: "Acompañamiento y Cuidado del Inmueble",
      icono: "Shield",
      descripcionCorta: "Cuidamos tu inmueble aunque no esté en operación turística",
      imagen: "/servicio-acompanamiento.jpg",
      caracteristicas: [
        "Visitas periódicas de supervisión",
        "Revisión del estado general del apartamento",
        "Atención de requerimientos del inmueble",
        "Coordinación de mantenimientos",
        "Acompañamiento a terceros autorizados",
        "Reportes al propietario",
        "Preparación del inmueble para una futura operación turística"
      ]
    }
  ],

  valorDiferencial: [
    {
      icono: "Target",
      titulo: "Enfoque real en renta turística",
      descripcion: "Especialización probada en gestión operativa de propiedades"
    },
    {
      icono: "Eye",
      titulo: "Presencia constante",
      descripcion: "Control operativo sin improvisación ni ausencias en el inmueble"
    },
    {
      icono: "Heart",
      titulo: "Atención humana y cercana",
      descripcion: "Comunicación directa con propietarios y huéspedes"
    },
    {
      icono: "BarChart",
      titulo: "Control y transparencia",
      descripcion: "El propietario mantiene visibilidad total de su inversión"
    },
    {
      icono: "RefreshCw",
      titulo: "Transición natural",
      descripcion: "De cuidado a operación turística sin fricciones"
    },
    {
      icono: "Building2",
      titulo: "Conocimiento profundo",
      descripcion: "Entendemos tu inmueble, tu edificio y tu entorno"
    },
    {
      icono: "UserCheck",
      titulo: "Sin imposiciones",
      descripcion: "Acompañamos procesos, no forzamos decisiones"
    },
    {
      icono: "Handshake",
      titulo: "Relaciones a largo plazo",
      descripcion: "Construimos compromiso, responsabilidad y confianza"
    }
  ],

  beneficios: [
    "Tranquilidad total",
    "Operación organizada y profesional",
    "Protección del inmueble",
    "Ahorro de tiempo y gestión",
    "Atención continua a huéspedes",
    "Comunicación clara y directa",
    "Decisiones basadas en información real"
  ],

  cta: {
    titulo: "¿Listo para cuidar tu inmueble con LIVIC?",
    subtitulo: "Contáctanos y recibe una asesoría personalizada sin compromiso",
    textoBoton: "Contactar por WhatsApp",
    nota: "Respondemos en menos de 24 horas"
  }
};

export type Servicio = typeof LANDING_CONTENT.servicios[0];
export type ValorDiferencial = typeof LANDING_CONTENT.valorDiferencial[0];
