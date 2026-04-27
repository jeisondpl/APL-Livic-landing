/**
 * apartments.ts
 * Fuente estática de datos de apartamentos del catálogo LIVIC.
 * Agregar nuevos apartamentos aquí mismo; catalog.ts los expone.
 */

// ─── Tipos ────────────────────────────────────────────────────────────────────

export interface ApartmentPhoto {
  /** Ruta relativa desde /public (se sirve desde la raíz) */
  src: string;
  /** Descripción accesible de la imagen */
  alt: string;
}

export interface ApartmentHost {
  nombre: string;
  empresa?: string;
  calificacion?: number;
  resenas?: number;
  anosExperiencia?: number;
  /** Ruta a foto de perfil (placeholder si no existe) */
  avatarSrc?: string;
}

export interface ApartmentAmenityItem {
  nombre: string;
  icono: string;
}

export interface ApartmentAmenityCategory {
  /** Etiqueta visible en la UI */
  titulo: string;
  /** Icono emoji representativo */
  icono: string;
  /** Lista de amenidades en esa categoría */
  items: ApartmentAmenityItem[];
}

export interface ApartmentLocation {
  ciudad: string;
  departamento: string;
  pais: string;
  lat: number;
  lng: number;
  cercaDe?: string;
  descripcionUbicacion?: string;
  accesoPlaya?: boolean;
  distanciaPlayas?: string;
}

export interface ApartmentService {
  etiqueta: string;
  disponible: boolean;
  nota?: string;
}

export interface Apartment {
  /** Slug único para la URL: /apartamentos/{slug} */
  slug: string;
  /** Nombre de marketing */
  nombre: string;
  /** Edificio / conjunto */
  edificio: string;
  /** Número de apartamento */
  apartamento: string;
  /** Piso */
  piso: number;
  /** Tipo de propiedad */
  tipo: string;

  // ── Capacidad
  huespedes: number;
  habitaciones: number;
  camas: number;
  banos: number;

  // ── Ubicación
  ubicacion: ApartmentLocation;

  // ── Hosts
  anfitrionPrincipal: ApartmentHost;
  coanfitrion?: ApartmentHost;

  // ── Amenidades por categoría
  amenidades: ApartmentAmenityCategory[];

  // ── Servicios / políticas
  servicios: ApartmentService[];

  // ── Cosas que NO incluye (transparencias)
  noIncluidos: string[];

  // ── Características badge-level
  badges: string[];

  // ── Multimedia
  /** Foto principal (hero) */
  heroPhoto: ApartmentPhoto;
  /** Galería completa */
  galeria: ApartmentPhoto[];

  // ── Copy marketing (estilo Lina)
  descripcionCorta: string;
  descripcionLarga: string;
  frasePosituelo: string;

  // ── Edificio
  edificioAmenidades: ApartmentAmenityItem[];
  edificioReglas: ApartmentAmenityItem[];

  // ── Check-in / Check-out
  checkIn: string;
  checkOut: string;
  notas: string[];

  // ── Precio
  /** Precio por noche en USD. Opcional; si no existe la Card muestra ubicación. */
  precioNoche?: number;

  // ── Airbnb calendar
  airbnbCalendarUrl?: string;

  // ── Integración con API LIVIC (cotizador "Cotiza tu estadía")
  /** Slug del apartamento en la API LIVIC. Cuando está presente, la página
   *  habilita el cotizador en tiempo real con pricing vigente. Si es undefined
   *  el cotizador no aparece. Puede diferir del `slug` del catálogo. */
  apiSlug?: string;
}

// ─── Fotos del apartamento 1008 ──────────────────────────────────────────────
// Rutas relativas al directorio public/

const BASE_1008 = "/source/salgerosuite/1008";

const FOTOS_1008: ApartmentPhoto[] = [
  { src: `${BASE_1008}/IMG_20260122_160229826_HDR.jpg`, alt: "Vista general del apartamento 1008" },
  { src: `${BASE_1008}/IMG_20260122_160254458_HDR.jpg`, alt: "Sala principal con mobiliario moderno" },
  { src: `${BASE_1008}/IMG_20260122_160306742_HDR.jpg`, alt: "Comedor con mesa central" },
  { src: `${BASE_1008}/IMG_20260122_160317794_HDR.jpg`, alt: "Habitación principal con cama queen" },
  { src: `${BASE_1008}/IMG_20260122_160332581_HDR.jpg`, alt: "Baño principal" },
  { src: `${BASE_1008}/IMG_20260122_160352336_HDR.jpg`, alt: "Cocina equipada" },
  { src: `${BASE_1008}/IMG_20260122_160402238_HDR.jpg`, alt: "Balcón con vista parcial al mar" },
  { src: `${BASE_1008}/IMG_20260122_160505901_HDR.jpg`, alt: "Espacio social convertible" },
  { src: `${BASE_1008}/IMG_20260122_160600698_HDR.jpg`, alt: "Cama abatible doble en sala" },
  { src: `${BASE_1008}/IMG_20260122_160604316_HDR.jpg`, alt: "Puerta corrediza del segundo dormitorio" },
  { src: `${BASE_1008}/IMG_20260122_160616948_HDR.jpg`, alt: "Aire acondicionado en habitación" },
  { src: `${BASE_1008}/IMG_20260122_160722671.jpg`, alt: "Detalle de mobiliario" },
  { src: `${BASE_1008}/IMG_20260122_161019869_HDR.jpg`, alt: "Entrada y recepción del edificio" },
  { src: `${BASE_1008}/IMG_20260122_161125216_HDR.jpg`, alt: "Zona de lavandería con lavadora" },
  { src: `${BASE_1008}/IMG_20260122_161216126_HDR.jpg`, alt: "Mesa del comedor como estación de trabajo" },
  { src: `${BASE_1008}/IMG_20260122_162142366_HDR.jpg`, alt: "Piscina del edificio Salguero Suite" },
  { src: `${BASE_1008}/IMG_20260122_162406550_HDR.jpg`, alt: "Jacuzzi del edificio" },
  { src: `${BASE_1008}/IMG_20260122_162500201_HDR.jpg`, alt: "Gimnasio del edificio" },
  { src: `${BASE_1008}/IMG_20260122_164452424_HDR.jpg`, alt: "Vista desde el balcón piso 10" },
  { src: `${BASE_1008}/IMG_20260122_164714758_HDR.jpg`, alt: "Exterior del edificio Salguero Suite" },
];

// ─── Apartamento 1008 – Salguero Suite ───────────────────────────────────────

const apartment1008: Apartment = {
  slug: "salguero-suite-1008",
  nombre: "Suite en Salguero: Piso 10, Vista al Mar",
  edificio: "Salguero Suite",
  apartamento: "1008",
  piso: 10,
  tipo: "Apartamento entero",

  huespedes: 4,
  habitaciones: 2,
  camas: 2,
  banos: 2,

  ubicacion: {
    ciudad: "Gaira",
    departamento: "Magdalena",
    pais: "Colombia",
    lat: 11.1875643,
    lng: -74.2312825,
    cercaDe: "Santa Marta",
    accesoPlaya: true,
    distanciaPlayas: "~200 m (aprox. 5 min caminando)",
    descripcionUbicacion:
      "Ubicado en Playa Salguero, una zona tranquila y vacacional. La playa está a unos 200 metros de la recepción. No hay salida directa al mar, pero el acceso es caminando, rápido y tranquilo.",
  },

  anfitrionPrincipal: {
    nombre: "Lina",
    empresa: "LIVIC",
    calificacion: 4.6,
    resenas: 5,
    anosExperiencia: 3,
  },
  coanfitrion: {
    nombre: "Zharick",
  },

  amenidades: [
    {
      titulo: "Dormitorio y Lavandería",
      icono: "🛏️",
      items: [
        { nombre: "Lavadora", icono: "WashingMachine" },
        { nombre: "Ganchos para la ropa", icono: "Shirt" },
        { nombre: "Sábanas", icono: "Bed" },
        { nombre: "Almohadas y mantas adicionales", icono: "Sparkles" },
        { nombre: "Persianas o cortinas opacas (blackout)", icono: "Blinds" },
        { nombre: "Armario", icono: "Archive" },
        { nombre: "Plancha de ropa", icono: "Shirt" },
      ],
    },
    {
      titulo: "Entretenimiento",
      icono: "📺",
      items: [
        { nombre: "2 televisores (habitación y sala)", icono: "Tv" },
        { nombre: "Sistema de sonido Bluetooth", icono: "Speaker" },
        { nombre: "Conexión Ethernet", icono: "Network" },
        { nombre: "Equipo para hacer ejercicio", icono: "Dumbbell" },
      ],
    },
    {
      titulo: "Climatización",
      icono: "❄️",
      items: [
        { nombre: "2 aires acondicionados (habitación y sala)", icono: "Wind" },
      ],
    },
    {
      titulo: "Internet y Oficina",
      icono: "📶",
      items: [
        { nombre: "WiFi estable (fibra óptica en el edificio)", icono: "Wifi" },
        { nombre: "Coworking disponible en el primer piso del edificio", icono: "Network" },
        { nombre: "Mesa del comedor como estación de trabajo", icono: "Laptop" },
      ],
    },
    {
      titulo: "Cocina",
      icono: "🍳",
      items: [
        { nombre: "Cocina completa", icono: "ChefHat" },
        { nombre: "Estufa a gas Challenger con horno", icono: "Flame" },
        { nombre: "Microondas Samsung", icono: "Microwave" },
        { nombre: "Air fryer", icono: "Wind" },
        { nombre: "Cafetera de filtro", icono: "Coffee" },
        { nombre: "Licuadora", icono: "Blend" },
        { nombre: "Sanduchera", icono: "UtensilsCrossed" },
        { nombre: "Utensilios básicos para cocinar", icono: "UtensilsCrossed" },
        { nombre: "Platos y cubiertos", icono: "Utensils" },
      ],
    },
    {
      titulo: "Exterior",
      icono: "🌊",
      items: [
        { nombre: "Balcón con vista parcial al mar (piso 10)", icono: "Sunrise" },
      ],
    },
  ],

  servicios: [
    { etiqueta: "Check-in autónomo", disponible: true, nota: "Cerradura electrónica con PIN" },
    { etiqueta: "Estadías largas", disponible: true, nota: "Desde 28 días" },
    { etiqueta: "Seguridad 24/7", disponible: true, nota: "Seguridad privada del edificio" },
    { etiqueta: "Mascotas permitidas", disponible: false },
    { etiqueta: "Agua caliente", disponible: false, nota: "El apartamento no cuenta con agua caliente" },
    { etiqueta: "Parqueadero", disponible: false, nota: "Por disponibilidad, no garantizado" },
  ],

  noIncluidos: [
    "Secadora",
    "Detector de humo",
    "Detector de monóxido de carbono",
    "Calefacción",
    "Agua caliente",
    "Café ni azúcar (no se deja en el kit)",
  ],

  badges: [
    "Vista al mar",
    "Piso 10",
    "4 huéspedes",
    "2 habitaciones",
    "2 baños",
  ],

  heroPhoto: FOTOS_1008[0],
  galeria: FOTOS_1008,

  descripcionCorta:
    "Refugio en el piso 10 de Salguero Suite con balcón y vista parcial al mar. Ideal para escapadas en pareja, viajes en familia y workations.",

  descripcionLarga:
    "Apartamento completo para hasta 4 huéspedes con 2 baños. Cuenta con una habitación principal cerrada con cama queen y baño privado, y una segunda habitación flexible: la sala se convierte con cama abatible doble y puerta corrediza para mayor privacidad. " +
    "El edificio ofrece piscina, jacuzzi, gimnasio, sauna y coworking. El mar está a unos 200 metros, y el ambiente de Playa Salguero es tranquilo y vacacional.",

  frasePosituelo:
    "Un lugar donde realmente te sientes en casa, no solo de visita.",

  edificioAmenidades: [
    { nombre: "Piscina (horario 9 a.m. – 8 p.m.)", icono: "Waves" },
    { nombre: "Jacuzzi", icono: "Bath" },
    { nombre: "Gimnasio", icono: "Dumbbell" },
    { nombre: "Sauna", icono: "Wind" },
    { nombre: "Coworking (primer piso)", icono: "Network" },
    { nombre: "Minimarket (local externo)", icono: "Store" },
    { nombre: "Ascensor", icono: "ArrowUpDown" },
    { nombre: "Estacionamiento (por disponibilidad)", icono: "Car" },
  ],

  edificioReglas: [
    { nombre: "No se permiten mascotas", icono: "PawPrint" },
    { nombre: "No se permite fumar", icono: "CigaretteOff" },
    { nombre: "No se permiten visitantes (durante la estadía)", icono: "Users" },
    { nombre: "No se permiten fiestas", icono: "Music" },
    { nombre: "Silencio desde las 10:00 p.m.", icono: "Moon" },
  ],

  checkIn: "3:00 p.m.",
  checkOut: "11:00 a.m.",

  notas: [
    "Registro obligatorio en recepción con documento físico.",
    "La administración cobra una manilla obligatoria: $20.000 COP por persona (niños desde 9 años), pago único en check-in. Solo tarjeta o transferencia.",
    "Se entrega un PIN de uso único para el primer ingreso; la tarjeta queda dentro del apartamento para ingresos posteriores.",
  ],

  airbnbCalendarUrl: "https://www.airbnb.com.co/calendar/ical/1608385896028957180.ics?t=088d0e1cf78b4b9cb254562b820c5d24",

  precioNoche: 250000,
};

