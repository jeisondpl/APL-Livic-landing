/**
 * pricing-content.ts
 *
 * Contenido literal de Modalidades de Servicio – Livic.
 * 3 tiers + servicios complementarios.
 * Texto SIN parafrasear (es voz de marca).
 */

export type AcentoPricing = "green" | "pink" | "purple";

export interface PricingTier {
  id: string;
  acento: AcentoPricing;
  numero: string;            // "1", "2", "3"
  nombre: string;
  ideal: string;
  features: string[];
  /** Etiqueta destacada del valor principal (ej: "10%", "Desde $200.000"). */
  destacado: {
    label: string;            // "Comisión por reservas efectivas"
    valor: string;            // "10 %"
    sufijo?: string;          // "sobre reservas confirmadas"
  };
  /** Notas / sub-bloques especiales (ej: tabla A/B en tier 1, fees en tier 2). */
  extras?:
    | {
        kind: "tabla-modalidades";
        titulo: string;
        rows: { modalidad: string; valor: string }[];
        notas: string[];
      }
    | {
        kind: "tabla-fees";
        titulo: string;
        rows: { tipo: string; valor: string }[];
        nota: string;
      }
    | {
        kind: "sin-fee";
        mensaje: string;
      };
  /** Si está marcado como "Recomendado" / destacado visualmente. */
  recomendado?: boolean;
  /** CTA principal del tier. */
  cta: {
    label: string;
    /** Mensaje pre-relleno para WhatsApp. */
    whatsappMessage: string;
  };
}

export interface ServicioComplementario {
  servicio: string;
  valor: string;
}

