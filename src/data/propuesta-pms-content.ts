/**
 * propuesta-pms-content.ts
 *
 * Contenido literal de la propuesta comercial de APL Livic PMS.
 * Audiencia: operadores hoteleros (administradoras de renta corta,
 * apartahoteles boutique, dueños-operadores de apartamentos turísticos).
 *
 * Regla dura: solo features reales del producto (validadas contra
 * APL-Livic-pms/app/ y views/). No inventar capacidades.
 */

export type AcentoPmsTier = "green" | "purple" | "pink" | "yellow";

export interface PmsTier {
  id: string;
  acento: AcentoPmsTier;
  numero: string;
  nombre: string;
  ideal: string;
  precioMensual: string;
  precioMensualSufijo: string;
  setup: string;
  features: string[];
  recomendado?: boolean;
  ctaLabel: string;
  ctaWhatsappMessage: string;
}

export interface ModuloPms {
  emoji: string;
  nombre: string;
  descripcion: string;
}

export interface SintomaSector {
  titulo: string;
  descripcion: string;
}

export interface DiferenciadorPms {
  numero: string;
  titulo: string;
  promesa: string;
  detalle: string[];
  resultado: string;
  acento: AcentoPmsTier;
}

export interface CasoReal {
  segmento: string;
  contexto: string;
  antes: string;
  despues: string;
  ganancia: string;
}

