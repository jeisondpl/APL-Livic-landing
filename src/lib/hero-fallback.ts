/**
 * Resolver de hero-photo del catálogo.
 *
 * Política: las fotos SIEMPRE vienen del backend (campo `apartamentos.hero_photo`
 * JSONB o, si está null, la primera foto de la galería de Cloudinary resuelta
 * por el endpoint público). El frontend NO mantiene fotos hardcoded por
 * número de apartamento. Cuando el backend no devuelve nada, mostramos un
 * placeholder genérico de marca.
 *
 * El segundo parámetro `numero` se conserva por compatibilidad con callers
 * existentes, pero ya no se usa.
 */

import type { ApartmentHero } from './api';

/** Placeholder genérico cuando el apartamento aún no tiene foto subida. */
const PLACEHOLDER: ApartmentHero = {
  src: '/portada-landing.jpg',
  alt: 'Apartamento LIVIC en Santa Marta',
};

/**
 * Resuelve la hero photo para un apartamento del catálogo público.
 * Prioridad: heroPhoto del backend → placeholder genérico.
 *
 * El segundo parámetro `_numero` ya no se usa (se mantiene la firma para
 * no romper callers existentes).
 */
export function resolveHeroPhoto(
  heroPhoto: ApartmentHero | null,
  _numero?: string,
): ApartmentHero {
  if (heroPhoto?.src) return heroPhoto;
  return PLACEHOLDER;
}
