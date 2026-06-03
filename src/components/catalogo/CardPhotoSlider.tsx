'use client';

/**
 * CardPhotoSlider — slider de fotos para las cards del catálogo.
 *
 * Diseño tipo Airbnb:
 *   - Foto fill con aspect-square (igual que la card original)
 *   - Flechas left/right que aparecen al hover
 *   - Indicadores (dots) abajo
 *   - Swipe táctil en mobile (touch events nativos)
 *   - Si solo hay 1 foto, no muestra flechas ni dots
 *
 * No usa libs externas (sin embla, swiper, etc.) — solo state + Tailwind.
 */

import Image from 'next/image';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Photo {
  src: string;
  alt: string | null;
}

interface Props {
  photos: Photo[];
  /** Alt fallback cuando una foto no trae alt. */
  fallbackAlt?: string;
  /** sizes prop para Next/Image. */
  sizes?: string;
}

export default function CardPhotoSlider({
  photos,
  fallbackAlt = 'Foto del apartamento',
  sizes = '(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 320px',
}: Props) {
  const [index, setIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  // Si no hay fotos, no renderizamos nada (el caller debe usar otro fallback)
  if (photos.length === 0) return null;

  const total = photos.length;
  const hasMultiple = total > 1;

  /** Navegación cíclica. preventDefault para no disparar el <Link> de la card. */
  const goPrev = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIndex((i) => (i - 1 + total) % total);
  };
  const goNext = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIndex((i) => (i + 1) % total);
  };
  const goTo = (e: React.MouseEvent, target: number) => {
    e.preventDefault();
    e.stopPropagation();
    setIndex(target);
  };

  // Swipe táctil (mobile)
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX;
    const THRESHOLD = 50;
    if (Math.abs(deltaX) > THRESHOLD) {
      if (deltaX < 0) goNext(e);
      else goPrev(e);
    }
    setTouchStartX(null);
  };

  return (
    <div
      className="absolute inset-0 w-full h-full"
      onTouchStart={hasMultiple ? onTouchStart : undefined}
      onTouchEnd={hasMultiple ? onTouchEnd : undefined}
    >
      {/* ── Stack de imágenes (todas montadas, solo la actual visible) ──
         Esto permite transiciones suaves sin re-fetch y prefetch de las
         vecinas por parte del browser. */}
      {photos.map((photo, i) => (
        <div
          key={i}
          className={cn(
            'absolute inset-0 transition-opacity duration-300',
            i === index ? 'opacity-100 z-[1]' : 'opacity-0 z-0',
          )}
          aria-hidden={i !== index}
        >
          <Image
            src={photo.src}
            alt={photo.alt ?? fallbackAlt}
            fill
            className={cn(
              'object-cover',
              // Sutil zoom al hover SOLO en la activa
              i === index && 'transition-transform duration-500 group-hover:scale-105',
            )}
            sizes={sizes}
            quality={80}
            // Solo la primera con priority/eager, las demás lazy
            priority={i === 0}
            loading={i === 0 ? undefined : 'lazy'}
          />
        </div>
      ))}

      {/* ── Controles de navegación (solo si hay > 1 foto) ── */}
      {hasMultiple && (
        <>
          {/* Flecha izquierda */}
          <button
            type="button"
            onClick={goPrev}
            aria-label="Foto anterior"
            className={cn(
              'absolute left-2 top-1/2 -translate-y-1/2 z-10',
              'flex items-center justify-center w-8 h-8 rounded-full',
              'bg-white/90 hover:bg-white shadow-md',
              'opacity-0 group-hover:opacity-100 transition-opacity duration-200',
              'focus:outline-none focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-livic-pink/40',
              // Mobile: visible siempre con menos opacidad
              'sm:opacity-0',
            )}
          >
            <ChevronLeft size={16} className="text-gray-800" strokeWidth={2.5} />
          </button>

          {/* Flecha derecha */}
          <button
            type="button"
            onClick={goNext}
            aria-label="Foto siguiente"
            className={cn(
              'absolute right-2 top-1/2 -translate-y-1/2 z-10',
              'flex items-center justify-center w-8 h-8 rounded-full',
              'bg-white/90 hover:bg-white shadow-md',
              'opacity-0 group-hover:opacity-100 transition-opacity duration-200',
              'focus:outline-none focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-livic-pink/40',
              'sm:opacity-0',
            )}
          >
            <ChevronRight size={16} className="text-gray-800" strokeWidth={2.5} />
          </button>

          {/* Dots */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5">
            {photos.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={(e) => goTo(e, i)}
                aria-label={`Foto ${i + 1} de ${total}`}
                aria-current={i === index ? 'true' : undefined}
                className={cn(
                  'rounded-full transition-all',
                  i === index
                    ? 'w-2 h-2 bg-white'
                    : 'w-1.5 h-1.5 bg-white/60 hover:bg-white/80',
                )}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
