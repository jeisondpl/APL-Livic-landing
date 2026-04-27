/**
 * /catalogo — Pantalla "Cotiza tu estadía en Santa Marta".
 *
 * Server Component: hace fetch del listado público de apartamentos
 * (sin auth, contra `${NEXT_PUBLIC_LIVIC_API_URL}/api/public/apartamentos`).
 * Si falla, muestra el placeholder "En construcción" con CTA de WhatsApp.
 *
 * El detalle de cada apartamento (`/catalogo/[slug]`) sigue siendo solo
 * accesible en desarrollo hasta que las páginas de detalle estén listas.
 */

import Nav from '@/components/layout/Nav';
import SearchFlow from '@/components/catalogo/SearchFlow';
import EnConstruccion from '@/components/catalogo/EnConstruccion';
import type { PublicApartamentoSummary } from '@/lib/api';

const API_BASE_URL = process.env.NEXT_PUBLIC_LIVIC_API_URL || 'http://localhost:3002';

async function loadApartments(): Promise<PublicApartamentoSummary[] | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/public/apartamentos`, {
      // ISR cada 5 min — los datos del catálogo no cambian con frecuencia
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;
    const body = await res.json();
    return (body?.data as PublicApartamentoSummary[]) ?? null;
  } catch {
    return null;
  }
}

export default async function CatalogoPage() {
  const apartments = await loadApartments();

  if (!apartments || apartments.length === 0) {
    return (
      <>
        <Nav />
        <EnConstruccion />
      </>
    );
  }

  return (
    <>
      <Nav />
      <SearchFlow apartments={apartments} />
    </>
  );
}
