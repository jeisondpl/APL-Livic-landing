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

export interface PublicFicha {
  apartamento: {
    id: string;
    slug: string;
    nombre: string;
    numero: string;
    referenciaInterna: string | null;
    tituloAnuncio: string | null;
    tipoPropiedad: string | null;
    huespedesRecomendados: number | null;
    nochesMinimas: number | null;
  };
  pricingVigente: {
    moneda: string;
    precioNetoEntreSemana: string | null;
    precioNetoFinSemana: string | null;
    descuentoSemanalPct: string | null;
    descuentoMensualPct: string | null;
  } | null;
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
