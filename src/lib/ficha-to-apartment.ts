/**
 * Mapper: PublicFicha (API LIVIC) → Apartment (shape consumido por
 * `ApartmentDetailClient`).
 *
 * `ApartmentDetailClient` fue diseñado originalmente para datos estáticos
 * (data/apartments.ts). Para no reescribirlo, transformamos la ficha que
 * llega del API al shape esperado.
 *
 * Reglas de mapeo:
 *  - heroPhoto: usa el JSONB `heroPhoto` del apto si trae { src, alt };
 *    si no, cae al fallback por número (`resolveHeroPhoto`).
 *  - galería: si el API trae fotos[], se usan; si está vacío, se usa al
 *    menos la hero como única foto (la galería no puede ir vacía o el
 *    componente Gallery se rompe).
 *  - precioNoche: deriva un precio entero de pricing publicado o neto.
 *  - apiSlug: siempre = slug (habilita Cotizador).
 */

import type {
  ApartmentHero,
  PublicFicha,
  PublicPricing,
} from "./api";
import type {
  Apartment,
  ApartmentAmenityCategory,
  ApartmentAmenityItem,
  ApartmentHost,
  ApartmentPhoto,
  ApartmentService,
} from "@/data/apartments";
import { resolveHeroPhoto } from "./hero-fallback";

/* ──────────────────── Helpers de parsing JSONB ──────────────────── */

function asObject(value: unknown): Record<string, unknown> | null {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value as Record<string, unknown>;
  }
  return null;
}

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((v): v is string => typeof v === "string");
}

function parseHero(raw: unknown): ApartmentHero | null {
  const obj = asObject(raw);
  if (!obj) return null;
  const src = typeof obj.src === "string" ? obj.src : null;
  const alt = typeof obj.alt === "string" ? obj.alt : null;
  if (!src || !alt) return null;
  return { src, alt };
}

function parseHost(raw: unknown): ApartmentHost | null {
  const obj = asObject(raw);
  if (!obj) return null;
  const nombre = typeof obj.nombre === "string" ? obj.nombre : null;
  if (!nombre) return null;
  return {
    nombre,
    empresa: typeof obj.empresa === "string" ? obj.empresa : undefined,
    calificacion: typeof obj.calificacion === "number" ? obj.calificacion : undefined,
    resenas: typeof obj.resenas === "number" ? obj.resenas : undefined,
    anosExperiencia: typeof obj.anosExperiencia === "number" ? obj.anosExperiencia : undefined,
    avatarSrc: typeof obj.avatarSrc === "string" ? obj.avatarSrc : undefined,
  };
}

/* ──────────────────── Pricing → precioNoche ──────────────────── */

/**
 * Devuelve el precio MÍNIMO entre los dos tarifarios (entre semana / fin de
 * semana) — se renderiza como "Desde $X / noche" en las cards. Antes
 * mostrábamos el promedio aritmético `(ES + FS) / 2`, pero ese midpoint no
 * corresponde a ninguna noche real configurada en el PMS y confundía al
 * usuario (ej. 500k ES + 530k FS → "$515.000" que no existe). El mínimo
 * representa el "desde" honesto y replica el patrón de Airbnb/Booking.
 */
function derivePrecioNoche(p: PublicPricing | null): number | undefined {
  if (!p) return undefined;
  const com = p.comisionAirbnbPct ? parseFloat(p.comisionAirbnbPct) / 100 : 0.03;
  const factor = 1 / Math.max(1 - com, 0.0001);

  const pubES = p.precioPublicadoEntreSemana
    ? parseFloat(p.precioPublicadoEntreSemana)
    : p.precioNetoEntreSemana
      ? parseFloat(p.precioNetoEntreSemana) * factor
      : null;
  const pubFS = p.precioPublicadoFinSemana
    ? parseFloat(p.precioPublicadoFinSemana)
    : p.precioNetoFinSemana
      ? parseFloat(p.precioNetoFinSemana) * factor
      : null;

  if (pubES == null && pubFS == null) return undefined;
  const min = pubES != null && pubFS != null ? Math.min(pubES, pubFS) : (pubES ?? pubFS!);
  return Math.round(min);
}

/* ──────────────────── Mapper principal ──────────────────── */

