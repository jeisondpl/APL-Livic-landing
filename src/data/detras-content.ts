/**
 * detras-content.ts
 *
 * Contenido literal de la sección "Detrás de Livic" — manifiesto de Lina,
 * recomendaciones de cuidado y modalidades de administración con tarifas.
 *
 * Mantener el texto SIN parafrasear (es voz de marca).
 */

export interface ModalidadAnuncio {
  nombre: string;
  ideal: string;
  creacionValor: string;
  propiedadAnuncio: string;
  comision: string;
  gestion: string;
  nota: string;
  recomendada?: boolean;
}

export interface FeeAdministrativo {
  tipo: string;
  fee: string;
  destacado?: boolean;
}

export interface TarifaServicio {
  servicio: string;
  valor: string;
}

export const DETRAS_CONTENT = {
  hero: {
    etiqueta: "Detrás de Livic",
    titulo: "Conoce a quienes cuidan",
    tituloHighlight: "tu propiedad",
    subtitulo: "Hospitalidad con atención real ",
    foto: {
      src: "/operadora.jpeg",
      alt: "Lina Villalba Castañeda, fundadora de LIVIC, frente al mar en Santa Marta",
    },
    persona: {
      nombre: "Lina Villalba Castañeda",
      rol: "Fundadora & Operadora Turística",
    },
  },

  historia: {
    etiqueta: "Nuestra historia",
    titulo: "Más que administrar apartamentos, cuidamos experiencias",
    parrafos: [
      "Hola, soy Lina Villalba, creadora de Livic ",
      "Livic nació desde mi pasión por la hospitalidad, los detalles y el deseo de brindar tranquilidad tanto a propietarios como a huéspedes. Después de años trabajando en el sector de rentas cortas y administración turística en Santa Marta, entendí que este negocio no solo se trata de reservas… sino de confianza, atención y acompañamiento real.",
      "Junto a mi equipo trabajamos día a día para que cada propiedad esté bien cuidada, cada huésped se sienta bien recibido y cada propietario tenga la tranquilidad de contar con personas responsables y comprometidas detrás de su inversión.",
      "Nos enfocamos en una atención cercana, humana y organizada, acompañando procesos como:",
    ],
    procesos: [
      "Atención al huésped",
      "Check in y check out",
      "Supervisión y limpieza",
      "Coordinación de mantenimientos",
      "Gestión operativa y comercial",
      "Acompañamiento legal y administrativo para rentas cortas",
    ],
    cierre: [
      "En Livic creemos que los espacios bien atendidos generan mejores experiencias, mejores comentarios y mayor tranquilidad para todos.",
      "Porque más que alojar personas… nos gusta hacerlas sentir bienvenidas.",
    ],
    firma: "— Lina Villalba, fundadora de Livic",
  },

  recomendaciones: {
    etiqueta: "Recomendaciones",
    titulo: "Detalles que hacen la diferencia",
    subtitulo: "Pequeños cambios, grandes resultados — recomendaciones para optimizar y cuidar su propiedad",
    intro: "En Livic creemos que una buena experiencia no depende solo de la decoración, sino también de los detalles funcionales que ayudan a conservar el apartamento en excelente estado y facilitan la operación turística.",
    items: [
      "Instalar protectores o esquineros en paredes y columnas para evitar marcas y desgaste ocasionado por equipaje rodante.",
      "Contar con cajones, closets o gabinetes con llave para almacenar lencería, productos de aseo y elementos operativos de uso exclusivo del equipo administrativo.",
      "Utilizar protectores de colchón y almohadas impermeables para prolongar la vida útil y mantener mejores estándares de higiene.",
      "Tener un inventario organizado y actualizado del apartamento para facilitar controles y reposiciones.",
      "Implementar cerraduras electrónicas para mayor seguridad, control y facilidad en los ingresos.",
      "Elegir mobiliario resistente y de fácil mantenimiento, especialmente en zonas costeras donde el salitre y la humedad aceleran el desgaste.",
      "Disponer de utensilios básicos de cocina en buen estado y suficientes para la capacidad del apartamento.",
      "Realizar mantenimientos preventivos periódicos en aires acondicionados, cerraduras, griferías y electrodomésticos para evitar emergencias durante las reservas.",
      "Mantener una iluminación cálida y funcional que haga sentir el espacio más acogedor y agradable para los huéspedes.",
      "Tener puntos estratégicos para carga de celulares, ganchos, espejos y pequeños detalles que mejoran significativamente la experiencia del huésped.",
      "Contar con un espacio destinado para elementos de limpieza y operación facilita el orden y mejora los tiempos de atención entre reservas.",
    ],
    cierre: "En nuestra experiencia, los apartamentos mejor preparados no solo generan mejores comentarios y calificaciones, sino también mayor tranquilidad para sus propietarios y una operación mucho más eficiente.",
    quote: "En Livic no solo pensamos en cómo se ve un apartamento, sino en cómo funciona y se conserva con el tiempo.",
  },

  modalidades: {
    etiqueta: "Servicios",
    titulo: "Modalidades de Administración y Comercialización",
    subtitulo: "Cada propietario es distinto. Estas son las formas en que trabajamos contigo.",
    intro: "En Livic entendemos que cada propietario tiene necesidades diferentes, por eso contamos con distintas modalidades de trabajo que permiten adaptar la administración, comercialización y operación del inmueble de manera flexible, organizada y transparente.",

    anuncio: {
      titulo: "1. Creación y configuración del anuncio",
      incluye: [
        "Configuración inicial en plataformas digitales",
        "Redacción y optimización del anuncio",
        "Configuración de tarifas y disponibilidad",
        "Parametrización de huéspedes, normas y reservas",
        "Organización inicial para salida al mercado",
      ],
      modalidades: [
        {
          nombre: "Modalidad A — Cuenta del propietario",
          ideal: "Propietarios que desean mantener el anuncio y la cuenta directamente a su nombre.",
          creacionValor: "Desde $200.000 COP",
          propiedadAnuncio: "Propietario",
          comision: "10 %",
          gestion: "Incluida",
          nota: "En esta modalidad el anuncio queda como activo digital del propietario.",
        },
        {
          nombre: "Modalidad B — Cuenta Livic",
          ideal: "Propietarios que prefieren delegar completamente el manejo comercial y aprovechar el posicionamiento y reputación de Livic.",
          creacionValor: "Sin costo inicial",
          propiedadAnuncio: "Livic",
          comision: "10 %",
          gestion: "Incluida",
          nota: "En esta modalidad Livic asume directamente el manejo estratégico y comercial del anuncio.",
          recomendada: true,
        },
      ] as ModalidadAnuncio[],
    },

    fotografia: {
      titulo: "2. Fotografía profesional y material visual",
      intro: "La presentación visual del inmueble es uno de los factores más importantes para aumentar reservas y mejorar el posicionamiento en plataformas digitales.",
      incluye: [
        "Fotografías profesionales",
        "Preparación visual y ambientación básica",
        "Organización estratégica del espacio",
        "Edición y optimización de imágenes",
        "Videos o material audiovisual complementario",
      ],
      tarifas: [
        { servicio: "Fotografía profesional", valor: "Según cotización" },
        { servicio: "Video o material audiovisual", valor: "Según cotización" },
      ] as TarifaServicio[],
      nota: "El valor dependerá del tamaño del inmueble, cantidad de espacios, requerimientos visuales y tipo de contenido solicitado.",
    },

    administracion: {
      titulo: "3. Administración y operación del inmueble",
      incluye: [
        "Atención al huésped",
        "Check in y check out",
        "Coordinación de limpieza",
        "Supervisión del inmueble",
        "Coordinación de mantenimientos",
        "Manejo de calendarios y reservas",
        "Acompañamiento administrativo y operativo",
      ],
      feeTitulo: "Fee administrativo mensual",
      fees: [
        { tipo: "Apartaestudios y apartamentos pequeños", fee: "Desde $200.000 COP" },
        { tipo: "Apartamentos medianos o familiares", fee: "Desde $300.000 COP" },
        { tipo: "Propiedades amplias, premium o de alta operación", fee: "Según evaluación" },
      ] as FeeAdministrativo[],
      notas: [
        "Este valor contempla el acompañamiento operativo y administrativo del apartamento, seguimiento de reservas, coordinación operativa y supervisión general del inmueble.",
        "Durante la etapa inicial de posicionamiento y maduración del anuncio, Livic podrá otorgar un período sin cobro de fee administrativo mensual, permitiendo enfocar los esfuerzos en fortalecer la ocupación, reputación y estabilidad comercial del inmueble.",
      ],
    },

    comision: {
      titulo: "4. Comisión por comercialización",
      porcentaje: "10%",
      intro: "Livic manejará una comisión del 10 % sobre las reservas efectivas generadas, correspondiente a:",
      incluye: [
        "Gestión comercial",
        "Atención de reservas",
        "Manejo de plataformas",
        "Estrategia de posicionamiento",
        "Comunicación con huéspedes",
        "Seguimiento operativo de la reserva",
      ],
      nota: "La comisión será aplicada sobre el valor neto de las reservas efectivamente confirmadas.",
    },
  },
} as const;