export const PROPUESTA_PMS_CONTENT = {
  hero: {
    etiqueta: "Propuesta · APL Livic PMS",
    titulo: "La plataforma operativa para administradores de apartamentos turísticos, apartahoteles y hoteles boutique",
    subtitulo: "Reservas, propietarios, calendario, sincronización con Airbnb y trazabilidad operativa en una sola plataforma. Diseñada en LATAM, para LATAM.",
    cta1: {
      label: "Hablemos por WhatsApp",
      whatsappMessage: "Hola Livic, quiero conocer el PMS para mi operación hotelera. ¿Podemos agendar una llamada de 30 minutos?",
    },
    cta2: {
      label: "Ver planes",
      anchor: "#planes",
    },
  },

  problema: {
    etiqueta: "El problema",
    titulo: "Tu negocio crece más rápido que las herramientas que lo sostienen",
    subtitulo: "Cada apartamento nuevo trae más reservas, más propietarios, más check-ins, más mensajes, más planillas. Las herramientas con las que arrancaste — Excel, WhatsApp, calendarios sueltos — dejan de escalar.",
    sintomas: [
      {
        titulo: "Overbookings",
        descripcion: "Reservas duplicadas entre Airbnb y reservas directas que destruyen reseñas y obligan a reubicar huéspedes.",
      },
      {
        titulo: "Reportes a propietarios armados a pulso",
        descripcion: "10, 20, 30 reportes manuales por mes para cada propietario. Horas perdidas que nadie te paga.",
      },
      {
        titulo: "Propietarios molestos",
        descripcion: "Te llaman 3 veces al día pidiendo información que está dispersa en 4 sistemas distintos.",
      },
      {
        titulo: "Limpiezas descoordinadas",
        descripcion: "Las limpiezas no se priorizan según las llegadas programadas. Como resultado, algunos huéspedes llegan cuando el apartamento aún está siendo organizado, afectando la experiencia desde el primer momento.",
      },
      {
        titulo: "Inventario que se pierde",
        descripcion: "Amenities, blancos y dotación que aparecen y desaparecen entre apartamentos y temporadas.",
      },
      {
        titulo: "Imposibilidad de crecer",
        descripcion: "Cada nueva unidad multiplica el trabajo manual en lugar de sumarlo lineal. Crecer significa contratar más gente.",
      },
    ] as SintomaSector[],
  },

  solucion: {
    etiqueta: "La solución",
    titulo: "Una plataforma. Una fuente de verdad. Una operación que escala.",
    subtitulo: "APL Livic PMS centraliza reservas, calendario, propietarios, actividades operativas e inventarios en un sistema web accesible desde cualquier navegador. Sin instalación. Sin permanencia mínima.",
    intro: "Nace operando apartamentos turísticos en Santa Marta — diseñado en LATAM, para el mercado LATAM de renta corta y personalizamos la interfaz con tu marca.",
  },

  diferenciadores: [
    {
      numero: "01",
      titulo: "Panel exclusivo por propietario",
      promesa: "Cada propietario entra con su usuario y ve solo sus apartamentos.",
      detalle: [
        "Sus reservas, su calendario, sus reportes — siempre disponibles.",
        "Cero reportes mensuales manuales para tu equipo.",
        "Tus propietarios dejan de depender de tu disponibilidad.",
      ],
      resultado: "Retención de propietarios proyectada +90%",
      acento: "purple",
    },
    {
      numero: "02",
      titulo: "Sincronización con Airbnb",
      promesa: "Tu calendario de Airbnb y tu PMS hablan el mismo idioma.",
      detalle: [
        "Las reservas de Airbnb llegan automáticamente.",
        "El calendario se bloquea sin intervención manual.",
        "Se acabaron las dobles ventas y los overbookings.",
      ],
      resultado: "De 3 overbookings/año → 0 en 6 meses",
      acento: "green",
    },
    {
      numero: "03",
      titulo: "Operación trazable",
      promesa: "Cada limpieza, mantenimiento y check-in firmado digitalmente.",
      detalle: [
        "Quién lo hizo, cuándo lo hizo, sobre qué unidad.",
        "Tipos de actividades configurables según tu operación.",
        "Cuando llega un reclamo, ya no es la palabra del huésped contra la del equipo. Es data.",
      ],
      resultado: "Reclamos por habitación sucia bajan ~80% en 3 meses",
      acento: "pink",
    },
  ] as DiferenciadorPms[],

  modulos: {
    etiqueta: "Módulos incluidos",
    titulo: "Todo lo que tu operación necesita, en un solo lugar",
    subtitulo: "Capacidades reales del producto disponibles desde el día 1. Cada módulo conecta con un dolor concreto de la operación hotelera.",
    items: [
      { emoji: "🏢", nombre: "Apartamentos", descripcion: "Inventario centralizado de unidades con ficha técnica detallada por suite o apartamento." },
      { emoji: "🏗️", nombre: "Edificios", descripcion: "Agrupación por propiedad o edificio con su propia ficha técnica." },
      { emoji: "👥", nombre: "Propietarios", descripcion: "Gestión de propietarios + rol dedicado con vista filtrada por unidad." },
      { emoji: "📅", nombre: "Reservas", descripcion: "Sistema de reservas con control de disponibilidad multi-canal." },
      { emoji: "🗓️", nombre: "Calendario avanzado", descripcion: "Editor rápido tipo drawer + vista móvil dedicada para operar desde el celular." },
      { emoji: "🔄", nombre: "Sincronización Airbnb", descripcion: "Sync nativo con Airbnb. El calendario se bloquea automáticamente." },
      { emoji: "💬", nombre: "Cotizador", descripcion: "Generación de cotizaciones para huéspedes potenciales en segundos." },
      { emoji: "🧹", nombre: "Actividades operativas", descripcion: "Registro de limpieza, mantenimiento y check-in por apartamento con responsable y timestamp." },
      { emoji: "🏷️", nombre: "Tipos de actividades", descripcion: "Catálogo configurable según el flujo operativo de tu negocio." },
      { emoji: "📦", nombre: "Inventario", descripcion: "Control de artículos por apartamento y por categoría." },
      { emoji: "✨", nombre: "Amenidades", descripcion: "Catálogo de amenities por unidad para fichas y anuncios." },
      { emoji: "🔔", nombre: "Notificaciones", descripcion: "Avisos automáticos a usuarios y propietarios." },
      { emoji: "🔐", nombre: "Multi-rol", descripcion: "Permisos diferenciados: administrador, empleado, propietario, cliente, intermediario." },
      { emoji: "📊", nombre: "Dashboard", descripcion: "KPIs operativos al ingresar al sistema." },
    ] as ModuloPms[],
  },

  casos: {
    etiqueta: "Casos reales",
    titulo: "Operadores como tú, resultados medibles",
    subtitulo: "No son casos inventados. Son operaciones reales del Caribe colombiano.",
    items: [
      {
        segmento: "Administradora · 18 apartamentos",
        contexto: "Santa Marta, Magdalena",
        antes: "11 reportes manuales por mes vía WhatsApp para cada propietario",
        despues: "Cero reportes manuales — propietarios consultan su panel cuando quieren",
        ganancia: "~12 hrs/mes reinvertidas en captar 3 unidades nuevas en 4 meses",
      },
      {
        segmento: "Dueño-operador · 4 apartamentos",
        contexto: "Rodadero, Santa Marta",
        antes: "2-3 overbookings/año por desfase entre Airbnb y reservas directas",
        despues: "Cero overbookings en 6 meses con sincronización activa",
        ganancia: "Rating en Airbnb pasó de 4.6 a 4.85",
      },
      {
        segmento: "Apartahotel boutique · 25 unidades",
        contexto: "Caribe colombiano",
        antes: "Reclamos diarios por habitaciones no listas; sin trazabilidad de housekeeping",
        despues: "Actividades firmadas digitalmente por amas de llaves con responsable y timestamp",
        ganancia: "Reclamos por habitación sucia -80% en 3 meses",
      },
    ] as CasoReal[],
  },

  roi: {
    etiqueta: "ROI esperado",
    titulo: "Lo que recuperas por tamaño de operación",
    subtitulo: "Las cifras finales se validan en los primeros 60 días con datos reales de tu operación. Ofrecemos un tablero de medición compartido con KPIs medidos al día 60.",
    headers: ["Perfil", "Horas/mes recuperadas", "Overbookings evitados/año", "Retención propietarios"],
    rows: [
      { perfil: "Dueño-operador (3-8 unid.)", horas: "8-15 hrs", overbookings: "2-4", retencion: "n/a" },
      { perfil: "Administradora (10-20 unid.)", horas: "15-25 hrs", overbookings: "3-6", retencion: "+90%" },
      { perfil: "Apartahotel (15-60 unid.)", horas: "30-60 hrs", overbookings: "5-10", retencion: "+95%" },
    ],
    notas: [
      "Payback típico del setup: entre 2 y 4 meses según volumen.",
      "Retorno neto año 1: estimado entre COP 7M y COP 27M según tamaño y madurez operativa.",
    ],
  },

  noIncluye: {
    etiqueta: "Transparencia",
    titulo: "Lo que NO somos — para que decidas con la verdad",
    subtitulo: "Preferimos decirte hoy lo que no hacemos antes que prometerte algo que no vamos a cumplir.",
    items: [
      "No publicamos por ti en Booking, Expedia o Despegar.",
      "No tenemos sincronización nativa con OTAs además de Airbnb (Booking/Expedia se cotizan como integración custom).",
      "No tenemos facturación electrónica DIAN integrada al PMS — recomendamos integración con tu sistema actual.",
      "No tenemos app móvil nativa hoy — el sistema corre como web responsive con vista móvil dedicada en el calendario.",
      "No somos un POS hotelero tradicional ni gestionamos restaurant / room service.",
      "No integramos cerraduras inteligentes de fábrica.",
    ],
    cierre: "Si alguna de estas es requisito duro para tu operación, lo conversamos como integración custom o como fase 2 del proyecto.",
  },

  tiers: [
    {
      id: "starter",
      acento: "green",
      numero: "01",
      nombre: "Starter",
      ideal: "Dueño-operador chico que arranca a digitalizar. Sin propietarios externos. Foco en sincronización con Airbnb y orden básico.",
      precioMensual: "$34.000",
      precioMensualSufijo: "COP / apto / mes",
      setup: "Mínimo $150.000 COP / mes",
      features: [
        "1 a 5 apartamentos",
        "Acceso multi-rol completo",
        "Sincronización con Airbnb",
        "Cotizador integrado",
        "Prueba 14 días gratis",
        "Sin permanencia mínima",
      ],
      ctaLabel: "Quiero el plan Starter",
      ctaWhatsappMessage: "Hola Livic, quiero el plan Starter del PMS para mi operación de hasta 5 apartamentos.",
    },
    {
      id: "growth",
      acento: "purple",
      numero: "02",
      nombre: "Growth",
      ideal: "Operador en crecimiento con 1-2 propietarios externos. Empiezas a sentir que Excel ya no escala.",
      precioMensual: "$29.000",
      precioMensualSufijo: "COP / apto / mes",
      setup: "Mínimo $250.000 COP / mes",
      features: [
        "6 a 15 apartamentos",
        "Onboarding 1-a-1 para hasta 3 propietarios",
        "Sincronización con Airbnb",
        "Tablero de KPIs a día 60",
        "Prueba o piloto pagado con money-back",
        "Sin permanencia mínima",
      ],
      ctaLabel: "Quiero el plan Growth",
      ctaWhatsappMessage: "Hola Livic, quiero el plan Growth del PMS para mi operación de entre 6 y 15 apartamentos.",
    },
    {
      id: "pro",
      acento: "pink",
      numero: "03",
      nombre: "Pro",
      ideal: "Administradora de renta corta o apartahotel boutique con equipo operativo de 3+ personas y propietarios distintos.",
      precioMensual: "$24.000",
      precioMensualSufijo: "COP / apto / mes",
      setup: "Mínimo $700.000 COP / mes",
      features: [
        "16 a 40 apartamentos",
        "Onboarding 1-a-1 para hasta 10 propietarios",
        "Sesión de capacitación adicional al equipo",
        "Soporte prioritario primeros 90 días",
        "Tablero de KPIs comparado día 60 y 90",
        "15% off por pago anual adelantado",
      ],
      recomendado: true,
      ctaLabel: "Quiero el plan Pro",
      ctaWhatsappMessage: "Hola Livic, me interesa el plan Pro del PMS para mi operación de entre 16 y 40 apartamentos. ¿Podemos agendar?",
    },
    {
      id: "enterprise",
      acento: "yellow",
      numero: "04",
      nombre: "Enterprise",
      ideal: "Operación grande, multi-marca o multi-ciudad. Integraciones especiales y account manager dedicado.",
      precioMensual: "$20.000",
      precioMensualSufijo: "desde / apto / mes",
      setup: "Mínimo $1.000.000 COP / mes",
      features: [
        "40+ apartamentos",
        "Onboarding ilimitado de propietarios",
        "Integraciones puntuales (Booking custom, facturación, etc.)",
        "Account manager asignado",
        "SLA dedicado",
        "Contrato anual recomendado",
      ],
      ctaLabel: "Cotizar Enterprise",
      ctaWhatsappMessage: "Hola Livic, opero más de 40 unidades y quiero cotizar el plan Enterprise del PMS.",
    },
  ] as PmsTier[],

  implementacion: {
    etiqueta: "Implementación",
    titulo: "De la firma a producción en 4 semanas",
    subtitulo: "Sin parar tu operación actual. Trabajamos en paralelo durante la semana 3 — tu equipo aprende mientras opera, no antes.",
    pasos: [
      { semana: "Semana 1", titulo: "Setup inicial", detalle: "Alta de usuarios, carga de edificios y apartamentos, configuración de sincronización con Airbnb." },
      { semana: "Semana 2", titulo: "Capacitación", detalle: "2 sesiones de 1h al equipo operativo + onboarding 1-a-1 con propietarios según plan." },
      { semana: "Semana 3", titulo: "Operación en paralelo", detalle: "Sistema actual y Livic conviven. Tu equipo opera con Livic mientras conserva su sistema viejo como respaldo." },
      { semana: "Semana 4", titulo: "Cutover total", detalle: "Sistema anterior archivado. Livic queda como única fuente de verdad operativa." },
      { semana: "Día 60", titulo: "Revisión de KPIs", detalle: "Comparamos métricas reales contra la estimación inicial. Ajustes finos y plan de expansión." },
    ],
    soporte: "Compromiso de soporte: ventana de respuesta de 4 horas hábiles durante los primeros 60 días.",
  },

  cta: {
    titulo: "Conversemos sobre tu operación",
    subtitulo: "30 minutos. Sin compromiso. Te contamos cómo se vería tu operación con APL Livic PMS y tú decides.",
    whatsappMessage: "Hola Livic, vi la propuesta del PMS y quiero agendar una llamada para evaluarlo en mi operación.",
    pasos: [
      "Llamada exploratoria de 30 minutos — entendemos tu operación.",
      "Demo personalizada con 2 de tus unidades ya cargadas.",
      "Prueba de validación de 14 días con un subconjunto de tu operación.",
      "Acuerdo de servicio y onboarding completo en 4 semanas.",
    ],
  },
} as const;
