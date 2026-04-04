/**
 * Hero.tsx
 * Sección hero hotelera/turística: imagen grande con overlay oscuro,
 * título, descripción corta y badges de características.
 */

import { Users, BedDouble, Bath, MapPin } from 'lucide-react'
import Badge from '@/components/shared/Badge'
import type { Apartment } from '@/data/apartments'

interface HeroProps {
  apartment: Apartment
}

export default function Hero({ apartment }: HeroProps) {
  return (
    <div className='relative w-full h-[70vh] min-h-[450px] max-h-[800px] overflow-hidden'>
      {/* Imagen de fondo */}
      <img src={apartment.heroPhoto.src} alt={apartment.heroPhoto.alt} className='absolute inset-0 w-full h-full object-cover' />

      {/* Overlay gradiente oscuro para legibilidad */}
      <div className='absolute inset-0 bg-livic-black/20' />
      <div className='absolute inset-0 bg-gradient-to-t from-livic-black via-livic-black/70 via-40% to-transparent' />

      {/* Contenido sobre la imagen */}
      <div className='relative z-10 flex flex-col justify-end h-full px-5 md:px-8 pb-10 md:pb-16 max-w-4xl mx-auto w-full'>
        {/* Título principal con sombra para legibilidad */}
        <h1 className='text-4xl md:text-6xl font-bold text-livic-white leading-tight mb-4 drop-shadow-md'>
          {apartment.nombre}
        </h1>

        {/* Descripción corta con mejor contraste */}
        <p className='text-livic-white/90 text-lg md:text-xl max-w-2xl mb-8 leading-relaxed drop-shadow-sm'>
          {apartment.descripcionCorta}
        </p>
        {/* Badges superiores */}
        <div className='flex flex-wrap gap-2 mb-4'>
          <Badge variant='pink'>
            {apartment.edificio} · Piso {apartment.piso}
          </Badge>
          {apartment.ubicacion.accesoPlaya && <Badge variant='green'>🌊 Vista al mar</Badge>}
        </div>

        {/* Specs row con iconos */}
        <div className='flex flex-wrap items-center gap-y-3 gap-x-5 md:gap-x-8 text-livic-white/90 border-t border-livic-white/10 pt-6'>
          <div className='flex items-center gap-2.5'>
            <Users className='w-5 h-5 text-livic-pink' />
            <span className='text-sm md:text-base font-medium'>{apartment.huespedes} huéspedes</span>
          </div>

          <div className='hidden sm:block w-1 h-1 rounded-full bg-livic-white/20' />

          <div className='flex items-center gap-2.5'>
            <BedDouble className='w-5 h-5 text-livic-pink' />
            <span className='text-sm md:text-base font-medium'>{apartment.habitaciones} hab.</span>
          </div>

          <div className='hidden sm:block w-1 h-1 rounded-full bg-livic-white/20' />

          <div className='flex items-center gap-2.5'>
            <Bath className='w-5 h-5 text-livic-pink' />
            <span className='text-sm md:text-base font-medium'>{apartment.banos} baños</span>
          </div>

          <div className='hidden md:block w-1 h-1 rounded-full bg-livic-white/20' />

          <div className='flex items-center gap-2.5'>
            <MapPin className='w-5 h-5 text-livic-pink' />
            <span className='text-sm md:text-base font-medium'>
              {apartment.ubicacion.cercaDe || apartment.ubicacion.ciudad}, {apartment.ubicacion.departamento}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