// ─── Fotos del apartamento 915 ───────────────────────────────────────────────

const BASE_915 = "/source/reservadelmar/915";

const FOTOS_915: ApartmentPhoto[] = [
  { src: `${BASE_915}/IMG_3169-HDR.jpg`, alt: "Vista al mar Caribe desde el balcón del piso 9" },
  { src: `${BASE_915}/IMG_3180.jpg`, alt: "Vista lateral hacia el mar — bahía turquesa" },
  { src: `${BASE_915}/Sin-título-9.jpg`, alt: "Sillas Acapulco con vistas a la Sierra Nevada" },
  { src: `${BASE_915}/Sin-título-10.jpg`, alt: "Vista panorámica Sierra Nevada y vegetación" },
  { src: `${BASE_915}/Sin-título-8.jpg`, alt: "Sofá azul con acceso al balcón y vista a la Sierra" },
  { src: `${BASE_915}/Sin-título-1.jpg`, alt: "Sillones geométricos y puertas corredizas de vidrio" },
  { src: `${BASE_915}/IMG_3000.jpg`, alt: "Estantería con velero y pelícano artesanal" },
  { src: `${BASE_915}/Sin-título-7.jpg`, alt: "Ancla decorativa turquesa, ropa de cama azul y gris" },
  { src: `${BASE_915}/Sin-título-6.jpg`, alt: "Cama doble, espejo tipo sol, acceso al baño en suite" },
  { src: `${BASE_915}/Sin-título-3.jpg`, alt: "Cama doble, ancla azul, TV montada" },
  { src: `${BASE_915}/Sin-título-2.jpg`, alt: "Dos camas individuales, cangrejo artesanal multicolor" },
  { src: `${BASE_915}/Sin-título-4.jpg`, alt: "Armario empotrado, estantería de madera" },
  { src: `${BASE_915}/IMG_3091.jpg`, alt: "Ducha de lluvia, cabina de vidrio, encimera de mármol" },
  { src: `${BASE_915}/Sin-título-5.jpg`, alt: "Velero decorativo colgante, encimera de mármol" },
  { src: `${BASE_915}/IMG_3115.jpg`, alt: "Armario con toallas blancas y segundo baño al fondo" },
  { src: `${BASE_915}/IMG_3092.jpg`, alt: "Detalle decorativo del apartamento 915" },
  { src: `${BASE_915}/IMG_3095.jpg`, alt: "Detalle interior del apartamento 915" },
  { src: `${BASE_915}/IMG_3181.jpg`, alt: "Vista exterior desde el apartamento 915" },
];

// ─── Apartamento 915 – Reserva del Mar ───────────────────────────────────────

const apartment915: Apartment = {
  slug: "reserva-del-mar-915",
  nombre: "Balcón Piso 9 | Caribe + Sierra Nevada | 2 Hab",
  edificio: "Reserva del Mar",
  apartamento: "915",
  piso: 9,
  tipo: "Alojamiento entero",

  huespedes: 4,
  habitaciones: 2,
  camas: 3,
  banos: 2,

  ubicacion: {
    ciudad: "Santa Marta",
    departamento: "Magdalena",
    pais: "Colombia",
    lat: 11.1860,
    lng: -74.2290,
    cercaDe: "Playa Salguero",
    accesoPlaya: true,
    distanciaPlayas: "Acceso directo a la playa",
    descripcionUbicacion:
      "Ubicado en Playa Salguero, Reserva del Mar es un conjunto de lujo valorado con 4.8 estrellas con acceso directo al mar Caribe. A 3 minutos del Rodadero, 20 minutos del centro histórico y 15 minutos del aeropuerto Simón Bolívar.",
  },

  anfitrionPrincipal: {
    nombre: "Lina",
    empresa: "LIVIC",
    calificacion: 4.8,
    resenas: 0,
    anosExperiencia: 3,
  },

  amenidades: [
    {
      titulo: "Dormitorio y Lavandería",
      icono: "🛏️",
      items: [
        { nombre: "Lavadora", icono: "WashingMachine" },
        { nombre: "Armario empotrado", icono: "Archive" },
        { nombre: "Sábanas y toallas", icono: "Bed" },
      ],
    },
    {
      titulo: "Entretenimiento",
      icono: "📺",
      items: [
        { nombre: "TV en habitación principal", icono: "Tv" },
      ],
    },
    {
      titulo: "Climatización",
      icono: "❄️",
      items: [
        { nombre: "Aire acondicionado en habitación principal", icono: "Wind" },
        { nombre: "Aire acondicionado en habitación secundaria", icono: "Wind" },
      ],
    },
    {
      titulo: "Internet",
      icono: "📶",
      items: [
        { nombre: "WiFi (CLARO-332A)", icono: "Wifi" },
      ],
    },
    {
      titulo: "Cocina",
      icono: "🍳",
      items: [
        { nombre: "Refrigerador", icono: "Refrigerator" },
        { nombre: "Microondas", icono: "Microwave" },
        { nombre: "Cafetera", icono: "Coffee" },
        { nombre: "Utensilios básicos de cocina", icono: "UtensilsCrossed" },
      ],
    },
    {
      titulo: "Exterior",
      icono: "🌊",
      items: [
        { nombre: "Balcón con vista dual: Caribe + Sierra Nevada (piso 9)", icono: "Sunrise" },
        { nombre: "Sillas tipo Acapulco", icono: "Armchair" },
      ],
    },
  ],

  servicios: [
    { etiqueta: "Check-in autónomo", disponible: true, nota: "Cerradura inteligente con código de un solo uso" },
    { etiqueta: "Estadías largas", disponible: true, nota: "Hasta 30 noches; más de 30 consultar condiciones" },
    { etiqueta: "Seguridad 24/7", disponible: true, nota: "Portería y vigilancia privada del conjunto" },
    { etiqueta: "Mascotas permitidas", disponible: false },
    { etiqueta: "Parqueadero", disponible: true, nota: "Disponible en el conjunto" },
  ],

  noIncluidos: [
    "Manilla de acceso al resort (se paga en recepción: $57.500 COP/persona desde 9 años, solo tarjeta)",
    "Detector de monóxido de carbono",
    "Calefacción",
  ],

  badges: [
    "Vista al Caribe",
    "Piso 9",
    "4 huéspedes",
    "2 habitaciones",
    "2 baños",
    "Acceso directo a la playa",
  ],

  heroPhoto: FOTOS_915[0],
  galeria: FOTOS_915,

  descripcionCorta:
    "Despierta con el Caribe frente a ti. Piso 9 en Reserva del Mar (4.8★) con balcón de vistas duales al mar y la Sierra Nevada, decoración náutica artesanal y acceso completo al resort.",

  descripcionLarga:
    "99 m² decorados con arte náutico artesanal —anclas, veleros, cangrejos— que crean una identidad caribeña coherente y con carácter. " +
    "La habitación principal tiene cama doble, A/C, TV y baño en suite con encimera de mármol y ducha de lluvia con vista directa al Caribe. " +
    "La habitación secundaria tiene dos camas individuales, A/C y arte caribeño artesanal con vistas a la Sierra Nevada. " +
    "El balcón en piso 9 ofrece vistas duales sin obstrucciones: mar Caribe de un lado, Sierra Nevada del otro. " +
    "El conjunto Reserva del Mar incluye piscina para adultos, piscina infantil, jacuzzi, acceso directo a la playa, gimnasio, spa, parqueadero y seguridad 24 horas.",

  frasePosituelo:
    "Un balcón entre el Caribe y la Sierra Nevada. Pocas vistas así existen.",

  edificioAmenidades: [
    { nombre: "Piscina para adultos", icono: "Waves" },
    { nombre: "Piscina infantil", icono: "Waves" },
    { nombre: "Jacuzzi", icono: "Bath" },
    { nombre: "Acceso directo a la playa", icono: "Anchor" },
    { nombre: "Gimnasio completamente equipado", icono: "Dumbbell" },
    { nombre: "Spa", icono: "Sparkles" },
    { nombre: "Parqueadero", icono: "Car" },
    { nombre: "WiFi en zonas comunes", icono: "Wifi" },
    { nombre: "Portería y seguridad 24 horas", icono: "Shield" },
  ],

  edificioReglas: [
    { nombre: "No se admiten mascotas", icono: "PawPrint" },
    { nombre: "No se permiten fiestas ni eventos", icono: "Music" },
    { nombre: "No fumar (interior ni balcón)", icono: "CigaretteOff" },
    { nombre: "Máximo 4 huéspedes (incluye niños y bebés)", icono: "Users" },
    { nombre: "Silencio desde las 10:00 p.m.", icono: "Moon" },
    { nombre: "Solo personas registradas en la reserva", icono: "Lock" },
  ],

  checkIn: "3:00 p.m.",
  checkOut: "11:00 a.m.",

  precioNoche: 320000,

  notas: [
    "Identificarse en portería con nombre y número de reserva al llegar.",
    "Dirigirse al lobby Torres 3 y 4 para adquirir la manilla de acceso ($57.500 COP por persona desde 9 años, SOLO TARJETA). Este valor no está incluido en la reserva.",
    "Se envía un código de apertura de un solo uso antes de la llegada. Sin llaves, sin esperas.",
    "La tarjeta de energía está sobre el mesón de la cocina — insertarla en el tarjetero de la entrada para activar la electricidad.",
    "Vientos fuertes en el balcón: mantener puertas y ventanas cerradas al entrar y salir.",
  ],
};

