/**
 * api.ts — cliente HTTP del catálogo público LIVIC.
 *
 * Usa `fetch` nativo (no requiere axios). La URL base se configura vía
 * NEXT_PUBLIC_LIVIC_API_URL; en dev local apunta a http://localhost:3002.
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_LIVIC_API_URL || 'http://localhost:3002';

/* ════════════════════ Tipos del contrato público ════════════════════ */

export type DescuentoTipo = 'ninguno' | 'semanal' | 'mensual';

export interface QuoteRequest {
  /** YYYY-MM-DD */
  checkIn: string;
  /** YYYY-MM-DD (exclusive) */
  checkOut: string;
  huespedes?: number;
}

export interface QuoteResult {
  apartamentoSlug: string;
  checkIn: string;
  checkOut: string;
  huespedes: number;
  noches: number;
  nochesEntreSemana: number;
  nochesFinDeSemana: number;
  moneda: string;
  subtotal: number;
  descuentoPct: number;
  descuentoTipo: DescuentoTipo;
  descuentoMonto: number;
  total: number;
  comisionAirbnbPct: number;
  comisionAirbnbMonto: number;
  pricingVigenciaDesde: string;
  pricingVigenciaHasta: string | null;
  /** Cuando faltan datos para cotizar (p.ej. pricing no definido) el backend
   *  responde 200 con un array de avisos en lugar de fallar. */
  errores?: string[];
}

export interface PublicEdificioDetalle {
  id: string;
  nombre: string;
  ciudad: string;
  departamento: string;
  pais: string;
  direccion: string;
  lat: string | null;
  lng: string | null;
}

export interface PublicFoto {
  id: string;
  src: string;
  alt: string;
  orden: number;
}

export interface PublicEdificioItem {
  id: string;
  nombre: string;
  icono: string;
}

export interface PublicServicio {
  id: string;
  etiqueta: string;
  disponible: boolean;
  nota: string | null;
}

export interface PublicAmenidadCategoria {
  categoria: { id: string; titulo: string; icono: string; orden: number };
  items: Array<{ id: string; nombre: string; icono: string; nota: string | null }>;
}

export interface PublicAnuncio {
  hook: string | null;
  descripcionPropiedad: string | null;
  descripcionAcceso: string | null;
  descripcionInteraccion: string | null;
  descripcionOtrosDetalles: string | null;
}

export interface PublicDistancia {
  destino: string;
  tiempoMinutos: number | null;
  transporte: string | null;
  orden: number;
}

export interface PublicPricing {
  moneda: string;
  precioNetoEntreSemana: string | null;
  precioNetoFinSemana: string | null;
  precioPublicadoEntreSemana: string | null;
  precioPublicadoFinSemana: string | null;
  descuentoSemanalPct: string | null;
  descuentoMensualPct: string | null;
  comisionAirbnbPct: string | null;
  vigenteDesde: string;
  vigenteHasta: string | null;
}

export interface PublicApartamentoDetalle {
  id: string;
  slug: string;
  nombre: string;
  numero: string;
  piso: number | null;
  torre: number | null;
  tipo: string | null;
  tipoPropiedad: string | null;
  huespedes: number | null;
  habitaciones: number | null;
  camas: number | null;
  sofacama: number | null;
  banos: number | null;
  descripcionCorta: string | null;
  descripcionLarga: string | null;
  frasePosituelo: string | null;
  checkIn: string | null;
  checkOut: string | null;
  /** JSONB: { nombre, empresa?, calificacion?, resenas?, anosExperiencia? } */
  anfitrionPrincipal: unknown;
  /** JSONB: { nombre, ... } */
  coanfitrion: unknown;
  /** JSONB: string[] */
  badges: unknown;
  /** JSONB: string[] */
  noIncluidos: unknown;
  /** JSONB: string[] */
  notas: unknown;
  /** JSONB: { src, alt } */
  heroPhoto: unknown;
  airbnbIcsUrl: string | null;
  estado: string | null;
  referenciaInterna: string | null;
  tituloAnuncio: string | null;
  estiloDecorativo: string | null;
  vistas: unknown;
  fortalezas: unknown;
  debilidades: unknown;
  huespedIdeal: unknown;
  nochesMinimas: number | null;
  nochesMaximas: number | null;
  huespedesRecomendados: number | null;
  // Acceso al conjunto — usados por el catálogo para auto-generar la nota
  // "Manilla de acceso al conjunto: $X COP por persona..."
  requiereManilla: boolean | null;
  costoManillaPersona: string | null;
  manillaSoloTarjeta: boolean | null;
  silencioDesde: string | null;
  silencioHasta: string | null;
  tipoAcceso: string | null;
}

