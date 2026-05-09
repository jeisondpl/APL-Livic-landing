'use client';

/**
 * ApartmentSearchCard — card del catálogo público estilo Airbnb.
 *
 * Diseño basado en cards de Airbnb (referencia img/233 + img/234):
 * - Foto cuadrada con esquinas redondeadas y heart top-right.
 * - Título (1 línea) y rating alineado a la derecha.
 * - Subtítulo: tipo + edificio (1 línea).
 * - Línea de precio: "$X COP por 2 noches" (subrayado al hover).
 *
 * Mantiene tono y comportamiento de la marca LIVIC: usa `livic-pink`
 * para acentos y enlaza al detalle del apartamento.
 */

import Image from 'next/image';
import Link from 'next/link';
import { Heart, Star } from 'lucide-react';
import { useState } from 'react';
import type { PublicApartamentoSummary } from '@/lib/api';
import { resolveHeroPhoto } from '@/lib/hero-fallback';

interface Props {
  apartment: PublicApartamentoSummary;
  /** Cantidad de noches a mostrar en la card (default 2). */
  noches?: number;
}

const NUMBER_FMT_COP = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0,
});

function fmtCOP(n: number, currency = 'COP'): string {
  if (currency === 'COP') return NUMBER_FMT_COP.format(n);
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(n);
}

/**
 * Calcula precio para N noches usando heurística simple:
 *   - Si hay precio publicado neto, usa promedio entresemana/finsemana × N.
 *   - Si solo hay neto, deriva publicado: neto / (1 - comisión%/100).
 *   - Devuelve null si no hay datos suficientes.
 */
function computePriceForNights(
  pricing: PublicApartamentoSummary['pricingVigente'],
  nights: number,
): { total: number; currency: string } | null {
  if (!pricing) return null;

  const com = pricing.comisionAirbnbPct ? parseFloat(pricing.comisionAirbnbPct) / 100 : 0.03;
  const factor = 1 / Math.max(1 - com, 0.0001);

  const pubES = pricing.precioPublicadoEntreSemana
    ? parseFloat(pricing.precioPublicadoEntreSemana)
    : pricing.precioNetoEntreSemana
      ? parseFloat(pricing.precioNetoEntreSemana) * factor
      : null;
  const pubFS = pricing.precioPublicadoFinSemana
    ? parseFloat(pricing.precioPublicadoFinSemana)
    : pricing.precioNetoFinSemana
      ? parseFloat(pricing.precioNetoFinSemana) * factor
      : null;

  if (pubES == null && pubFS == null) return null;

  // Promedio simple de los dos precios disponibles
  const avg =
    pubES != null && pubFS != null
      ? (pubES + pubFS) / 2
      : (pubES ?? pubFS!);

  return { total: Math.round(avg * nights), currency: pricing.moneda };
}

export default function ApartmentSearchCard({
  apartment,
  noches = 2,
}: Props) {
  const [favorited, setFavorited] = useState(false);

  const hero = resolveHeroPhoto(apartment.heroPhoto, apartment.numero);
  const price = computePriceForNights(apartment.pricingVigente, noches);

  // Título solicitado: nombre del apartamento + edificio
  const title = `${apartment.nombre} · ${apartment.edificio.nombre}`;

  // Subtítulo: ciudad, departamento
  const subtitle = `${apartment.edificio.ciudad}, ${apartment.edificio.departamento}`;

  // Rating placeholder hasta que tengamos reseñas reales
  const rating = apartment.calificacion ?? 4.85;
  const resenas = apartment.resenas ?? 0;

  const href = `/catalogo/${apartment.slug}`;

  return (
    <Link
      href={href}
      className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-livic-pink/40 rounded-3xl"
    >
      {/* ── Foto ──────────────────────────────────────────── */}
      <div className="relative aspect-square w-full overflow-hidden rounded-3xl bg-gray-100">
        <Image
          src={hero.src}
          alt={hero.alt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 320px"
          quality={80}
        />

        {/* Heart top-right */}
        <button
          type="button"
          aria-label={favorited ? 'Quitar de favoritos' : 'Agregar a favoritos'}
          aria-pressed={favorited}
          onClick={(e) => {
            e.preventDefault();
            setFavorited((v) => !v);
          }}
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/40 backdrop-blur-sm hover:bg-white/60 transition-colors"
        >
          <Heart
            size={22}
            className={
              favorited
                ? 'fill-livic-pink stroke-livic-pink'
                : 'fill-black/40 stroke-white drop-shadow-sm'
            }
            strokeWidth={1.5}
          />
        </button>

        {/* Badge sin pricing — informativo */}
        {!price && (
          <div className="absolute bottom-3 left-3 z-10">
            <span className="inline-flex items-center bg-white/90 backdrop-blur-sm text-gray-700 text-[11px] font-semibold px-2.5 py-1 rounded-full">
              Consulta precio
            </span>
          </div>
        )}
      </div>

      {/* ── Info compacta (estilo Airbnb 233/234) ──────────── */}
      <div className="pt-3 px-1">
        {/* Línea 1: título + rating a la derecha */}
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-[15px] font-semibold text-gray-900 leading-snug line-clamp-1 flex-1">
            {title}
          </h3>
          <span className="inline-flex items-center gap-1 text-[14px] text-gray-900 shrink-0">
            <Star size={13} className="fill-current" strokeWidth={0} />
            {rating.toFixed(2)}
            {resenas > 0 && (
              <span className="text-gray-500 font-normal">({resenas})</span>
            )}
          </span>
        </div>

        {/* Línea 2: subtítulo (edificio · ciudad) */}
        <p className="text-[14px] text-gray-500 line-clamp-1 mt-0.5">{subtitle}</p>

        {/* Línea 3: precio por N noches (subrayado en hover, igual que Airbnb) */}
        <p className="mt-1.5 text-[14px] text-gray-900">
          {price ? (
            <>
              <span className="font-semibold underline decoration-gray-300 underline-offset-2">
                {fmtCOP(price.total, price.currency)}
              </span>
              <span className="text-gray-500"> por {noches} noche{noches !== 1 ? 's' : ''}</span>
            </>
          ) : (
            <span className="text-gray-500">Disponibilidad bajo consulta</span>
          )}
        </p>
      </div>
    </Link>
  );
}
