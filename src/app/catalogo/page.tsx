/**
 * /catalogo – Catálogo de alojamientos
 */

import { getAllApartments } from '@/lib/catalog'
import Nav from '@/components/layout/Nav'
import SearchFlow from '@/components/catalogo/SearchFlow'

export const metadata = {
  title: 'Catálogo de Alojamientos – LIVIC',
  description: 'Descubre apartamentos cuidadosamente seleccionados en Santa Marta.',
}

export default function CatalogoPage() {
  const apartments = getAllApartments()
  return (
    <>
      <Nav />
      <SearchFlow apartments={apartments} />
    </>
  )
}
