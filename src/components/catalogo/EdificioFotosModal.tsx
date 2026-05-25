'use client'

/**
 * EdificioFotosModal — galería del edificio en modal full-screen.
 *
 * Layout:
 *   - Header sticky: título + botón cerrar.
 *   - Grid responsivo (2/3/4 cols) scrolleable verticalmente.
 *   - Click sobre una foto → overlay carousel embla a pantalla completa
 *     con flechas, contador y ESC.
 *
 * Accesibilidad: <dialog> nativo (focus trap + ESC nativos), aria-labels
 * en botones, backdrop click cierra. Sin dependencias nuevas (reusa
 * embla-carousel-react ya en el bundle por DetailGallery).
 */

import { useCallback, useEffect, useRef, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

interface Foto {
  src: string
  alt: string
}

interface Props {
  open: boolean
  onClose: () => void
  fotos: Foto[]
  edificioNombre: string
}

export default function EdificioFotosModal({ open, onClose, fotos, edificioNombre }: Props) {
  const dialogRef = useRef<HTMLDialogElement | null>(null)
  const [lightbox, setLightbox] = useState<number | null>(null)
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, dragFree: false })

  // Sync open/close del <dialog> nativo. Usar el método del DOM
  // (showModal/close) garantiza focus trap + backdrop click nativos.
  useEffect(() => {
    const dlg = dialogRef.current
    if (!dlg) return
    if (open && !dlg.open) {
      dlg.showModal()
    } else if (!open && dlg.open) {
      dlg.close()
    }
  }, [open])

  // Si el navegador cierra el <dialog> (ESC, backdrop click), notificar al padre.
  useEffect(() => {
    const dlg = dialogRef.current
    if (!dlg) return
    const handleClose = () => {
      setLightbox(null)
      onClose()
    }
    dlg.addEventListener('close', handleClose)
    return () => dlg.removeEventListener('close', handleClose)
  }, [onClose])

  // Mover el carousel al slide seleccionado cuando se abre el lightbox.
  useEffect(() => {
    if (lightbox !== null && emblaApi) {
      emblaApi.scrollTo(lightbox, true)
    }
  }, [lightbox, emblaApi])

  // ESC dentro del lightbox vuelve a la grilla (no cierra el modal entero).
  useEffect(() => {
    if (lightbox === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        setLightbox(null)
      } else if (e.key === 'ArrowLeft') {
        emblaApi?.scrollPrev()
      } else if (e.key === 'ArrowRight') {
        emblaApi?.scrollNext()
      }
    }
    window.addEventListener('keydown', onKey, true)
    return () => window.removeEventListener('keydown', onKey, true)
  }, [lightbox, emblaApi])

  const prevLightbox = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const nextLightbox = useCallback(() => emblaApi?.scrollNext(), [emblaApi])
  const closeLightbox = useCallback(() => setLightbox(null), [])

  return (
    <dialog
      ref={dialogRef}
      // `fixed inset-0 m-auto` es el patrón canónico para centrar un <dialog>
      // nativo en viewports anchos. Sin `inset-0`, el browser no aplica
      // `margin: auto` correctamente cuando hay `w-full + max-w-*`.
      className="fixed inset-0 m-auto bg-transparent backdrop:bg-black/70 backdrop:backdrop-blur-sm w-full max-w-6xl h-[90vh] max-h-[90vh] p-0 rounded-3xl shadow-2xl"
      aria-labelledby="edificio-fotos-titulo"
    >
      <div className="flex flex-col h-full bg-white rounded-3xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-gray-100 bg-white sticky top-0 z-10">
          <div>
            <p className="text-[10px] text-gray-400 uppercase tracking-[0.18em] font-semibold">
              Fotos del edificio
            </p>
            <h2 id="edificio-fotos-titulo" className="text-base font-bold text-gray-900 mt-0.5">
              {edificioNombre}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar fotos del edificio"
            className="text-gray-400 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Grid */}
        <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-5">
          {fotos.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-12">
              Sin fotos disponibles todavía.
            </p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {fotos.map((foto, idx) => (
                <button
                  key={`${foto.src}-${idx}`}
                  type="button"
                  onClick={() => setLightbox(idx)}
                  aria-label={`Abrir foto: ${foto.alt}`}
                  className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100 group focus:outline-none focus-visible:ring-2 focus-visible:ring-livic-pink"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={foto.src}
                    alt={foto.alt}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Lightbox carousel (overlay encima del grid) */}
        {lightbox !== null && (
          <div className="absolute inset-0 bg-black/95 z-20 flex flex-col">
            <div className="flex items-center justify-between px-5 py-4">
              <span className="text-white text-sm font-medium">
                {lightbox + 1} / {fotos.length}
              </span>
              <button
                type="button"
                onClick={closeLightbox}
                aria-label="Volver a la grilla"
                className="text-white/80 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <X size={22} />
              </button>
            </div>

            <div className="flex-1 relative flex items-center" ref={emblaRef}>
              <div className="flex h-full w-full">
                {fotos.map((foto, idx) => (
                  <div key={`lb-${foto.src}-${idx}`} className="flex-[0_0_100%] h-full flex items-center justify-center px-12">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={foto.src}
                      alt={foto.alt}
                      className="max-w-full max-h-full object-contain rounded-2xl"
                    />
                  </div>
                ))}
              </div>

              {fotos.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={prevLightbox}
                    aria-label="Foto anterior"
                    className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors"
                  >
                    <ChevronLeft size={22} />
                  </button>
                  <button
                    type="button"
                    onClick={nextLightbox}
                    aria-label="Foto siguiente"
                    className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors"
                  >
                    <ChevronRight size={22} />
                  </button>
                </>
              )}
            </div>

            <p className="text-white/60 text-xs text-center pb-5">
              ESC para volver · flechas para navegar
            </p>
          </div>
        )}
      </div>
    </dialog>
  )
}
