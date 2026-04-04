/**
 * catalog.ts
 * Capa de acceso a datos del catálogo de apartamentos.
 * Todo es estático; en el futuro se puede reemplazar por llamadas a API
 * sin cambiar la interfaz que consumen los componentes.
 */

import { APARTMENTS, type Apartment } from "@/data/apartments";

/**
 * Retorna todos los apartamentos del catálogo.
 */
export function getAllApartments(): Apartment[] {
  return APARTMENTS;
}

/**
 * Busca un apartamento por su slug.
 * Retorna `undefined` si no existe.
 */
export function getApartmentBySlug(slug: string): Apartment | undefined {
  return APARTMENTS.find((apt) => apt.slug === slug);
}

/**
 * Retorna los slugs válidos del catálogo.
 * Útil para generateStaticParams en [slug]/page.tsx.
 */
export function getAllSlugs(): string[] {
  return APARTMENTS.map((apt) => apt.slug);
}