// ─── Fotos del apartamento 519 ───────────────────────────────────────────────

const BASE_519 = "/source/apt519";

const FOTOS_519: ApartmentPhoto[] = [
  { src: `${BASE_519}/IMG_20260128_092308153_HDR.jpg`, alt: "Estudio completo: sofá turquesa, cama doble y armario empotrado" },
  { src: `${BASE_519}/IMG_20260128_092318483_HDR.jpg`, alt: "Vista del estudio desde la entrada con ventanal y montañas" },
  { src: `${BASE_519}/IMG_20260128_092332600.jpg`,     alt: "Área de sala con sofá turquesa y vista a la Sierra Nevada" },
  { src: `${BASE_519}/IMG_20260128_092344672.jpg`,     alt: "Cama doble con ropa de cama premium y ventanal al fondo" },
  { src: `${BASE_519}/IMG_20260128_092353800_HDR.jpg`, alt: "Sofá cama turquesa, mesa de noche y aire acondicionado" },
  { src: `${BASE_519}/IMG_20260128_092408707_HDR.jpg`, alt: "Escritorio de trabajo con sillas y TV de pantalla grande" },
  { src: `${BASE_519}/IMG_20260128_092419374_HDR.jpg`, alt: "TV grande montada con escritorio y sillas tipo Eames" },
  { src: `${BASE_519}/IMG_20260128_092505049_HDR.jpg`, alt: "Amplia vista del estudio con sofá, escritorio y TV" },
  { src: `${BASE_519}/IMG_20260128_092523627.jpg`,     alt: "Sofá turquesa con almohadas y ventanal panorámico" },
  { src: `${BASE_519}/IMG_20260128_092624343_HDR.jpg`, alt: "Cocina integral con nevera Challenger, estufa y horno" },
  { src: `${BASE_519}/IMG_20260128_092649903_HDR.jpg`, alt: "Cocina equipada con cafetera, extractor y nevera" },
  { src: `${BASE_519}/IMG_20260128_092710234_HDR.jpg`, alt: "Detalle de la cocina con mesón y gabinetes modernos" },
  { src: `${BASE_519}/IMG_20260128_092746592_HDR.jpg`, alt: "Área de comedor integrada con sillas y barra" },
  { src: `${BASE_519}/IMG_20260128_092751523_HDR.jpg`, alt: "Mesa de comedor con sillas y acceso a la cocina" },
  { src: `${BASE_519}/IMG_20260128_092817592_HDR.jpg`, alt: "Aire acondicionado mini-split y sofá turquesa" },
  { src: `${BASE_519}/IMG_20260128_092831903_HDR.jpg`, alt: "Cama doble con sofá cama y AC — espacio funcional" },
  { src: `${BASE_519}/IMG_20260128_092835921_HDR.jpg`, alt: "Ventanal con vistas a la Sierra Nevada desde la cama" },
  { src: `${BASE_519}/IMG_20260128_092847747_HDR.jpg`, alt: "Armario empotrado en madera con cajones" },
  { src: `${BASE_519}/IMG_20260128_092922450_HDR.jpg`, alt: "Zona de lavandería con lavadora y calentador de agua" },
  { src: `${BASE_519}/IMG_20260128_092926792_HDR.jpg`, alt: "Lavadora Samsung y calentador de paso" },
  { src: `${BASE_519}/IMG_20260128_092935543_HDR.jpg`, alt: "Detalle del closet y zona de lavandería" },
  { src: `${BASE_519}/IMG_20260128_092946386_HDR.jpg`, alt: "Baño moderno con ducha y accesorios" },
  { src: `${BASE_519}/IMG_20260128_093006800_HDR.jpg`, alt: "Baño con ducha, encimera y espejo" },
  { src: `${BASE_519}/IMG_20260128_093025950_HDR.jpg`, alt: "Detalle del baño con accesorios de calidad" },
  { src: `${BASE_519}/IMG_20260128_093217164_HDR.jpg`, alt: "Vista nocturna del estudio con iluminación cálida" },
  { src: `${BASE_519}/IMG_20260128_093219253_HDR.jpg`, alt: "Sala con mesita de centro y sillas de exterior" },
  { src: `${BASE_519}/IMG_20260128_093223044.jpg`,     alt: "Estudio iluminado con toda la decoración" },
  { src: `${BASE_519}/IMG_20260128_093316715_HDR.jpg`, alt: "Puerta de entrada del apartamento 519" },
  { src: `${BASE_519}/IMG_20260128_093322265_HDR.jpg`, alt: "Número 519 en la puerta — acceso inteligente sin llave" },
];

// ─── Apartamento 519 ──────────────────────────────────────────────────────────

