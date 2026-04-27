/**
 * Mapeo del slug del API LIVIC al slug estático del catálogo de detalles.
 *
 * El backend usa slugs como "419-reserva-ii-419" mientras que la página
 * de detalle (`/catalogo/[slug]/page.tsx`) consume `data/apartments.ts`
 * con slugs como "estudio-luminoso-rdm2-419". Mapeamos por número de
 * apartamento, ya que es el único identificador estable compartido.
 *
 * Cuando un apartamento de la BD no tiene detalle estático todavía,
 * `getDetailSlug` devuelve `null` y la card debe deshabilitar el link.
 */

const STATIC_SLUG_BY_NUMERO: Record<string, string> = {
  '419': 'estudio-luminoso-rdm2-419',
  '519': 'estudio-moderno-519',
  '620': 'loft-vista-rdm2-620',
  '621': 'loft-premium-rdm2-621',
  '615': 'suite-balcon-playa-ss615',
  '915': 'reserva-del-mar-915',
  '931': 'on-the-beach-rdm-931',
  '1008': 'salguero-suite-1008',
};

export function getDetailSlug(numero: string): string | null {
  return STATIC_SLUG_BY_NUMERO[numero] ?? null;
}