export function publicFichaToApartment(ficha: PublicFicha): Apartment {
  const { apartamento: apt, anuncio } = ficha;
  // Fallback defensivo para cuando el backend (o un caché ISR antiguo)
  // todavía no devuelve `edificio` en la respuesta.
  const edificio = ficha.edificio ?? {
    id: "",
    nombre: "Edificio",
    ciudad: "Santa Marta",
    departamento: "Magdalena",
    pais: "Colombia",
    direccion: "",
    lat: null,
    lng: null,
  };

  // Hero photo con fallback robusto.
  const hero = resolveHeroPhoto(parseHero(apt.heroPhoto), apt.numero);

  // Defensivo: el API puede no devolver alguna sección si la versión
  // desplegada es anterior al contrato extendido (o si Next.js cacheó
  // una respuesta vieja en ISR). Tratamos todas como opcionales.
  const fotosRaw = ficha.fotos ?? [];
  const amenidadesRaw = ficha.amenidades ?? [];
  const serviciosRaw = ficha.servicios ?? [];
  const edAmenRaw = ficha.edificioAmenidades ?? [];
  const edReglasRaw = ficha.edificioReglas ?? [];

  // Galería: si el API trae fotos, las usamos; si no, mostramos al menos
  // la hero (DetailGallery requiere al menos 1 foto).
  const galeria: ApartmentPhoto[] = fotosRaw.length
    ? fotosRaw.map((f) => ({ src: f.src, alt: f.alt }))
    : [hero];

  // Amenidades por categoría (preservando orden del API).
  const amenidades: ApartmentAmenityCategory[] = amenidadesRaw.map((c) => ({
    titulo: c.categoria.titulo,
    icono: c.categoria.icono,
    items: c.items.map((i) => ({ nombre: i.nombre, icono: i.icono })),
  }));

  // Servicios.
  const servicios: ApartmentService[] = serviciosRaw.map((s) => ({
    etiqueta: s.etiqueta,
    disponible: s.disponible,
    nota: s.nota ?? undefined,
  }));

  // Items de edificio (amenidades del conjunto + reglas).
  const edificioAmenidades: ApartmentAmenityItem[] = edAmenRaw.map((a) => ({
    nombre: a.nombre,
    icono: a.icono,
  }));
  const edificioReglas: ApartmentAmenityItem[] = edReglasRaw.map((r) => ({
    nombre: r.nombre,
    icono: r.icono,
  }));

  // Amenidades del edificio agrupadas por categoría (shape preferido por
  // el componente nuevo "Espacios pensados para relajarte"). Si el endpoint
  // no devuelve el campo (respuesta cacheada antigua), queda undefined y
  // el componente cae al renderer plano de `edificioAmenidades`.
  const edAmenByCatRaw = ficha.edificioAmenidadesByCategoria ?? [];
  const edificioAmenidadesGrouped: ApartmentAmenityCategory[] = edAmenByCatRaw.map((c) => ({
    titulo: c.categoria.titulo,
    icono: c.categoria.icono,
    items: c.items.map((i) => ({ nombre: i.nombre, icono: i.icono })),
  }));

  // Galería del edificio para el modal "Ver fotos del edificio".
  const edFotosRaw = ficha.edificio?.fotos ?? [];
  const edificioFotos: ApartmentPhoto[] = edFotosRaw.map((f) => ({
    src: f.src,
    alt: f.alt,
  }));

  // Hosts (JSONB).
  const anfitrionPrincipal = parseHost(apt.anfitrionPrincipal) ?? {
    nombre: "Equipo LIVIC",
    empresa: "LIVIC",
  };
  const coanfitrion = parseHost(apt.coanfitrion) ?? undefined;

  // Descripciones: prefiero las del anuncio si vienen, fallback al apto.
  const descripcionCorta =
    anuncio?.hook ?? apt.descripcionCorta ?? "";
  const descripcionLarga =
    anuncio?.descripcionPropiedad ?? apt.descripcionLarga ?? "";
  const frasePosituelo =
    apt.frasePosituelo ?? anuncio?.descripcionInteraccion ?? "";

  const precioNoche = derivePrecioNoche(ficha.pricingVigente);

  return {
    slug: apt.slug,
    // Prioridad: tituloAnuncio (marketing-friendly, ej "Piso 10 · Reserva del
    // Mar · 3 Hab para 7 huéspedes") > nombre interno (ej "1037"). El nombre
    // interno es un código operativo y no debería mostrarse al cliente final.
    nombre: apt.tituloAnuncio?.trim() || apt.nombre,
    edificio: edificio.nombre,
    apartamento: apt.numero,
    piso: apt.piso ?? 0,
    tipo: apt.tipoPropiedad ?? apt.tipo ?? "Apartamento",
    huespedes: apt.huespedes ?? 1,
    habitaciones: apt.habitaciones ?? 1,
    camas: apt.camas ?? 1,
    banos: apt.banos ?? 1,
    ubicacion: {
      ciudad: edificio.ciudad,
      departamento: edificio.departamento,
      pais: edificio.pais,
      lat: edificio.lat ? parseFloat(edificio.lat) : 0,
      lng: edificio.lng ? parseFloat(edificio.lng) : 0,
      cercaDe: undefined,
      descripcionUbicacion: anuncio?.descripcionOtrosDetalles ?? undefined,
    },
    anfitrionPrincipal,
    coanfitrion,
    amenidades,
    servicios,
    noIncluidos: asStringArray(apt.noIncluidos),
    badges: asStringArray(apt.badges),
    // Listas marketing del PMS — usadas en el detalle del catálogo:
    //   - vistas: en el header del hero ("👁 Mar Caribe · Sierra Nevada")
    //   - fortalezas: bloque "Por qué te va a encantar" (cards verdes)
    //   - debilidades: "Cosas a tener en cuenta" (colapsable amber)
    //   - huespedIdeal: chips "Ideal para" (purple)
    vistas: asStringArray(apt.vistas),
    fortalezas: asStringArray(apt.fortalezas),
    debilidades: asStringArray(apt.debilidades),
    huespedIdeal: asStringArray(apt.huespedIdeal),
    // Campos estructurados de acceso — el catálogo los usa para auto-generar
    // notas dinámicas en lugar de depender de strings legacy en `notas`.
    requiereManilla: apt.requiereManilla ?? undefined,
    costoManillaPersona: apt.costoManillaPersona ?? null,
    manillaSoloTarjeta: apt.manillaSoloTarjeta ?? undefined,
    silencioDesde: apt.silencioDesde ?? null,
    silencioHasta: apt.silencioHasta ?? null,
    heroPhoto: hero,
    galeria,
    descripcionCorta,
    descripcionLarga,
    frasePosituelo,
    edificioAmenidades,
    edificioReglas,
    edificioAmenidadesGrouped,
    edificioFotos,
    checkIn: apt.checkIn ?? "3:00 p.m.",
    checkOut: apt.checkOut ?? "11:00 a.m.",
    notas: asStringArray(apt.notas),
    precioNoche,
    airbnbCalendarUrl: apt.airbnbIcsUrl ?? undefined,
    apiSlug: apt.slug,
  };
}