const apartment519: Apartment = {
  slug: "estudio-moderno-519",
  apiSlug: "519-519",
  nombre: "Estudio Moderno 519 | Vista Sierra Nevada | Piso 5",
  edificio: "Salguero Park",
  apartamento: "519",
  piso: 5,
  tipo: "Estudio completo",

  huespedes: 3,
  habitaciones: 1,
  camas: 2,
  banos: 1, 

  ubicacion: {
    ciudad: "Gaira",
    departamento: "Magdalena",
    pais: "Colombia",
    lat: 11.1872,
    lng: -74.2305,
    cercaDe: "Santa Marta",
    accesoPlaya: true,
    distanciaPlayas: "~300 m (aprox. 7 min caminando)",
    descripcionUbicacion:
      "Estudio moderno en piso 5 con vistas directas a la Sierra Nevada de Santa Marta. Ubicado en Playa Salguero, zona tranquila y vacacional a minutos del Rodadero y a 20 minutos del centro histórico.",
  },

  anfitrionPrincipal: {
    nombre: "Lina",
    empresa: "LIVIC",
    calificacion: 4.7,
    resenas: 0,
    anosExperiencia: 3,
  },
  coanfitrion: {
    nombre: "Zharick",
  },

  amenidades: [
    {
      titulo: "Dormitorio y Lavandería",
      icono: "🛏️",
      items: [
        { nombre: "Cama doble + sofá cama", icono: "Bed" },
        { nombre: "Armario empotrado", icono: "Archive" },
        { nombre: "Lavadora Samsung", icono: "WashingMachine" },
        { nombre: "Sábanas y toallas incluidas", icono: "Sparkles" },
        { nombre: "Persianas blackout", icono: "Blinds" },
        { nombre: "Tendedero de ropa", icono: "Shirt" },
      ],
    },
    {
      titulo: "Cocina y Comedor",
      icono: "🍳",
      items: [
        { nombre: "Nevera Challenger con dispensador de agua", icono: "Refrigerator" },
        { nombre: "Estufa de gas + horno", icono: "Flame" },
        { nombre: "Extractor de olores", icono: "Wind" },
        { nombre: "Cafetera", icono: "Coffee" },
        { nombre: "Utensilios de cocina completos", icono: "UtensilsCrossed" },
        { nombre: "Área de comedor", icono: "Table" },
      ],
    },
    {
      titulo: "Confort y Entretenimiento",
      icono: "📺",
      items: [
        { nombre: "Aire acondicionado mini-split", icono: "Wind" },
        { nombre: "TV pantalla grande", icono: "Tv" },
        { nombre: "Escritorio de trabajo con 2 sillas", icono: "Monitor" },
        { nombre: "Calentador de agua a gas", icono: "Flame" },
        { nombre: "Cerradura inteligente (sin llave)", icono: "Lock" },
      ],
    },
  ],

  servicios: [
    { etiqueta: "WiFi de alta velocidad", disponible: true },
    { etiqueta: "Aire acondicionado", disponible: true },
    { etiqueta: "Cocina equipada", disponible: true },
    { etiqueta: "Lavadora", disponible: true },
    { etiqueta: "TV pantalla grande", disponible: true },
    { etiqueta: "Estacionamiento", disponible: false, nota: "No incluido, consultar disponibilidad" },
    { etiqueta: "Mascotas", disponible: false },
    { etiqueta: "Fumadores", disponible: false },
    { etiqueta: "Eventos o fiestas", disponible: false },
  ],

  noIncluidos: [
    "Estacionamiento (consultar disponibilidad en el edificio)",
    "Manilla de acceso a la playa del edificio (valor adicional)",
  ],

  badges: [
    "Estudio moderno",
    "Vista Sierra Nevada",
    "Cocina completa",
    "Piso 5",
    "Acceso sin llave",
    "Lavadora incluida",
  ],

  heroPhoto: FOTOS_519[0],
  galeria: FOTOS_519.slice(1),

  descripcionCorta:
    "Estudio moderno y luminoso en piso 5 con vistas a la Sierra Nevada. Sofá cama turquesa, cama doble, cocina integral completa, lavadora y acceso inteligente sin llave.",

  descripcionLarga:
    "Bienvenido al Estudio 519, un espacio contemporáneo y funcional pensado para quienes buscan comodidad sin renunciar al estilo. Ubicado en el piso 5 con vistas directas a la Sierra Nevada de Santa Marta, este estudio integra de forma elegante la zona de dormir, sala, cocina y trabajo en un solo ambiente luminoso y bien equipado. La cama doble con ropa de cama de calidad se complementa con un sofá cama turquesa para hasta 3 huéspedes. La cocina integral incluye nevera Challenger con dispensador, estufa de gas, horno, extractor y cafetera — todo lo necesario para preparar tus comidas. El escritorio con sillas te permite trabajar o estudiar con comodidad. Lavadora Samsung, calentador de agua a gas y cerradura inteligente completan la experiencia sin fricciones.",

  frasePosituelo:
    "Donde la Sierra Nevada se convierte en tu panorama de fondo cada mañana.",

  edificioAmenidades: [
    { nombre: "Piscina", icono: "Waves" },
    { nombre: "Seguridad 24/7", icono: "Shield" },
    { nombre: "Ascensor", icono: "ArrowUp" },
    { nombre: "Zona de BBQ", icono: "Flame" },
  ],

  edificioReglas: [
    { nombre: "No mascotas", icono: "PawPrint" },
    { nombre: "No fumadores en áreas comunes", icono: "Cigarette" },
    { nombre: "No eventos o fiestas", icono: "Music" },
    { nombre: "Silencio nocturno después de las 10 pm", icono: "Moon" },
  ],

  checkIn: "3:00 p.m.",
  checkOut: "11:00 a.m.",

  notas: [
    "Acceso con código de apertura de un solo uso enviado antes de la llegada — sin llaves, sin esperas.",
    "Manilla de acceso a zonas comunes del edificio con costo adicional por persona.",
    "El calentador de agua es a gas paso — funciona de forma inmediata.",
  ],

  precioNoche: 180000,
};

// ─── Fotos del apartamento 419 – Reserva del Mar II ─────────────────────────

const BASE_419 = "/source/rdm2-419";

const FOTOS_419: ApartmentPhoto[] = [
  { src: `${BASE_419}/IMG_20260212_104825926.jpg`,           alt: "Estudio luminoso — vista general desde zona comedor hacia sala y balcón con la Sierra Nevada al fondo" },
  { src: `${BASE_419}/IMG_20260212_105201695.jpg`,           alt: "Estudio abierto — cama doble, sofá crema, A/C y pintura de elefante azul y dorado" },
  { src: `${BASE_419}/IMG_20260212_105237112.jpg`,           alt: "Vista desde la cocina hacia el estudio y el balcón — amplitud y luz natural" },
  { src: `${BASE_419}/IMG_20260212_105719106-Recuperado.jpg`,alt: "Estudio completo — sofá, closet empotrado, TV y escritorio en una sola vista" },
  { src: `${BASE_419}/IMG_20260212_105115928.jpg`,           alt: "Cama doble con cabecero tapizado — acceso directo al balcón con vista a la Sierra Nevada" },
  { src: `${BASE_419}/IMG_20260212_105130134.jpg`,           alt: "Cama doble y closet empotrado de madera clara — luz natural desde el balcón" },
  { src: `${BASE_419}/IMG_20260212_105338697.jpg`,           alt: "Cama, TV, zona de trabajo y balcón — todo en el mismo espacio abierto" },
  { src: `${BASE_419}/IMG_20260212_105618230_HDR.jpg`,       alt: "Cama doble con closet y vista panorámica a la Sierra Nevada" },
  { src: `${BASE_419}/IMG_20260212_105258951.jpg`,           alt: "Sala de estar — sofá crema, pintura de elefante, planta Dracaena y A/C" },
  { src: `${BASE_419}/IMG_20260212_105637255.jpg`,           alt: "Sofá cama y planta decorativa — luz natural desde el balcón" },
  { src: `${BASE_419}/IMG_20260212_105731023.jpg`,           alt: "Sofá cama en posición de descanso — espacio amplio y luminoso" },
  { src: `${BASE_419}/IMG_20260212_105003341.jpg`,           alt: "Cocina completa — estufa a gas, horno, nevera Midea y gabinetes blancos" },
  { src: `${BASE_419}/IMG_20260212_105304274.jpg`,           alt: "TV, barra corrida con sillas Eames y cocina — diseño funcional ideal para Workation" },
  { src: `${BASE_419}/IMG_20260212_105327182.jpg`,           alt: "Cocina vista desde la entrada — layout corredor limpio y bien organizado" },
  { src: `${BASE_419}/IMG_20260212_105806280_HDR.jpg`,       alt: "Detalle de la cocina — campana extractora Mabe, estantería con vasos y blender" },
  { src: `${BASE_419}/MEITU_20260217_102539321.jpg`,         alt: "Nevera Midea, lavadora y calentador a gas Rheem en closet de utilidades" },
  { src: `${BASE_419}/IMG_20260212_105418270.jpg`,           alt: "Vista desde el balcón — vegetación, edificios y cielo azul de Santa Marta" },
  { src: `${BASE_419}/IMG_20260212_105431828.jpg`,           alt: "Balcón con vista a la Sierra Nevada — cielo despejado y horizonte montañoso" },
  { src: `${BASE_419}/IMG_20260212_105516628_HDR.jpg`,       alt: "Vista lateral del balcón — Reserva del Mar I y el Caribe al fondo" },
  { src: `${BASE_419}/IMG_20260212_105521539_HDR.jpg`,       alt: "Balcón con silla Eames y puerta corrediza de vidrio — amplitud y privacidad" },
  { src: `${BASE_419}/IMG_20260212_105607528_HDR.jpg`,       alt: "Vista desde el interior al balcón — puerta corrediza y Sierra Nevada" },
  { src: `${BASE_419}/IMG_20260212_104736776_HDR.jpg`,       alt: "Baño completo — lavamanos con encimera de piedra, espejo y ducha de lluvia con partición de vidrio" },
];

// ─── Apartamento 419 – Reserva del Mar II ────────────────────────────────────