export const PRICING_CONTENT = {
  hero: {
    etiqueta: "Pricing & Plan",
    titulo: "Modalidades de Servicio",
    tituloHighlight: "Livic",
    subtitulo: "Elige el nivel de acompañamiento que mejor se ajusta a tu propiedad",
    intro:
      "En Livic entendemos que cada propietario tiene necesidades, tiempos y objetivos diferentes, por eso contamos con distintas modalidades de servicio que permiten adaptar la gestión del inmueble de manera flexible, estratégica y organizada. Nuestro objetivo es brindar tranquilidad, optimizar la operación y potencializar cada propiedad según el nivel de acompañamiento requerido.",
  },

  tiers: [
    {
      id: "comercializacion",
      acento: "green",
      numero: "01",
      nombre: "Servicio de Comercialización",
      ideal:
        "Ideal para propietarios que desean apoyo estratégico en la publicación y posicionamiento de su inmueble en plataformas digitales, manteniendo una operación más independiente.",
      features: [
        "Creación y optimización del anuncio",
        "Estrategia comercial y posicionamiento",
        "Configuración de tarifas y calendario",
        "Manejo de plataformas y reservas",
        "Atención comercial al huésped",
        "Inventario inicial de la propiedad",
      ],
      destacado: {
        label: "Comisión por reservas efectivas",
        valor: "10 %",
        sufijo: "sobre reservas confirmadas",
      },
      extras: {
        kind: "tabla-modalidades",
        titulo: "Puesta en marcha del anuncio",
        rows: [
          { modalidad: "Anuncio creado en cuenta del propietario", valor: "Desde $200.000 COP" },
          { modalidad: "Anuncio creado desde cuenta Livic", valor: "Sin costo inicial" },
        ],
        notas: [
          "Cuando el anuncio se crea en la cuenta del propietario, este queda como activo digital propio del inmueble.",
          "Cuando el anuncio se administra desde Livic, el propietario aprovecha el posicionamiento, reputación y estrategia comercial de nuestra marca.",
        ],
      },
      cta: {
        label: "Solicitar comercialización",
        whatsappMessage:
          "Hola Livic, me interesa el Servicio de Comercialización para mi apartamento. ¿Podemos hablar?",
      },
    },
    {
      id: "administracion",
      acento: "purple",
      numero: "02",
      nombre: "Servicio de Administración",
      ideal:
        "Ideal para propietarios que ya cuentan con comercialización activa, pero necesitan apoyo operativo, administrativo y legal para el manejo del inmueble.",
      features: [
        "Atención operativa del apartamento",
        "Coordinación de limpieza y mantenimientos",
        "Supervisión general del inmueble",
        "Acompañamiento administrativo",
        "Apoyo en procesos legales y turísticos (RNT, TRA, SIRE, Fontur, entre otros)",
        "Seguimiento operativo de huéspedes y reservas",
        "Inventario y control de elementos del inmueble",
      ],
      destacado: {
        label: "Fee administrativo mensual",
        valor: "Desde $200.000",
        sufijo: "según tamaño del inmueble",
      },
      extras: {
        kind: "tabla-fees",
        titulo: "Fee administrativo mensual",
        rows: [
          { tipo: "Apartaestudios y apartamentos pequeños", valor: "Desde $200.000 COP" },
          { tipo: "Apartamentos medianos o familiares", valor: "Desde $300.000 COP" },
          { tipo: "Propiedades premium o de alta operación", valor: "Según evaluación" },
        ],
        nota: "El fee podrá variar según el tamaño del inmueble, nivel operativo y necesidades específicas de administración.",
      },
      cta: {
        label: "Solicitar administración",
        whatsappMessage:
          "Hola Livic, me interesa el Servicio de Administración para mi apartamento. ¿Podemos hablar?",
      },
    },
    {
      id: "integral",
      acento: "pink",
      numero: "03",
      nombre: "Servicio Integral Livic",
      ideal:
        "Nuestra modalidad más completa y recomendada para propietarios que desean delegar completamente la administración, comercialización y operación del inmueble en un solo equipo.",
      features: [
        "Comercialización del inmueble",
        "Gestión de reservas y huéspedes",
        "Administración operativa y administrativa",
        "Revenue management y estrategia tarifaria",
        "Coordinación de limpieza y mantenimientos",
        "Acompañamiento legal y turístico",
        "Supervisión general de la propiedad",
        "Atención personalizada y seguimiento continuo",
        "Inventario inicial y seguimiento operativo del inmueble",
      ],
      destacado: {
        label: "Comisión sobre reservas efectivas",
        valor: "15 %",
        sufijo: "sin fee administrativo mensual",
      },
      extras: {
        kind: "sin-fee",
        mensaje:
          "Esta modalidad permite una gestión mucho más integrada, estratégica y eficiente, enfocada en maximizar la ocupación, mejorar la experiencia del huésped y brindar mayor tranquilidad al propietario.",
      },
      recomendado: true,
      cta: {
        label: "Quiero el plan completo",
        whatsappMessage:
          "Hola Livic, me interesa el Servicio Integral. Quiero delegar todo el manejo de mi apartamento. ¿Cuándo podemos hablar?",
      },
    },
  ] as PricingTier[],

  complementarios: {
    titulo: "Servicios complementarios",
    subtitulo: "Para tener en cuenta",
    intro:
      "Algunos servicios adicionales podrán cotizarse de manera independiente según las necesidades de cada propiedad:",
    items: [
      { servicio: "Fotografía profesional", valor: "Desde $150.000 COP" },
      { servicio: "Videos y contenido audiovisual", valor: "Según cotización" },
      { servicio: "Ambientación y preparación visual del inmueble", valor: "Según evaluación" },
      { servicio: "Inventarios adicionales o actualizaciones", valor: "Según evaluación" },
      { servicio: "Implementación de cerraduras electrónicas", valor: "Según cotización" },
      { servicio: "Adecuaciones estratégicas para operación turística", valor: "Según evaluación" },
    ] as ServicioComplementario[],
    nota: "Estos servicios ayudan a fortalecer la presentación, funcionalidad y posicionamiento del inmueble dentro del mercado de rentas cortas.",
  },
} as const;
