/**
 * /catalogo/[slug] — Página de detalle del apartamento.
 *
 * Server Component que fetchea la ficha pública desde el API LIVIC
 * (`GET /api/public/apartamentos/:slug`) y la mapea al shape `Apartment`
 * que consume `ApartmentDetailClient`. ISR cada 5 minutos.
 */

import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import ApartmentDetailClient from '@/components/catalogo/ApartmentDetailClient'
import type { PublicFicha } from '@/lib/api'
import { publicFichaToApartment } from '@/lib/ficha-to-apartment'

const API_BASE_URL = process.env.NEXT_PUBLIC_LIVIC_API_URL || 'http://localhost:3002'

interface SlugParams {
  slug: string
}

async function loadFicha(slug: string): Promise<PublicFicha | null> {
  try {
    const res = await fetch(
      `${API_BASE_URL}/api/public/apartamentos/${encodeURIComponent(slug)}`,
      // En desarrollo no cacheamos para reflejar cambios del backend al
      // instante. En producción aplicamos ISR de 5 minutos.
      process.env.NODE_ENV === 'development'
        ? { cache: 'no-store' }
        : { next: { revalidate: 300 } },
    )
    if (!res.ok) return null
    const body = await res.json()
    return (body?.data as PublicFicha) ?? null
  } catch {
    return null
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<SlugParams>
}): Promise<Metadata> {
  const { slug } = await params
  const ficha = await loadFicha(slug)
  if (!ficha) return { title: 'Apartamento no encontrado · LIVIC' }
  const titulo = ficha.apartamento.tituloAnuncio ?? ficha.apartamento.nombre
  return {
    title: `${titulo} · ${ficha.edificio.nombre} – LIVIC`,
    description: ficha.apartamento.descripcionCorta ?? undefined,
  }
}

export default async function ApartmentDetailPage({
  params,
}: {
  params: Promise<SlugParams>
}) {
  const { slug } = await params
  const ficha = await loadFicha(slug)

  if (!ficha) {
    notFound()
  }

  const apartment = publicFichaToApartment(ficha)

  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <div className="pt-14">
        <ApartmentDetailClient apartment={apartment} />
      </div>
      <Footer />
    </div>
  )
}