const apartment419: Apartment = {
  slug: "estudio-luminoso-rdm2-419",
  apiSlug: "419-reserva-ii-419",
  nombre: "Estudio Luminoso | 3 min Playa | Sierra+Mar",
  edificio: "Reserva del Mar II",
  apartamento: "419",
  piso: 4,
  tipo: "Alojamiento entero",

  huespedes: 3,
  habitaciones: 1,
  camas: 2,
  banos: 1,

  ubicacion: {
    ciudad: "Gaira",
    departamento: "Magdalena",
    pais: "Colombia",
    lat: 11.1911,
    lng: -74.2291,
    cercaDe: "El Rodadero",
    accesoPlaya: true,
    distanciaPlayas: "3 minutos en carro a Playa de Gaira",
    descripcionUbicacion:
      "Gaira es un sector residencial y turístico entre El Rodadero y el centro de Santa Marta. A 3 min en carro de la playa, 20 min del Centro Histórico y 15 min del aeropuerto Simón Bolívar. Taxi, InDriver y Uber disponibles.",
  },

  anfitrionPrincipal: {
    nombre: "Lina",
    empresa: "LIVIC",
    calificacion: 4.8,
    resenas: 0,
    anosExperiencia: 3,
  },

  amenidades: [
    {
      titulo: "Dormitorio y Descanso",
      icono: "🛏️",
      items: [
        { nombre: "Cama doble con cabecero tapizado", icono: "Bed" },
        { nombre: "Sofá cama (2-3 plazas, desplegable)", icono: "Sofa" },
        { nombre: "Armario empotrado puertas corredizas", icono: "Archive" },
        { nombre: "Ropa de cama y toallas incluidas", icono: "Sparkles" },
        { nombre: "Lavadora incluida", icono: "WashingMachine" },
        { nombre: "Calentador a gas Rheem", icono: "Flame" },
      ],
    },
    {
      titulo: "Cocina Completa",
      icono: "🍳",
      items: [
        { nombre: "Nevera Midea negra con dispensador de agua", icono: "Refrigerator" },
        { nombre: "Estufa a gas (4 puestos) + horno", icono: "Flame" },
        { nombre: "Campana extractora Mabe", icono: "Wind" },
        { nombre: "Blender / licuadora", icono: "Blend" },
        { nombre: "Vajilla, vasos y utensilios", icono: "UtensilsCrossed" },
        { nombre: "Lavaplatos en acero inoxidable", icono: "Droplets" },
      ],
    },
    {
      titulo: "Confort y Entretenimiento",
      icono: "📺",
      items: [
        { nombre: "Aire acondicionado", icono: "Wind" },
        { nombre: "TV montada (frente al comedor)", icono: "Tv" },
        { nombre: "WiFi de alta velocidad", icono: "Wifi" },
        { nombre: "Barra corrida + 2 sillas Eames (Workation)", icono: "Monitor" },
        { nombre: "Balcón privado con barandilla de vidrio", icono: "Sun" },
        { nombre: "Cerradura electrónica (sin llaves)", icono: "Lock" },
      ],
    },
  ],

  servicios: [
    { etiqueta: "WiFi de alta velocidad", disponible: true },
    { etiqueta: "Aire acondicionado", disponible: true },
    { etiqueta: "Cocina equipada completa", disponible: true },
    { etiqueta: "Lavadora", disponible: true },
    { etiqueta: "TV", disponible: true },
    { etiqueta: "Balcón privado", disponible: true },
    { etiqueta: "Zona de trabajo (Workation)", disponible: true },
    { etiqueta: "Detector de humo", disponible: true },
    { etiqueta: "Estacionamiento", disponible: false, nota: "Pendiente confirmar con administración" },
    { etiqueta: "Mascotas", disponible: false },
    { etiqueta: "Fumadores", disponible: false },
    { etiqueta: "Eventos o fiestas", disponible: false },
  ],

  noIncluidos: [
    "Manilla de acceso a zonas comunes del conjunto (se cobra en recepción al llegar, solo tarjeta)",
    "Estacionamiento (pendiente confirmación con administración)",
    "Early check-in / late check-out (disponible con costo adicional)",
  ],

  badges: [
    "Estudio de diseño",
    "Workation",
    "3 min Playa",
    "Vista Sierra Nevada",
    "Balcón privado",
    "Cocina completa",
  ],

  heroPhoto: FOTOS_419[0],
  galeria: FOTOS_419.slice(1),

  descripcionCorta:
    "Luz, brisa y la Sierra Nevada frente a ti. Estudio de diseño moderno en Reserva del Mar II — conjunto de playa en Gaira, a 3 minutos del mar. WiFi rápido, zona de trabajo, cocina completa, lavadora y balcón privado.",

  descripcionLarga:
    "Estudio luminoso en el piso 4 de Reserva del Mar II — conjunto residencial en Gaira, Santa Marta. Espacio de diseño abierto con todo lo que necesitas: cama doble con cabecero tapizado y ropa de cama de calidad, sofá cama crema para un huésped adicional, armario empotrado de madera clara y mesita de noche. La sala tiene sofá, mesa de vidrio con estructura metálica, planta Dracaena y una llamativa pintura de elefante en tonos azul, verde y dorado. La zona de trabajo y comedor combina una barra corrida con sillas Eames y TV montada — perfecta para Workation o cenar. Cocina integral completa con estufa a gas, horno, nevera Midea con dispensador, campana Mabe, blender y utensilios. Baño con ducha de lluvia y encimera de piedra. Lavadora y calentador Rheem en closet de servicio. Balcón privado con barandilla de vidrio y vistas a la Sierra Nevada.",

  frasePosituelo:
    "Trabajar bien y descansar mejor. Todo en el mismo espacio, a 3 minutos del mar.",

  edificioAmenidades: [
    { nombre: "Piscina (pendiente confirmar)", icono: "Waves" },
    { nombre: "Gimnasio (pendiente confirmar)", icono: "Dumbbell" },
    { nombre: "Parqueadero (pendiente confirmar)", icono: "Car" },
    { nombre: "Portería y seguridad 24 horas", icono: "Shield" },
  ],

  edificioReglas: [
    { nombre: "No mascotas", icono: "PawPrint" },
    { nombre: "No fumar (interior ni balcón)", icono: "Cigarette" },
    { nombre: "No fiestas ni eventos", icono: "Music" },
    { nombre: "Silencio 10:00 PM – 8:00 AM", icono: "Moon" },
    { nombre: "Máximo 2 huéspedes registrados", icono: "Users" },
  ],

  checkIn: "3:00 p.m.",
  checkOut: "11:00 a.m.",

  notas: [
    "Llegar a portería, registrarse con nombre y número de reserva.",
    "Adquirir manilla de acceso en recepción (monto pendiente — solo tarjeta, no incluida en la reserva).",
    "Ingresar con código de apertura de un solo uso enviado antes de la llegada.",
    "La tarjeta de energía está sobre el mesón de la cocina — insertarla en el tarjetero del muro para activar la electricidad.",
    "Al salir: dejar la tarjeta de energía sobre el mesón de la cocina.",
    "Mantener puertas y ventanas del balcón cerradas ante vientos fuertes.",
  ],

  precioNoche: 190000,
};

// ─── Fotos del apartamento 620 ───────────────────────────────────────────────

const BASE_620 = "/source/rdm2-620";

const FOTOS_620: ApartmentPhoto[] = [
  { src: `${BASE_620}/Sin-título-1.jpg`, alt: "Vista general del loft 620 - Reserva del Mar 2" },
  { src: `${BASE_620}/Sin-título-3.jpg`, alt: "Sala y zona social del apartaestudio" },
  { src: `${BASE_620}/Sin-título-4.jpg`, alt: "Cocina equipada del loft" },
  { src: `${BASE_620}/Sin-título-5.jpg`, alt: "Habitación con camas del apartaestudio" },
  { src: `${BASE_620}/Sin-título-7.jpg`, alt: "Baño completo del apartamento" },
  { src: `${BASE_620}/Sin-título-8.jpg`, alt: "Zona de trabajo privada" },
  { src: `${BASE_620}/Sin-título-9.jpg`, alt: "Balcón con vista a las montañas" },
  { src: `${BASE_620}/Sin-título-10.jpg`, alt: "Vista panorámica desde el piso 6" },
  { src: `${BASE_620}/image.png`, alt: "Piscina principal del edificio Reserva del Mar 2" },
  { src: `${BASE_620}/image copy.png`, alt: "Gimnasio equipado del edificio" },
  { src: `${BASE_620}/image copy 2.png`, alt: "Sala de juegos con billar y ping pong" },
  { src: `${BASE_620}/IMG_4730.jpg`, alt: "Exterior del edificio Reserva del Mar 2" },
  { src: `${BASE_620}/IMG_4732.jpg`, alt: "Lobby estilo hotelero del edificio" },
  { src: `${BASE_620}/terraza.jpg`, alt: "Terraza y zona social del edificio" },
  { src: `${BASE_620}/zona aseo.jpg`, alt: "Área de lavado con lavadora" },
];

// ─── Apartamento 620 – Reserva del Mar 2 ────────────────────────────────────

