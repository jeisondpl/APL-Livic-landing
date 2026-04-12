/**
 * /catalogo/[slug] – Página de detalle de apartamento
 * Solo visible en desarrollo (localhost)
 */

import { notFound, redirect } from 'next/navigation'
import type { Metadata } from 'next'
import { getApartmentBySlug, getAllSlugs } from '@/lib/catalog'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import ApartmentDetailClient from '@/components/catalogo/ApartmentDetailClient'

interface SlugParams {
  slug: string
}

export async function generateStaticParams(): Promise<SlugParams[]> {
  if (process.env.NODE_ENV !== 'development') return []
  return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<SlugParams>
}): Promise<Metadata> {
  if (process.env.NODE_ENV !== 'development') {
    return { title: 'Catálogo en construcción – LIVIC' }
  }
  const { slug } = await params
  const apartment = getApartmentBySlug(slug)
  if (!apartment) return { title: 'Apartamento no encontrado' }

  return {
    title: `${apartment.nombre} – LIVIC`,
    description: apartment.descripcionCorta,
  }
}

export default async function ApartmentDetailPage({
  params,
}: {
  params: Promise<SlugParams>
}) {
  if (process.env.NODE_ENV !== 'development') {
    redirect('/catalogo')
  }

  const { slug } = await params
  const apartment = getApartmentBySlug(slug)

  if (!apartment) {
    notFound()
  }

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