export interface PublicFicha {
  apartamento: PublicApartamentoDetalle;
  edificio: PublicEdificioDetalle;
  anuncio: PublicAnuncio | null;
  distancias: PublicDistancia[];
  pricingVigente: PublicPricing | null;
  fotos: PublicFoto[];
  servicios: PublicServicio[];
  amenidades: PublicAmenidadCategoria[];
  edificioAmenidades: PublicEdificioItem[];
  edificioReglas: PublicEdificioItem[];
}

/* ════════════════════ Listado del catálogo ════════════════════ */

export interface ApartmentHero {
  src: string;
  alt: string;
}

export interface PublicApartamentoSummary {
  id: string;
  slug: string;
  nombre: string;
  tituloAnuncio: string | null;
  numero: string;
  piso: number;
  torre: number;
  tipo: string;
  tipoPropiedad: string | null;
  huespedes: number;
  huespedesRecomendados: number | null;
  habitaciones: number;
  camas: number;
  banos: number;
  edificio: {
    id: string;
    nombre: string;
    ciudad: string;
    departamento: string;
  };
  /** JSON arbitrario; cuando existe debe ser un { src, alt }. */
  heroPhoto: ApartmentHero | null;
  /**
   * Top fotos de la galería (hasta 5), ordenadas por `orden` ASC.
   * Alimentan el slider de las cards del catálogo. Array vacío si el apto no
   * tiene fotos subidas todavía.
   */
  fotos: Array<{ src: string; alt: string | null }>;
  pricingVigente: {
    moneda: string;
    precioNetoEntreSemana: string | null;
    precioNetoFinSemana: string | null;
    precioPublicadoEntreSemana: string | null;
    precioPublicadoFinSemana: string | null;
    descuentoSemanalPct: string | null;
    descuentoMensualPct: string | null;
    comisionAirbnbPct: string | null;
  } | null;
  calificacion: number | null;
  resenas: number | null;
}

export async function fetchAllApartments(): Promise<PublicApartamentoSummary[]> {
  return apiGet<PublicApartamentoSummary[]>('/api/public/apartamentos');
}

export interface AvailabilityQuery {
  /** YYYY-MM-DD */
  checkIn: string;
  /** YYYY-MM-DD (exclusivo) */
  checkOut: string;
  /** Capacidad mínima requerida; omitir para no filtrar por huéspedes. */
  huespedes?: number;
}

/**
 * GET /api/public/apartamentos/disponibles
 * Devuelve apartamentos activos cuyo calendario no solapa con el rango pedido
 * y cuya capacidad cumple `huespedes`. Mismo shape que el listado general.
 */
export async function fetchAvailableApartments(
  query: AvailabilityQuery,
): Promise<PublicApartamentoSummary[]> {
  return apiGet<PublicApartamentoSummary[]>('/api/public/apartamentos/disponibles', {
    checkIn: query.checkIn,
    checkOut: query.checkOut,
    huespedes: query.huespedes,
  });
}

/* ════════════════════ Helpers ════════════════════ */

interface ApiEnvelope<T> {
  data: T;
  message: string;
  success: boolean;
}

async function apiGet<T>(path: string, params?: Record<string, string | number | undefined>): Promise<T> {
  const url = new URL(path, API_BASE_URL);
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      if (v != null) url.searchParams.set(k, String(v));
    }
  }
  const res = await fetch(url.toString(), {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    // Catálogo público no necesita credenciales
  });
  if (!res.ok) {
    let msg = `HTTP ${res.status}`;
    try {
      const body = await res.json();
      msg = body?.message ?? body?.error?.message ?? msg;
    } catch {
      // ignore
    }
    throw new Error(msg);
  }
  const body = (await res.json()) as ApiEnvelope<T>;
  return body.data;
}

/* ════════════════════ Endpoints públicos ════════════════════ */

export async function fetchQuote(slug: string, req: QuoteRequest): Promise<QuoteResult> {
  return apiGet<QuoteResult>(`/api/public/apartamentos/${encodeURIComponent(slug)}/cotizar`, {
    checkIn: req.checkIn,
    checkOut: req.checkOut,
    huespedes: req.huespedes,
  });
}

export async function fetchPublicFicha(slug: string): Promise<PublicFicha> {
  return apiGet<PublicFicha>(`/api/public/apartamentos/${encodeURIComponent(slug)}`);
}