const apartment620: Apartment = {
  slug: "loft-vista-rdm2-620",
  nombre: "Loft con Vista, WiFi, A/C y Piscina",
  edificio: "Reserva del Mar 2",
  apartamento: "620",
  piso: 6,
  tipo: "Apartaestudio tipo Loft",

  huespedes: 4,
  habitaciones: 1,
  camas: 3,
  banos: 1,

  ubicacion: {
    ciudad: "Gaira",
    departamento: "Magdalena",
    pais: "Colombia",
    lat: 11.1912,
    lng: -74.2285,
    cercaDe: "Santa Marta",
    accesoPlaya: true,
    distanciaPlayas: "~6 minutos caminando (Playa de Gaira)",
    descripcionUbicacion:
      "Ubicado en Reserva del Mar 2, Cra. 2 #20-134, sector Gaira. Zona segura y de alto nivel, rodeada de gastronomía y entretenimiento. La Playa de Gaira está a aproximadamente 6 minutos caminando.",
  },

  anfitrionPrincipal: {
    nombre: "Sonia Patricia",
    empresa: "LIVIC",
    calificacion: 5.0,
    resenas: 12,
    anosExperiencia: 1,
  },

  amenidades: [
    {
      titulo: "Dormitorio y Lavandería",
      icono: "🛏️",
      items: [
        { nombre: "Lavadora", icono: "WashingMachine" },
        { nombre: "Ganchos para la ropa", icono: "Shirt" },
        { nombre: "Sábanas de algodón", icono: "Bed" },
        { nombre: "Almohadas y mantas adicionales", icono: "Sparkles" },
        { nombre: "Espacio para guardar ropa (clóset)", icono: "Archive" },
        { nombre: "Plancha", icono: "Shirt" },
        { nombre: "Tendedero de ropa", icono: "Shirt" },
      ],
    },
    {
      titulo: "Entretenimiento",
      icono: "📺",
      items: [
        { nombre: "TV", icono: "Tv" },
      ],
    },
    {
      titulo: "Climatización",
      icono: "❄️",
      items: [
        { nombre: "Aire acondicionado", icono: "Wind" },
      ],
    },
    {
      titulo: "Internet y Oficina",
      icono: "📶",
      items: [
        { nombre: "WiFi de alta velocidad (900 Mbps)", icono: "Wifi" },
        { nombre: "Zona de trabajo privada", icono: "Laptop" },
      ],
    },
    {
      titulo: "Cocina",
      icono: "🍳",
      items: [
        { nombre: "Cocina completa (refrigeradora, horno, fogón)", icono: "ChefHat" },
        { nombre: "Microondas", icono: "Microwave" },
        { nombre: "Cafetera de filtro", icono: "Coffee" },
        { nombre: "Licuadora", icono: "Blend" },
        { nombre: "Arrocera", icono: "UtensilsCrossed" },
        { nombre: "Utensilios básicos para cocinar", icono: "UtensilsCrossed" },
        { nombre: "Platos y cubiertos", icono: "Utensils" },
        { nombre: "Copas de vino", icono: "Wine" },
      ],
    },
    {
      titulo: "Baño",
      icono: "🚿",
      items: [
        { nombre: "Agua caliente (lavabo y ducha)", icono: "Droplets" },
        { nombre: "Acondicionador", icono: "Sparkles" },
        { nombre: "Jabón corporal", icono: "Sparkles" },
        { nombre: "Ducha exterior", icono: "Droplets" },
      ],
    },
    {
      titulo: "Exterior",
      icono: "🌊",
      items: [
        { nombre: "Balcón con vista a montañas y ciudad (piso 6)", icono: "Sunrise" },
        { nombre: "Entrada independiente", icono: "DoorOpen" },
      ],
    },
  ],

  servicios: [
    { etiqueta: "Check-in flexible", disponible: true, nota: "El mismo día" },
    { etiqueta: "Estadías largas", disponible: true, nota: "Desde 28 días con 25% de descuento" },
    { etiqueta: "Reservación inmediata", disponible: true, nota: "Reserva automática sin espera" },
    { etiqueta: "Mascotas permitidas", disponible: true, nota: "Sujeto a normativas locales" },
    { etiqueta: "Agua caliente", disponible: true },
    { etiqueta: "Estacionamiento gratuito", disponible: true, nota: "En las instalaciones del edificio" },
  ],

  noIncluidos: [
    "Detector de monóxido de carbono",
    "Calefacción",
  ],

  badges: [
    "Vista a montañas",
    "Piso 6",
    "4 huéspedes",
    "WiFi 900 Mbps",
    "Piscina",
  ],

  heroPhoto: FOTOS_620[0],
  galeria: FOTOS_620,

  descripcionCorta:
    "Elegante apartaestudio tipo loft de 36 m² en el piso 6 de Reserva del Mar 2. Ideal para viajes de negocios, trabajo remoto, parejas y familias pequeñas.",

  descripcionLarga:
    "Moderno y elegante apartaestudio ubicado en el piso 6, a solo 6 minutos caminando a la Playa de Gaira. " +
    "Ofrece vista a la montaña y parcial a la ciudad, ideal para el descanso. El espacio está totalmente equipado con internet de alta velocidad (900 Mbps) y aire acondicionado. " +
    "El edificio cuenta con piscina, jacuzzi, gimnasio equipado, sauna, coworking, sala de juegos con mesa de ping pong y billar, y lobby estilo hotelero. " +
    "Zona segura y de alto nivel, rodeada de gastronomía y entretenimiento.",

  frasePosituelo:
    "Tu espacio ideal para desconectar, trabajar o simplemente disfrutar de Santa Marta.",

  edificioAmenidades: [
    { nombre: "Piscina principal", icono: "Waves" },
    { nombre: "Jacuzzi", icono: "Bath" },
    { nombre: "Gimnasio equipado", icono: "Dumbbell" },
    { nombre: "Sauna", icono: "Wind" },
    { nombre: "Coworking", icono: "Network" },
    { nombre: "Sala de juegos (ping pong y billar)", icono: "Gamepad2" },
    { nombre: "Ascensor", icono: "ArrowUpDown" },
    { nombre: "Estacionamiento gratuito", icono: "Car" },
    { nombre: "Lobby estilo hotelero", icono: "Building" },
  ],

  edificioReglas: [
    { nombre: "Prohibido fumar dentro del apartamento", icono: "CigaretteOff" },
    { nombre: "No se permiten fiestas ni música en volumen alto", icono: "Music" },
    { nombre: "No se permiten visitantes no registrados", icono: "Users" },
    { nombre: "No abrir ventanal con A/C encendido", icono: "Wind" },
    { nombre: "Toallas de uso interno exclusivamente", icono: "Shirt" },
  ],

  checkIn: "3:00 p.m.",
  checkOut: "11:00 a.m.",

  notas: [
    "Llegar a portería, registrarse con nombre y número de reserva.",
    "Adquirir manilla de acceso en recepción (monto pendiente — solo tarjeta, no incluida en la reserva).",
    "Al confirmar la reserva se solicita información de todos los huéspedes para la autorización de ingreso.",
    "Los mayores de 9 años deben pagar manilla. Todo menor debe ingresar acompañado de sus padres o con autorización firmada.",
    "La basura debe depositarse en el shut ubicado al fondo del pasillo, a mano derecha.",
    "Edificio nuevo — el coworking no tiene internet por el momento.",
  ],

  precioNoche: 199090,
};

// ─── Fotos del apartamento 621 ───────────────────────────────────────────────

const BASE_621 = "/source/rdm2-621";

const FOTOS_621: ApartmentPhoto[] = [
  { src: `${BASE_621}/Sin-título-1.jpg`, alt: "Vista general del Loft Premium 621" },
  { src: `${BASE_621}/Sin-título-2.jpg`, alt: "Sala y zona social del loft" },
  { src: `${BASE_621}/Sin-título-4.jpg`, alt: "Cocina equipada del apartaestudio" },
  { src: `${BASE_621}/Sin-título-5.jpg`, alt: "Habitación con camas del loft" },
  { src: `${BASE_621}/Sin-título-6.jpg`, alt: "Baño completo del apartamento" },
  { src: `${BASE_621}/Sin-título-7.jpg`, alt: "Zona de trabajo con escritorio" },
  { src: `${BASE_621}/Sin-título-8.jpg`, alt: "Balcón con vista a montañas y ciudad" },
  { src: `${BASE_621}/Sin-título-11.jpg`, alt: "Vista panorámica desde el piso 6" },
  { src: `${BASE_621}/Sin-título-13.jpg`, alt: "Detalle del espacio interior" },
  { src: `${BASE_621}/aaa-HDR.jpg`, alt: "Vista HDR del apartamento" },
  { src: `${BASE_621}/IMG_4847.jpg`, alt: "Exterior del edificio Reserva del Mar 2" },
  { src: `${BASE_621}/Gemini_Generated_Image_xu8f7cxu8f7cxu8f.jpg`, alt: "Piscina y áreas comunes del edificio" },
];

// ─── Apartamento 621 – Reserva del Mar 2 (Loft Premium) ─────────────────────

const apartment621: Apartment = {
  slug: "loft-premium-rdm2-621",
  nombre: "Loft Premium con Vista, WiFi 900 Mbps, A/C y Parking",
  edificio: "Reserva del Mar 2",
  apartamento: "621",
  piso: 6,
  tipo: "Apartaestudio tipo Loft",

  huespedes: 4,
  habitaciones: 1,
  camas: 3,
  banos: 1,

  ubicacion: {
    ciudad: "Gaira",
    departamento: "Magdalena",
    pais: "Colombia",
    lat: 11.1912,
    lng: -74.2285,
    cercaDe: "Santa Marta",
    accesoPlaya: true,
    distanciaPlayas: "~6 minutos caminando (Playa de Gaira)",
    descripcionUbicacion:
      "Ubicado en Reserva del Mar 2, Cra. 2 #20-134, sector Gaira. Zona segura y estratégica, cerca de restaurantes y comercios. La Playa de Gaira está a aproximadamente 6 minutos caminando.",
  },

  anfitrionPrincipal: {
    nombre: "Sonia Patricia",
    empresa: "LIVIC",
    calificacion: 5.0,
    resenas: 12,
    anosExperiencia: 1,
  },
  coanfitrion: {
    nombre: "Richard Cabezas",
  },

  amenidades: [
    {
      titulo: "Dormitorio y Lavandería",
      icono: "🛏️",
      items: [
        { nombre: "Lavadora", icono: "WashingMachine" },
        { nombre: "Ganchos para la ropa", icono: "Shirt" },
        { nombre: "Sábanas", icono: "Bed" },
        { nombre: "Almohadas y mantas adicionales", icono: "Sparkles" },
        { nombre: "Espacio para guardar ropa", icono: "Archive" },
        { nombre: "Plancha", icono: "Shirt" },
        { nombre: "Tendedero de ropa", icono: "Shirt" },
      ],
    },
    {
      titulo: "Entretenimiento",
      icono: "📺",
      items: [
        { nombre: "TV", icono: "Tv" },
      ],
    },
    {
      titulo: "Climatización",
      icono: "❄️",
      items: [
        { nombre: "Aire acondicionado central", icono: "Wind" },
      ],
    },
    {
      titulo: "Internet y Oficina",
      icono: "📶",
      items: [
        { nombre: "WiFi de alta velocidad (900 Mbps)", icono: "Wifi" },
        { nombre: "Zona de trabajo con escritorio y enchufe", icono: "Laptop" },
      ],
    },
    {
      titulo: "Cocina",
      icono: "🍳",
      items: [
        { nombre: "Cocina completa (refrigeradora, horno, fogón)", icono: "ChefHat" },
        { nombre: "Microondas", icono: "Microwave" },
        { nombre: "Cafetera", icono: "Coffee" },
        { nombre: "Licuadora", icono: "Blend" },
        { nombre: "Arrocera", icono: "UtensilsCrossed" },
        { nombre: "Utensilios básicos para cocinar", icono: "UtensilsCrossed" },
        { nombre: "Platos y cubiertos", icono: "Utensils" },
        { nombre: "Copas de vino", icono: "Wine" },
      ],
    },
    {
      titulo: "Baño",
      icono: "🚿",
      items: [
        { nombre: "Agua caliente (lavabo y ducha)", icono: "Droplets" },
        { nombre: "Acondicionador", icono: "Sparkles" },
        { nombre: "Jabón corporal", icono: "Sparkles" },
        { nombre: "Ducha exterior", icono: "Droplets" },
      ],
    },
    {
      titulo: "Exterior",
      icono: "🌊",
      items: [
        { nombre: "Balcón con vista a montañas y ciudad (piso 6)", icono: "Sunrise" },
        { nombre: "Entrada independiente", icono: "DoorOpen" },
        { nombre: "Estacionamiento gratuito", icono: "Car" },
      ],
    },
  ],

  servicios: [
    { etiqueta: "Auto check-in", disponible: true, nota: "Cerradura digital con código" },
    { etiqueta: "Estadías largas", disponible: true, nota: "Desde 28 días con 25% de descuento" },
    { etiqueta: "Reservación inmediata", disponible: true, nota: "Reserva automática sin espera" },
    { etiqueta: "Mascotas permitidas", disponible: true, nota: "Animales de servicio permitidos" },
    { etiqueta: "Agua caliente", disponible: true },
    { etiqueta: "Estacionamiento gratuito", disponible: true, nota: "En las instalaciones del edificio" },
    { etiqueta: "Fotografía y filmación comercial", disponible: true },
  ],

  noIncluidos: [
    "Detector de monóxido de carbono",
    "Calefacción",
  ],

  badges: [
    "Loft Premium",
    "Piso 6",
    "4 huéspedes",
    "WiFi 900 Mbps",
    "Parking incluido",
  ],

  heroPhoto: FOTOS_621[0],
  galeria: FOTOS_621,

  descripcionCorta:
    "Loft moderno de 36 m² en piso alto con auto check-in, parking gratuito y WiFi de 900 Mbps. Perfecto para escapadas, viajes de trabajo o estadías cortas y largas.",

  descripcionLarga:
    "Moderno apartaestudio tipo loft ubicado en el piso 6, diseñado en un solo ambiente abierto que integra sala, cama y cocina. " +
    "Completamente dotado con cocina equipada, utensilios básicos, ropa de cama, toallas, aire acondicionado central y conexión a internet de alta velocidad (900 Mbps). " +
    "Vista a la montaña y parcial a la ciudad. A 6 minutos caminando de la Playa de Gaira. " +
    "El edificio cuenta con piscina, jacuzzi, gimnasio equipado, sauna, coworking y lobby estilo hotelero. " +
    "Zona segura y estratégica, cerca de restaurantes y comercios.",

  frasePosituelo:
    "Loft premium para quienes buscan comodidad, conectividad y estilo en Santa Marta.",

  edificioAmenidades: [
    { nombre: "Piscina", icono: "Waves" },
    { nombre: "Jacuzzi", icono: "Bath" },
    { nombre: "Gimnasio equipado", icono: "Dumbbell" },
    { nombre: "Sauna", icono: "Wind" },
    { nombre: "Coworking", icono: "Network" },
    { nombre: "Ascensor", icono: "ArrowUpDown" },
    { nombre: "Estacionamiento gratuito", icono: "Car" },
    { nombre: "Lobby estilo hotelero", icono: "Building" },
    { nombre: "Portería y control de ingreso", icono: "Shield" },
  ],

  edificioReglas: [
    { nombre: "Prohibido fumar dentro del apartamento", icono: "CigaretteOff" },
    { nombre: "No se permiten fiestas ni música en volumen alto", icono: "Music" },
    { nombre: "No se permiten visitantes no registrados", icono: "Users" },
    { nombre: "No abrir ventanal con A/C encendido", icono: "Wind" },
    { nombre: "Toallas de uso interno exclusivamente", icono: "Shirt" },
    { nombre: "Daños por viento en puertas los cubre el huésped", icono: "AlertTriangle" },
  ],

  checkIn: "3:00 p.m.",
  checkOut: "11:00 a.m.",

  notas: [
    "Registro en recepción con documento de identidad.",
    "Auto check-in con cerradura digital — código enviado antes de la llegada.",
    "Adquirir manilla de acceso en recepción (monto pendiente — solo tarjeta, no incluida en la reserva).",
    "Al confirmar la reserva se solicita información de todos los huéspedes para autorización de ingreso.",
    "Mayores de 9 años deben pagar manilla. Menores deben ingresar con padres o autorización firmada.",
    "Basura en el shut al fondo del pasillo, a mano derecha.",
    "Edificio nuevo — el coworking no tiene internet por el momento.",
  ],

  precioNoche: 199000,
};

