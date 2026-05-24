'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import useEmblaCarousel from 'embla-carousel-react'
import { useCallback, useMemo } from 'react'
import type { Apartment } from '@/data/apartments'
import { Users, BedDouble, Bath, Heart, Star, ChevronLeft, ChevronRight } from 'lucide-react'

interface CardProps {
  apartment: Apartment
}

export default function Card({ apartment }: CardProps) {
  const rating  = apartment.anfitrionPrincipal.calificacion ?? 5.0
  const resenas = apartment.anfitrionPrincipal.resenas ?? 0
  const precio  = apartment.precioNoche
  // Propaga range/guests del catálogo al detalle si el usuario filtró antes.
  const searchParams = useSearchParams()
  const href = useMemo(() => {
    const path = `/catalogo/${apartment.slug}`
    const sp = new URLSearchParams()
    const range = searchParams.get('range')
    const guests = searchParams.get('guests')
    if (range) sp.set('range', range)
    if (guests) sp.set('guests', guests)
    const qs = sp.toString()
    return qs ? `${path}?${qs}` : path
  }, [apartment.slug, searchParams])

  const precioFormateado = precio != null
    ? new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(precio)
    : null

  // Hasta 5 fotos: hero + primeras 4 de la galería
  const fotos = [apartment.heroPhoto, ...apartment.galeria.slice(0, 4)]

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, dragFree: false })

  const prev = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    emblaApi?.scrollPrev()
  }, [emblaApi])

  const next = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    emblaApi?.scrollNext()
  }, [emblaApi])

  return (
    <Link
      href={href}
      className="card-hover group block bg-white rounded-[3.5rem] p-5 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.10)] border border-gray-100"
    >
      {/* ── Slider de fotos ── */}
      <div className="relative">

        {/* Viewport Embla */}
        <div className="relative h-[280px] rounded-[3rem] overflow-hidden" ref={emblaRef}>
          <div className="flex h-full">
            {fotos.map((foto, i) => (
              <div key={i} className="relative flex-[0_0_100%] h-full">
                <Image
                  src={foto.src}
                  alt={foto.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 400px"
                  quality={85}
                  priority={i === 0}
                />
              </div>
            ))}
          </div>

          {/* Badge top-left */}
          <div className="absolute top-5 left-5 z-10">
            <span className="bg-white px-5 py-2.5 rounded-[1.25rem] shadow-sm text-livic-pink font-bold text-sm">
              Apto. {apartment.apartamento} {
                apartment.edificio === "Salguero Suite" ? "SS" :
                apartment.edificio === "Salguero Park" ? "SP" :
                apartment.edificio === "Reserva del Mar 2" ? "Rdm2" :
                apartment.edificio === "Reserva del Mar" ? "Rdm" :
                ""
              }
            </span>
          </div>

          {/* Corazón top-right */}
          <button
            aria-label="Guardar"
            className="absolute top-5 right-5 z-10 bg-white p-3 rounded-full shadow-sm hover:scale-110 transition-transform"
            onClick={(e) => e.preventDefault()}
          >
            <Heart size={20} className="text-gray-900" />
          </button>

          {/* Flechas — solo si hay más de 1 foto */}
          {fotos.length > 1 && (
            <>
              <button
                aria-label="Foto anterior"
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-2 rounded-full shadow-md transition-all opacity-0 group-hover:opacity-100"
              >
                <ChevronLeft size={18} className="text-gray-800" />
              </button>
              <button
                aria-label="Foto siguiente"
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-2 rounded-full shadow-md transition-all opacity-0 group-hover:opacity-100"
              >
                <ChevronRight size={18} className="text-gray-800" />
              </button>
            </>
          )}
        </div>

        {/* Rating badge — fuera del overflow-hidden, sobresale sobre el contenido */}
        <div className="absolute bottom-0 right-6 translate-y-1/2 bg-white px-4 py-2.5 rounded-[1.5rem] shadow-[0_10px_25px_rgba(0,0,0,0.10)] flex items-center gap-1.5 border border-gray-50 z-10">
          <Star size={16} className="fill-livic-yellow text-livic-yellow" />
          <span className="font-bold text-gray-900 text-base">{rating.toFixed(2)}</span>
          {resenas > 0 && (
            <span className="text-gray-400 text-sm font-medium">({resenas})</span>
          )}
        </div>
      </div>

      {/* ── Contenido ── */}
      <div className="pt-10 px-3 pb-2">

        {/* Título */}
        <h3 className="text-[1.35rem] font-bold text-gray-900 leading-[1.2] mb-4 tracking-tight line-clamp-2">
          {apartment.nombre}
        </h3>

        {/* Specs */}
        <div className="flex items-center gap-6 text-gray-400 mb-8">
          <div className="flex items-center gap-2">
            <BedDouble size={20} className="text-gray-300" />
            <span className="text-base font-medium">{apartment.habitaciones} hab.</span>
          </div>
          <div className="flex items-center gap-2">
            <Bath size={20} className="text-gray-300" />
            <span className="text-base font-medium">{apartment.banos} baños</span>
          </div>
          <div className="flex items-center gap-2">
            <Users size={20} className="text-gray-300" />
            <span className="text-base font-medium">{apartment.huespedes} huésp.</span>
          </div>
        </div>

        {/* Footer: precio + botón circular */}
        <div className="flex items-center justify-between">
          {precioFormateado != null ? (
            <div className="flex flex-col">
              <span className="text-[1.5rem] font-bold text-gray-900 tracking-tight leading-none">
                {precioFormateado}
              </span>
              <span className="text-gray-400 text-xs font-medium mt-1">por noche</span>
            </div>
          ) : (
            <p className="text-gray-400 text-sm truncate max-w-[140px]">
              {apartment.edificio}
            </p>
          )}

          {/* Botón circular con flecha */}
          <div className="flex flex-col items-center gap-1">
            <div className="w-14 h-14 rounded-full bg-livic-black flex items-center justify-center shadow-lg group-hover:bg-livic-pink transition-colors duration-300">
              <ChevronRight size={24} className="text-white translate-x-0.5" />
            </div>
            <span className="text-[10px] font-semibold text-gray-400 tracking-wide uppercase">Ver detalle</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
