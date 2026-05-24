'use client'

import { useRouter } from 'next/navigation'
import { useCallback, useState, useEffect } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { motion } from 'framer-motion'
import {
  ChevronLeft,
  ChevronRight,
  BedDouble,
  Bath,
  Users,
  Star,
  LayoutGrid,
  X,
  Eye,
  Sparkles,
  Target,
  Info,
} from 'lucide-react'
import type { Apartment } from '@/data/apartments'
import AvailabilityBar from '@/components/catalogo/AvailabilityBar'
import Cotizador from '@/components/catalogo/Cotizador'
import MarkdownText from '@/components/catalogo/MarkdownText'
import MarketingList from '@/components/catalogo/MarketingList'
import CollapsibleSection from '@/components/catalogo/CollapsibleSection'
import { deriveAllNotas } from '@/lib/derive-notas'

// ── Variantes de animación ────────────────────────────────────────────────────

const fadeDown = {
  hidden: { opacity: 0, y: -20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
}

const fadeScale = {
  hidden: { opacity: 0, scale: 0.97 },
  show:   { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
}

const containerStagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.08 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
}

const slideRight = {
  hidden: { opacity: 0, x: 40 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
}

// ── Sección card ──────────────────────────────────────────────────────────────

function SectionCard({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={fadeUp}
      className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100 mb-4"
    >
      {children}
    </motion.div>
  )
}

// ── Gallery con Embla ─────────────────────────────────────────────────────────

function DetailGallery({ fotos }: { fotos: { src: string; alt: string }[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [showGrid, setShowGrid]           = useState(false)
  const [lightbox, setLightbox]           = useState<number | null>(null)

  const prev = useCallback((e: React.MouseEvent) => {
    e.preventDefault(); emblaApi?.scrollPrev()
  }, [emblaApi])

  const next = useCallback((e: React.MouseEvent) => {
    e.preventDefault(); emblaApi?.scrollNext()
  }, [emblaApi])

  const lightboxPrev = useCallback(() =>
    setLightbox(i => i !== null ? (i === 0 ? fotos.length - 1 : i - 1) : null)
  , [fotos.length])

  const lightboxNext = useCallback(() =>
    setLightbox(i => i !== null ? (i === fotos.length - 1 ? 0 : i + 1) : null)
  , [fotos.length])

  useEffect(() => {
    if (!emblaApi) return
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap())
    emblaApi.on('select', onSelect)
    onSelect()
    return () => { emblaApi.off('select', onSelect) }
  }, [emblaApi])

  // Bloquear scroll cuando el grid o lightbox están abiertos
  useEffect(() => {
    document.body.style.overflow = (showGrid || lightbox !== null) ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [showGrid, lightbox])

  const totalDots = Math.min(fotos.length, 5)
  const dotIndex  = Math.round((selectedIndex / Math.max(fotos.length - 1, 1)) * (totalDots - 1))

  return (
    <>
      <motion.div variants={fadeScale} initial="hidden" animate="show" className="relative">

        {/* Viewport slider */}
        <div ref={emblaRef} className="h-[320px] md:h-[480px] rounded-[2.5rem] overflow-hidden">
          <div className="flex h-full">
            {fotos.map((foto, i) => (
              <div key={i} className="relative flex-[0_0_100%] h-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={foto.src} alt={foto.alt}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading={i === 0 ? 'eager' : 'lazy'}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Flechas */}
        {fotos.length > 1 && (
          <>
            <button aria-label="Foto anterior" onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-2.5 rounded-full shadow-md transition-all">
              <ChevronLeft size={20} className="text-gray-800" />
            </button>
            <button aria-label="Foto siguiente" onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-2.5 rounded-full shadow-md transition-all">
              <ChevronRight size={20} className="text-gray-800" />
            </button>
          </>
        )}

        {/* Dots */}
        {fotos.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
            {Array.from({ length: totalDots }).map((_, i) => (
              <div key={i} className={`rounded-full transition-all duration-300 ${i === dotIndex ? 'w-5 h-2 bg-white' : 'w-2 h-2 bg-white/60'}`} />
            ))}
          </div>
        )}

        {/* Botón "Mostrar todas las fotos" — bottom-right */}
        <button
          onClick={() => setShowGrid(true)}
          className="absolute bottom-4 right-4 z-10 flex items-center gap-2 bg-white text-gray-900 text-sm font-bold px-4 py-2.5 rounded-2xl shadow-lg hover:bg-gray-50 transition-all border border-gray-100"
        >
          <LayoutGrid size={16} />
          Mostrar todas las fotos
        </button>

      </motion.div>

      {/* ── Modal grid "todas las fotos" ── */}
      {showGrid && (
        <div className="fixed inset-0 z-[200] bg-white overflow-y-auto">
          {/* Header del modal */}
          <div className="sticky top-0 bg-white border-b border-gray-100 z-10 px-6 py-4 flex items-center justify-between">
            <h2 className="font-bold text-gray-900 text-lg">
              Todas las fotos <span className="text-gray-400 font-normal text-base ml-1">({fotos.length})</span>
            </h2>
            <button
              onClick={() => setShowGrid(false)}
              className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              aria-label="Cerrar"
            >
              <X size={18} className="text-gray-700" />
            </button>
          </div>

          {/* Grid de fotos */}
          <div className="max-w-5xl mx-auto px-4 py-6 grid grid-cols-2 md:grid-cols-3 gap-3">
            {fotos.map((foto, i) => (
              <button
                key={i}
                onClick={() => { setLightbox(i); setShowGrid(false) }}
                className="relative aspect-[4/3] overflow-hidden rounded-2xl group"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={foto.src} alt={foto.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors rounded-2xl" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Lightbox ── */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[300] bg-black/95 flex items-center justify-center"
          onClick={() => setLightbox(null)}
        >
          {/* Cerrar */}
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center z-10"
            aria-label="Cerrar"
          >
            <X size={20} className="text-white" />
          </button>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); lightboxPrev() }}
            className="absolute left-4 md:left-8 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center z-10 transition-colors"
            aria-label="Anterior"
          >
            <ChevronLeft size={26} className="text-white" />
          </button>

          {/* Foto */}
          <div className="max-w-[90vw] max-h-[85vh]" onClick={e => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={fotos[lightbox].src}
              alt={fotos[lightbox].alt}
              className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
            />
          </div>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); lightboxNext() }}
            className="absolute right-4 md:right-8 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center z-10 transition-colors"
            aria-label="Siguiente"
          >
            <ChevronRight size={26} className="text-white" />
          </button>

          {/* Contador */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-sm text-white text-sm font-medium px-5 py-2 rounded-full border border-white/20">
            {lightbox + 1} / {fotos.length}
          </div>
        </div>
      )}
    </>
  )
}

// ── Componente principal ──────────────────────────────────────────────────────

interface ApartmentDetailClientProps {
  apartment: Apartment
}

export default function ApartmentDetailClient({ apartment }: ApartmentDetailClientProps) {
  const router  = useRouter()
  const rating   = apartment.anfitrionPrincipal.calificacion ?? 5.0
  const resenas  = apartment.anfitrionPrincipal.resenas ?? 0
  const precio   = apartment.precioNoche

  // Volver al estado previo (resultados con fechas/huéspedes preservados) usando
  // el historial del browser. Si el usuario aterrizó directo en /catalogo/[slug]
  // (p. ej. share link), `router.back()` puede no aplicar — fallback a /catalogo.
  const handleVolver = useCallback(() => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back()
    } else {
      router.push('/catalogo#alojamientos')
    }
  }, [router])

  const precioFormateado = precio != null
    ? new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        maximumFractionDigits: 0,
      }).format(precio)
    : null

  // Galería del backend (Cloudinary). Si está vacía, `ficha-to-apartment` ya
  // cae al hero como único elemento. No prefijamos heroPhoto acá para evitar
  // duplicarlo o forzar el placeholder genérico como primera foto cuando el
  // apto SÍ tiene galería real en el back.
  const fotos = apartment.galeria

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 py-6">

      {/* ── [1] Header ── */}
      <motion.div
        variants={fadeDown}
        initial="hidden"
        animate="show"
        className="flex items-center justify-between mb-6"
      >
        <button
          onClick={handleVolver}
          aria-label='Volver a los resultados'
          className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-livic-pink transition-colors"
        >
          <ChevronLeft size={18} />
          Volver
        </button>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo-livic.png" alt="LIVIC" className="h-8 w-auto" />
      </motion.div>

      {/* ── [2] Galería ── */}
      <div className="mb-6">
        <DetailGallery fotos={fotos} />
      </div>

      {/* ── [3] Grid 2 columnas ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* ── Columna izquierda ── */}
        <motion.div
          className="lg:col-span-2"
          variants={containerStagger}
          initial="hidden"
          animate="show"
        >

          {/* Título + specs */}
          <SectionCard>
            {/* Badges de edificio / tipo */}
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="text-xs bg-livic-pink/10 text-livic-pink font-semibold px-3 py-1.5 rounded-full">
                {apartment.edificio}
              </span>
              <span className="text-xs bg-gray-100 text-gray-600 font-medium px-3 py-1.5 rounded-full">
                Piso {apartment.piso}
              </span>
              <span className="text-xs bg-gray-100 text-gray-600 font-medium px-3 py-1.5 rounded-full">
                {apartment.tipo}
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight mb-3">
              {apartment.nombre}
            </h1>

            {/* Vistas — subtítulo aspiracional bajo el título */}
            {apartment.vistas && apartment.vistas.length > 0 && (
              <div className="flex items-center gap-2 mb-4 text-sm">
                <Eye size={16} className="text-livic-purple flex-shrink-0" />
                <span className="text-gray-600">
                  <span className="font-semibold text-livic-purple">Vistas</span>{' · '}
                  {apartment.vistas.slice(0, 3).join(' · ')}
                  {apartment.vistas.length > 3 && (
                    <span className="text-gray-400"> · +{apartment.vistas.length - 3} más</span>
                  )}
                </span>
              </div>
            )}

            {/* Specs row */}
            <div className="flex flex-wrap items-center gap-5 text-gray-500 mb-4">
              <div className="flex items-center gap-2">
                <BedDouble size={18} className="text-gray-300" />
                <span className="text-sm font-medium">{apartment.habitaciones} habitaciones</span>
              </div>
              <div className="flex items-center gap-2">
                <Bath size={18} className="text-gray-300" />
                <span className="text-sm font-medium">{apartment.banos} baños</span>
              </div>
              <div className="flex items-center gap-2">
                <Users size={18} className="text-gray-300" />
                <span className="text-sm font-medium">{apartment.huespedes} huéspedes</span>
              </div>
            </div>

            <p className="text-gray-600 text-sm leading-relaxed">
              {apartment.descripcionCorta}
            </p>
          </SectionCard>

          {/* Descripción larga (markdown renderizado con saltos, listas, negritas) */}
          <SectionCard>
            <h2 className="text-base font-bold text-gray-900 mb-3">Sobre el apartamento</h2>
            <MarkdownText source={apartment.descripcionLarga} compact />
            {apartment.frasePosituelo && (
              <p className="text-livic-purple italic text-sm mt-4">
                &ldquo;{apartment.frasePosituelo}&rdquo;
              </p>
            )}
          </SectionCard>

          {/* Fortalezas + Huésped ideal — títulos espejo del PMS */}
          {((apartment.fortalezas?.length ?? 0) > 0 || (apartment.huespedIdeal?.length ?? 0) > 0) && (
            <SectionCard>
              {apartment.fortalezas && apartment.fortalezas.length > 0 && (
                <MarketingList
                  title="Fortalezas"
                  titleIcon={<Sparkles size={16} />}
                  items={apartment.fortalezas}
                  tone="green"
                  layout="grid"
                  iconPerItem="check"
                />
              )}
              {apartment.huespedIdeal && apartment.huespedIdeal.length > 0 && (
                <div className={apartment.fortalezas && apartment.fortalezas.length > 0 ? 'mt-5' : ''}>
                  <MarketingList
                    title="Huésped ideal"
                    titleIcon={<Target size={16} />}
                    items={apartment.huespedIdeal}
                    tone="purple"
                    layout="chips"
                  />
                </div>
              )}
            </SectionCard>
          )}

          {/* Amenidades */}
          <SectionCard>
            <h2 className="text-base font-bold text-gray-900 mb-4">Amenidades</h2>
            <div className="space-y-5">
              {apartment.amenidades.slice(0, 3).map((cat) => (
                <div key={cat.titulo}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-base">{cat.icono}</span>
                    <p className="text-sm font-semibold text-gray-700">{cat.titulo}</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {cat.items.slice(0, 6).map((item) => (
                      <div key={item.nombre} className="flex items-center gap-2 text-gray-600">
                        <span className="text-livic-green text-xs">✓</span>
                        <span className="text-sm">{item.nombre}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* No incluido — transparente, al fondo de la sección de amenidades */}
            {apartment.noIncluidos.length > 0 && (
              <div className="mt-5 pt-5 border-t border-gray-100">
                <MarketingList
                  title="No incluidos"
                  items={apartment.noIncluidos}
                  tone="gray"
                  layout="list"
                  iconPerItem="cross"
                />
              </div>
            )}
          </SectionCard>

          {/* Check-in / Check-out */}
          <SectionCard>
            <h2 className="text-base font-bold text-gray-900 mb-4">Check-in y Check-out</h2>
            <div className="flex gap-3 mb-4">
              <div className="flex-1 bg-gray-50 border border-gray-200 rounded-2xl p-4 text-center">
                <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold mb-1">Check-in</p>
                <p className="text-xl font-bold text-gray-900">{apartment.checkIn}</p>
              </div>
              <div className="flex-1 bg-gray-50 border border-gray-200 rounded-2xl p-4 text-center">
                <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold mb-1">Check-out</p>
                <p className="text-xl font-bold text-gray-900">{apartment.checkOut}</p>
              </div>
            </div>

            {/* Información importante — auto-derivada de campos estructurados
                (manilla, silencio) + notas custom del operador sin duplicar.
                Cambiar costoManillaPersona en el PMS actualiza el texto AQUÍ
                automáticamente. */}
            {(() => {
              const notas = deriveAllNotas(apartment)
              if (notas.length === 0) return null
              return (
                <div className="bg-livic-yellow/10 border border-livic-yellow/30 rounded-2xl p-4">
                  <p className="text-xs font-bold text-amber-700 uppercase tracking-wide mb-2">
                    Notas
                  </p>
                  <ul className="space-y-2">
                    {notas.map((nota, i) => (
                      <li key={`${nota.source}-${i}`} className="flex items-start gap-2">
                        <span className="mt-0.5 text-livic-yellow text-xs flex-shrink-0">⚠</span>
                        <span className="text-gray-600 text-sm leading-snug">{nota.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })()}
          </SectionCard>

          {/* Cosas a tener en cuenta (debilidades — disclosure honest) */}
          <section className='my-6'>

          {apartment.debilidades && apartment.debilidades.length > 0 && (
            <CollapsibleSection
              title="Debilidades"
              icon={<Info size={16} />}
              tone="amber"
              defaultOpen={false}
            >
              <ul className="space-y-2">
                {apartment.debilidades.map((item, i) => (
                  <li key={`${item}-${i}`} className="flex items-start gap-2 text-sm text-gray-700 leading-relaxed">
                    <span className="mt-1 text-amber-500 text-xs flex-shrink-0">•</span>
                    <span className="flex-1">{item}</span>
                  </li>
                ))}
              </ul>
            </CollapsibleSection>
          )}
          </section>

          {/* Anfitrión */}
          <SectionCard>
            <h2 className="text-base font-bold text-gray-900 mb-4">Tu anfitrión</h2>
            <div className="flex items-start gap-4">
              {/* Avatar con inicial */}
              <div className="w-14 h-14 rounded-full bg-livic-pink/15 flex items-center justify-center flex-shrink-0">
                <span className="text-xl font-bold text-livic-pink">
                  {apartment.anfitrionPrincipal.nombre.charAt(0)}
                </span>
              </div>
              <div>
                <p className="font-bold text-gray-900">{apartment.anfitrionPrincipal.nombre}</p>
                {apartment.anfitrionPrincipal.empresa && (
                  <p className="text-sm text-gray-500">{apartment.anfitrionPrincipal.empresa}</p>
                )}
                <div className="flex items-center gap-1.5 mt-1">
                  <Star size={13} className="fill-livic-yellow text-livic-yellow" />
                  <span className="text-sm font-semibold text-gray-800">
                    {rating.toFixed(2)}
                  </span>
                  {resenas > 0 && (
                    <span className="text-xs text-gray-400">({resenas} reseñas)</span>
                  )}
                  {apartment.anfitrionPrincipal.anosExperiencia && (
                    <span className="text-xs text-gray-400">
                      · {apartment.anfitrionPrincipal.anosExperiencia} años de experiencia
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Co-anfitrión */}
            {apartment.coanfitrion && (
              <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-100">
                <div className="w-10 h-10 rounded-full bg-livic-purple/15 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-livic-purple">
                    {apartment.coanfitrion.nombre.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">{apartment.coanfitrion.nombre}</p>
                  <p className="text-xs text-gray-400">Co-anfitrión</p>
                </div>
              </div>
            )}
          </SectionCard>

          {/* Servicios */}
          <SectionCard>
            <h2 className="text-base font-bold text-gray-900 mb-4">Servicios y políticas</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {apartment.servicios.map((svc) => (
                <div
                  key={svc.etiqueta}
                  className="flex items-start gap-3 rounded-xl p-3 bg-gray-50"
                >
                  <div
                    className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      svc.disponible
                        ? 'bg-livic-green/20 text-livic-green'
                        : 'bg-gray-200 text-gray-400'
                    }`}
                  >
                    {svc.disponible ? '✓' : '✕'}
                  </div>
                  <div>
                    <p className={`text-sm font-medium ${svc.disponible ? 'text-gray-800' : 'text-gray-400'}`}>
                      {svc.etiqueta}
                    </p>
                    {svc.nota && (
                      <p className="text-xs text-gray-400 mt-0.5">{svc.nota}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

        </motion.div>

        {/* ── Columna derecha — sticky booking card ── */}
        <motion.div
          variants={slideRight}
          initial="hidden"
          animate="show"
          className="lg:col-span-1"
        >
          <div className="lg:sticky lg:top-6">
            <div className="bg-white rounded-[3rem] p-6 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.12)] border border-gray-100">

              {/* Precio */}
              <div className="mb-5">
                {precioFormateado != null ? (
                  <div className="flex items-baseline gap-2">
                    <span className="text-[2rem] font-bold text-gray-900 leading-none">
                      {precioFormateado}
                    </span>
                    <span className="text-gray-400 text-sm">/ noche</span>
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">{apartment.edificio}</p>
                )}
                <div className="flex items-center gap-1 mt-2">
                  <Star size={14} className="fill-livic-yellow text-livic-yellow" />
                  <span className="font-semibold text-sm text-gray-800">{rating.toFixed(2)}</span>
                  {resenas > 0 && (
                    <span className="text-gray-400 text-sm">({resenas} reseñas)</span>
                  )}
                </div>
              </div>

              {/* Fechas / huéspedes: Cotizador incluye AvailabilityBar; sin API, barra suelta + CTA */}
              {!apartment.apiSlug && (
                <>
                  <AvailabilityBar />
                  <button className="w-full mt-2 bg-livic-black text-white font-bold py-4 rounded-[2rem] hover:bg-livic-pink transition-colors text-sm">
                    Consultar disponibilidad
                  </button>
                </>
              )}

              {/* Cotiza tu estadía — solo si el apartamento está sincronizado con la API LIVIC */}
              {apartment.apiSlug && (
                <>
                  <Cotizador
                    apiSlug={apartment.apiSlug}
                    huespedesMaximos={apartment.huespedes}
                    nochesMinimas={2}
                  />
                 
                </>
              )}

              {/* Badges (highlights) — título espejo del label del PMS */}
              {apartment.badges.length > 0 && (
                <div className="mt-4">
                  <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">
                    Badges (highlights)
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {apartment.badges.slice(0, 4).map((badge) => (
                      <span
                        key={badge}
                        className="text-xs bg-livic-pink/10 text-livic-pink font-medium px-3 py-1.5 rounded-full"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  )
}