// ─── Fotos del apartamento SS615 ─────────────────────────────────────────────

const BASE_615 = "/source/SS615";

const FOTOS_615: ApartmentPhoto[] = [
  { src: `${BASE_615}/Sin-título-1.jpg`, alt: "Vista general de la suite 615 con cama King" },
  { src: `${BASE_615}/Sin-título-2.jpg`, alt: "Cama Murphy abatible tamaño Queen" },
  { src: `${BASE_615}/Sin-título-3.jpg`, alt: "Sala y zona social de la suite" },
  { src: `${BASE_615}/Sin-título-4.jpg`, alt: "Cocina equipada de la suite" },
  { src: `${BASE_615}/Sin-título-5.jpg`, alt: "Comedor y área de cocina" },
  { src: `${BASE_615}/Sin-título-6.jpg`, alt: "Baño completo de la suite" },
  { src: `${BASE_615}/Sin-título-7.jpg`, alt: "Balcón con vista a las montañas" },
  { src: `${BASE_615}/Sin-título-8.jpg`, alt: "Detalle del espacio interior" },
  { src: `${BASE_615}/Sin-título-9.jpg`, alt: "Vista panorámica desde el balcón" },
  { src: `${BASE_615}/IMG_2733.jpg`, alt: "Piscina del edificio Salguero Suite" },
  { src: `${BASE_615}/IMG_2734.jpg`, alt: "Zona de piscina y áreas comunes" },
  { src: `${BASE_615}/IMG_2784.jpg`, alt: "Gimnasio del edificio" },
  { src: `${BASE_615}/IMG_2791.jpg`, alt: "Jacuzzi y zona húmeda" },
  { src: `${BASE_615}/IMG_2793.jpg`, alt: "Rooftop y terraza del edificio" },
  { src: `${BASE_615}/IMG_2795.jpg`, alt: "Exterior del edificio Salguero Suite" },
];

// ─── Apartamento SS615 – Salguero Suite ──────────────────────────────────────

const apartment615: Apartment = {
  slug: "suite-balcon-playa-ss615",
  nombre: "Suite con Balcón, Piscina y a Pasos de la Playa",
  edificio: "Salguero Suite",
  apartamento: "615",
  piso: 6,
  tipo: "Suite tipo Loft",

  huespedes: 3,
  habitaciones: 1,
  camas: 2,
  banos: 1,

  ubicacion: {
    ciudad: "Gaira",
    departamento: "Magdalena",
    pais: "Colombia",
    lat: 11.1875643,
    lng: -74.2312825,
    cercaDe: "Santa Marta",
    accesoPlaya: true,
    distanciaPlayas: "A pocos minutos caminando (Playa Salguero)",
    descripcionUbicacion:
      "Ubicado en Salguero Suite, sector Gaira. Nueva zona moderna de rápido crecimiento. Playa Salguero a pocos minutos caminando, zona de Rodadero a ±10 minutos. Hay pocos restaurantes alrededor, pero buenos.",
  },

  anfitrionPrincipal: {
    nombre: "Veronica",
    empresa: "LIVIC",
    calificacion: 4.78,
    resenas: 54,
    anosExperiencia: 2,
  },
  coanfitrion: {
    nombre: "Lina Villalba",
  },

  amenidades: [
    {
      titulo: "Dormitorio y Lavandería",
      icono: "🛏️",
      items: [
        { nombre: "Cama King", icono: "Bed" },
        { nombre: "Cama Murphy/abatible Queen", icono: "Bed" },
        { nombre: "Lavadora", icono: "WashingMachine" },
        { nombre: "Plancha", icono: "Shirt" },
      ],
    },
    {
      titulo: "Entretenimiento",
      icono: "📺",
      items: [
        { nombre: "TV", icono: "Tv" },
        { nombre: "Mesa de billar (área común)", icono: "Gamepad2" },
      ],
    },
    {
      titulo: "Climatización",
      icono: "❄️",
      items: [
        { nombre: "Aire acondicionado", icono: "Wind" },
      ],
    },
    {
      titulo: "Internet y Oficina",
      icono: "📶",
      items: [
        { nombre: "WiFi", icono: "Wifi" },
      ],
    },
    {
      titulo: "Cocina",
      icono: "🍳",
      items: [
        { nombre: "Cocina completa", icono: "ChefHat" },
        { nombre: "Refrigerador", icono: "Refrigerator" },
        { nombre: "Utensilios básicos para cocinar", icono: "UtensilsCrossed" },
        { nombre: "Platos y cubiertos", icono: "Utensils" },
      ],
    },
    {
      titulo: "Exterior",
      icono: "🌊",
      items: [
        { nombre: "Balcón con vista a las montañas", icono: "Sunrise" },
        { nombre: "Acceso a la playa", icono: "Waves" },
      ],
    },
    {
      titulo: "Familia",
      icono: "👨‍👩‍👧",
      items: [
        { nombre: "Parque infantil al aire libre", icono: "Baby" },
      ],
    },
    {
      titulo: "Seguridad",
      icono: "🔒",
      items: [
        { nombre: "Botiquín de primeros auxilios", icono: "Cross" },
        { nombre: "Caja de seguridad con llaves", icono: "KeyRound" },
      ],
    },
  ],

  servicios: [
    { etiqueta: "Check-in autónomo", disponible: true, nota: "Caja de seguridad con llaves" },
    { etiqueta: "El anfitrión te recibe", disponible: true },
    { etiqueta: "Estacionamiento gratuito", disponible: true, nota: "Sujeto a disponibilidad, sin reserva" },
    { etiqueta: "Mascotas permitidas", disponible: false },
    { etiqueta: "Agua caliente", disponible: false },
  ],

  noIncluidos: [
    "Secadora",
    "Detector de humo",
    "Detector de monóxido de carbono",
    "Cámaras de seguridad exterior",
  ],

  badges: [
    "A pasos de la playa",
    "Vista a montañas",
    "Piscina",
    "3 huéspedes",
    "Cama King",
  ],

  heroPhoto: FOTOS_615[0],
  galeria: FOTOS_615,

  descripcionCorta:
    "Elegante suite de 32 m² con balcón, cama King y cama Murphy Queen. A pocos minutos de Playa Salguero con acceso a piscina, jacuzzi, sauna y gimnasio.",

  descripcionLarga:
    "Te damos la bienvenida a tu elegante retiro en la playa en Santa Marta. Suite de 32 m² cuidadosamente diseñada con una espaciosa cama King para un sueño reparador y una acogedora cama Murphy tamaño Queen para huéspedes adicionales. " +
    "Cocina totalmente equipada, WiFi, TV y aire acondicionado. Acceso completo a piscina, turco, sauna, jacuzzi, gimnasio, salón de juegos con mesa de billar, parque infantil y rooftop. " +
    "Relájate a pocos minutos de la tranquila Playa Salguero y a solo 10 minutos de la vibrante zona de Rodadero. Comienza el día con un café en el balcón con vista a las montañas.",

  frasePosituelo:
    "Tu retiro elegante a pasos de la playa, con todo lo que necesitas para descansar.",

  edificioAmenidades: [
    { nombre: "Piscina", icono: "Waves" },
    { nombre: "Jacuzzi", icono: "Bath" },
    { nombre: "Turco / Baño turco", icono: "Wind" },
    { nombre: "Sauna", icono: "Wind" },
    { nombre: "Gimnasio", icono: "Dumbbell" },
    { nombre: "Salón de juegos (mesa de billar)", icono: "Gamepad2" },
    { nombre: "Parque infantil", icono: "Baby" },
    { nombre: "Rooftop / Terraza", icono: "Sunrise" },
    { nombre: "Ascensor", icono: "ArrowUpDown" },
    { nombre: "Estacionamiento (sujeto a disponibilidad)", icono: "Car" },
  ],

  edificioReglas: [
    { nombre: "No se permiten fiestas", icono: "Music" },
    { nombre: "Capacidad máxima 3 huéspedes", icono: "Users" },
    { nombre: "Manilla obligatoria $20.000 COP por persona", icono: "Ticket" },
  ],

  checkIn: "3:00 p.m.",
  checkOut: "11:00 a.m.",

  notas: [
    "Llegada autónoma mediante caja de seguridad con llaves. El anfitrión también puede recibirte.",
    "Se cobra manilla de $20.000 COP por persona, no incluida en el precio de la reserva.",
    "Hay parqueadero en el edificio, pero no es posible reservarlo. En caso de no encontrar lugar, se puede parquear en los alrededores.",
    "Registro obligatorio en recepción con documento de identidad.",
  ],

  airbnbCalendarUrl: undefined,

  precioNoche: 200000,
};

