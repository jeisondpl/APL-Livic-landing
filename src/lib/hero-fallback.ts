/**
 * Mapeo de fallback de hero-photos por número de apartamento.
 * Cuando el backend aún no expone la foto principal del apto, usamos
 * las fotos estáticas que ya están en /public/source/. Para apartamentos
 * sin foto disponible se devuelve un placeholder genérico.
 */

import type { ApartmentHero } from './api';

const FALLBACK_BY_NUMERO: Record<string, ApartmentHero> = {
  '419': {
    src: '/source/rdm2-419/IMG_20260212_104825926.jpg',
    alt: 'Estudio luminoso 419 — vista general',
  },
  '519': {
    src: '/source/apt519/IMG_20260128_092308153_HDR.jpg',
    alt: 'Estudio 519 — sofá turquesa, cama doble y armario empotrado',
  },
  '915': {
    src: '/source/reservadelmar/915/IMG_3169-HDR.jpg',
    alt: 'Apartamento 915 — vista al mar Caribe desde el balcón',
  },
  '1008': {
    src: '/source/salgerosuite/1008/IMG_20260122_160229826_HDR.jpg',
    alt: 'Vista general del apartamento 1008',
  },
  '620': {
    src: '/source/rdm2-620/Sin-título-1.jpg',
    alt: 'Vista general del loft 620 - Reserva del Mar 2',
  },
};

/** Genérica para apartamentos sin foto cargada aún. */
const PLACEHOLDER: ApartmentHero = {
  src: '/portada-landing.jpg',
  alt: 'Apartamento LIVIC en Santa Marta',
};

/**
 * Resuelve la hero photo para un apartamento del catálogo público.
 * Prioridad: heroPhoto del backend → fallback por número → placeholder.
 */
export function resolveHeroPhoto(
  heroPhoto: ApartmentHero | null,
  numero: string,
): ApartmentHero {
  if (heroPhoto?.src) return heroPhoto;
  return FALLBACK_BY_NUMERO[numero] ?? PLACEHOLDER;
}