// ─── Apartamento 931 – Reserva del Mar (On the Beach) ────────────────────────
// Nota: Usa fotos del edificio Reserva del Mar (mismo edificio que el 915)

const apartment931: Apartment = {
  slug: "on-the-beach-rdm-931",
  nombre: "On the Beach Apartment Santa Marta",
  edificio: "Reserva del Mar",
  apartamento: "931",
  piso: 9,
  tipo: "Apartamento entero",

  huespedes: 6,
  habitaciones: 3,
  camas: 3,
  banos: 2,

  ubicacion: {
    ciudad: "Gaira",
    departamento: "Magdalena",
    pais: "Colombia",
    lat: 11.1912,
    lng: -74.2285,
    cercaDe: "Santa Marta",
    accesoPlaya: true,
    distanciaPlayas: "Acceso directo a playas locales de Santa Marta",
    descripcionUbicacion:
      "Ubicado en el exclusivo conjunto Reservas del Mar, Cl. 22 #1-67, sector Gaira. A solo 15 minutos del Aeropuerto Simón Bolívar. Vistas impresionantes al océano, al río y a las montañas de la Sierra Nevada. Acceso fácil a playas locales y al Parque Nacional Natural Tayrona.",
  },

  anfitrionPrincipal: {
    nombre: "Victor",
    empresa: "LIVIC",
    calificacion: 4.88,
    resenas: 8,
    anosExperiencia: 1,
  },
  coanfitrion: {
    nombre: "Karen Marin",
  },

  amenidades: [
    {
      titulo: "Dormitorio y Lavandería",
      icono: "🛏️",
      items: [
        { nombre: "Cama King (habitación master)", icono: "Bed" },
        { nombre: "2 camas Queen (habitaciones 2 y 3)", icono: "Bed" },
        { nombre: "Sábanas de algodón", icono: "Bed" },
        { nombre: "Almohadas y mantas adicionales", icono: "Sparkles" },
        { nombre: "Ganchos para la ropa", icono: "Shirt" },
        { nombre: "Clósets amplios en cada habitación", icono: "Archive" },
      ],
    },
    {
      titulo: "Entretenimiento",
      icono: "📺",
      items: [
        { nombre: "TV 60\" LED", icono: "Tv" },
        { nombre: "Equipo para hacer ejercicio", icono: "Dumbbell" },
      ],
    },
    {
      titulo: "Climatización",
      icono: "❄️",
      items: [
        { nombre: "Aire acondicionado central", icono: "Wind" },
        { nombre: "Calefacción central", icono: "Flame" },
      ],
    },
    {
      titulo: "Internet y Oficina",
      icono: "📶",
      items: [
        { nombre: "WiFi", icono: "Wifi" },
      ],
    },
    {
      titulo: "Cocina",
      icono: "🍳",
      items: [
        { nombre: "Cocina completa (refrigeradora, horno, fogón)", icono: "ChefHat" },
        { nombre: "Cocina al aire libre / Parrilla", icono: "Flame" },
        { nombre: "Cafetera", icono: "Coffee" },
        { nombre: "Hervidor de agua", icono: "Coffee" },
        { nombre: "Copas de vino", icono: "Wine" },
        { nombre: "Platos y cubiertos", icono: "Utensils" },
        { nombre: "Filtro de agua para toda la casa", icono: "Droplets" },
      ],
    },
    {
      titulo: "Baños",
      icono: "🚿",
      items: [
        { nombre: "Baño master con doble lavamanos y ducha spa", icono: "Bath" },
        { nombre: "Baño común con ducha spa", icono: "Droplets" },
        { nombre: "Agua caliente", icono: "Droplets" },
        { nombre: "Ducha exterior", icono: "Droplets" },
      ],
    },
    {
      titulo: "Exterior",
      icono: "🌊",
      items: [
        { nombre: "Balcón con mobiliario para 6 personas", icono: "Sunrise" },
        { nombre: "Vista al océano, río y montañas", icono: "Mountain" },
        { nombre: "Acceso a la playa", icono: "Waves" },
        { nombre: "Mobiliario exterior", icono: "Armchair" },
        { nombre: "Tumbonas", icono: "Armchair" },
      ],
    },
    {
      titulo: "Seguridad",
      icono: "🔒",
      items: [
        { nombre: "Detector de humo", icono: "Bell" },
        { nombre: "Detector de monóxido de carbono", icono: "Bell" },
        { nombre: "Cámara de seguridad exterior", icono: "Camera" },
      ],
    },
  ],

  servicios: [
    { etiqueta: "Check-in flexible", disponible: true },
    { etiqueta: "Reservación inmediata", disponible: true },
    { etiqueta: "Mascotas permitidas", disponible: true, nota: "Animales de servicio siempre permitidos" },
    { etiqueta: "Eventos permitidos", disponible: true },
    { etiqueta: "Agua caliente", disponible: true },
    { etiqueta: "Estacionamiento gratuito", disponible: true, nota: "1 espacio en las instalaciones" },
    { etiqueta: "Limpieza durante la estadía", disponible: true },
  ],

  noIncluidos: [
    "Secadora",
  ],

  badges: [
    "Frente al mar",
    "Piso 9",
    "6 huéspedes",
    "3 habitaciones",
    "Vista al océano",
  ],

  heroPhoto: FOTOS_915[0],
  galeria: FOTOS_915,

  descripcionCorta:
    "Apartamento de 3 habitaciones y 2 baños en el piso 9 de Reserva del Mar con vistas impresionantes al océano, río y montañas. Ideal para familias y grupos.",

  descripcionLarga:
    "Ubicado en el exclusivo Reservas del Mar, este apartamento de 3 habitaciones y 2 baños ofrece impresionantes vistas al océano, al río y a las montañas de la Sierra Nevada, desde el piso 9. " +
    "La habitación master cuenta con cama King, mesas de noche flotantes con cargadores USB y baño en suite con doble lavamanos y ducha spa. Dos habitaciones adicionales con camas Queen. " +
    "Cocina completa con península, comedor para 4, sala con sofá grande y TV 60\" LED, y un amplio balcón con mobiliario para 6 personas. " +
    "El edificio ofrece piscina, jacuzzi, gimnasio, parque infantil, parrilla y zonas al aire libre. A solo 15 minutos del aeropuerto y con acceso fácil al Parque Tayrona.",

  frasePosituelo:
    "Despierta con el mar Caribe a tus pies y la Sierra Nevada en el horizonte.",

  edificioAmenidades: [
    { nombre: "Piscina", icono: "Waves" },
    { nombre: "Jacuzzi", icono: "Bath" },
    { nombre: "Gimnasio", icono: "Dumbbell" },
    { nombre: "Parque infantil", icono: "Baby" },
    { nombre: "Cocina al aire libre / Parrilla", icono: "Flame" },
    { nombre: "Zona de comida al aire libre", icono: "UtensilsCrossed" },
    { nombre: "Tumbonas", icono: "Armchair" },
    { nombre: "Ascensor", icono: "ArrowUpDown" },
    { nombre: "Estacionamiento (1 espacio)", icono: "Car" },
  ],

  edificioReglas: [
    { nombre: "Mascotas permitidas", icono: "PawPrint" },
    { nombre: "Eventos permitidos", icono: "Music" },
    { nombre: "Fumar permitido (exterior)", icono: "CigaretteOff" },
    { nombre: "Capacidad máxima 6 huéspedes", icono: "Users" },
  ],

  checkIn: "3:00 p.m.",
  checkOut: "11:00 a.m.",

  notas: [
    "Resort Fee de $57.500 COP por huésped, se paga al llegar. Incluye manilla de acceso al edificio y todas las amenidades. No está incluido en la reserva.",
    "Estancia mínima de 2 noches, máxima de 14 noches.",
    "Reserva con mínimo 2 días de anticipación.",
    "Registro obligatorio en recepción con documento de identidad.",
  ],

  airbnbCalendarUrl: undefined,

  precioNoche: 450000,
};

// ─── Exportación del catálogo ─────────────────────────────────────────────────

export const APARTMENTS: Apartment[] = [
  apartment519,
  apartment419,
  apartment1008,
  apartment915,
  apartment620,
  apartment621,
  apartment615,
  apartment931,
];
