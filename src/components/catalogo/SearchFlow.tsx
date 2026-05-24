'use client'

/**
 * SearchFlow.tsx
 * Mobile  → scroll vertical, navbar fijo
 * Desktop → dos paneles side-by-side, transición horizontal con translateX
 *           scroll vertical solo dentro del panel de resultados
 */

import { useState, useEffect, useLayoutEffect, useRef, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import AvailabilityBar, { type Guests } from '@/components/catalogo/AvailabilityBar'
import ApartmentSearchCard from '@/components/catalogo/ApartmentSearchCard'
import Card from '@/components/catalogo/Card'
import Section from '@/components/shared/Section'
import { Search, Check, SlidersHorizontal, ArrowLeft } from 'lucide-react'
import { fetchAvailableApartments, type PublicApartamentoSummary } from '@/lib/api'
import type { Apartment } from '@/data/apartments'
import { resolveHeroPhoto } from '@/lib/hero-fallback'

// Altura del Nav global (fixed top-0). La medimos en runtime con `useNavHeight`
// porque depende del viewport (font scaling, line-height responsive, etc.) — un
// valor hardcodeado deja gaps en pantallas grandes.
//
// Usamos `useLayoutEffect` para que la medición ocurra ANTES del primer paint,
// evitando un flash en el que la SummaryBar aparece corrida durante un frame.
const DEFAULT_NAV_PX = 80
const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

function useNavHeight(): number {
  const [h, setH] = useState(DEFAULT_NAV_PX)
  useIsoLayoutEffect(() => {
    const measure = () => {
      const nav = document.querySelector('nav')
      if (!nav) return
      // `getBoundingClientRect().bottom` respeta transforms y subpixel rendering;
      // es lo que el ojo ve como borde inferior del Nav, no el offsetHeight crudo.
      const rect = nav.getBoundingClientRect()
      setH(Math.ceil(rect.bottom))
    }
    measure()
    window.addEventListener('resize', measure)
    // Re-mide cuando cargan las web fonts (Geist) — pueden cambiar la altura.
    if ('fonts' in document) {
      ;(document as Document & { fonts: { ready: Promise<unknown> } }).fonts.ready.then(measure)
    }
    return () => window.removeEventListener('resize', measure)
  }, [])
  return h
}

// ── Constantes ──────────────────────────────────────────────────────────────────
const HERO_BULLETS = ['Apartamentos frente al mar Caribe', 'Check-in autónomo 24/7', 'Atención personalizada']

type FlowState = 'idle' | 'searching' | 'results'
interface SearchParams {
  range: string
  guests: number
  /** Breakdown por categoría — preserva selección al volver del estado idle. */
  breakdown?: Guests
}

// ── Variantes Framer Motion ──────────────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
}

function formatRange(value: string): string {
  if (!value?.includes('/')) return ''
  const [s, e] = value.split('/')
  if (!s || !e) return ''
  const fmt = (d: string) => new Intl.DateTimeFormat('es-CO', { day: 'numeric', month: 'short' }).format(new Date(d + 'T00:00:00'))
  return `${fmt(s)} – ${fmt(e)}`
}

// ── SearchingScreen ──────────────────────────────────────────────────────────────
function SearchingScreen() {
  const [progress, setProgress] = useState(0)
  const [step, setStep] = useState(0)
  const steps = ['Verificando disponibilidad...', 'Consultando precios...', 'Preparando resultados...']

  useEffect(() => {
    const id = setInterval(() => {
      setProgress((p) => {
        const next = p + 2
        if (next >= 33 && step === 0) setStep(1)
        if (next >= 66 && step === 1) setStep(2)
        return Math.min(next, 98)
      })
    }, 30)
    return () => clearInterval(id)
  }, [step])

  return (
    <div className='flex flex-col items-center justify-center h-full px-4 animate-in fade-in duration-500'>
      <div className='relative mb-8'>
        <div className='w-20 h-20 rounded-full bg-livic-pink/10 flex items-center justify-center animate-pulse'>
          <div className='w-14 h-14 rounded-full bg-livic-pink/20 flex items-center justify-center'>
            <Search className='w-7 h-7 text-livic-pink' />
          </div>
        </div>
        <div className='absolute inset-0 rounded-full border-2 border-livic-pink/30 border-t-livic-pink animate-spin' />
      </div>
      <h3 className='text-xl font-bold text-gray-900 mb-2'>{steps[step]}</h3>
      <p className='text-sm text-gray-400 mb-8'>Motor busqueda Livic</p>
      <div className='w-64 h-1.5 bg-gray-100 rounded-full overflow-hidden'>
        <div className='h-full bg-livic-pink rounded-full transition-all duration-300' style={{ width: `${progress}%` }} />
      </div>
      <p className='text-xs text-gray-400 mt-3'>{progress}%</p>
    </div>
  )
}

// ── SearchSummaryBar ─────────────────────────────────────────────────────────────
// Sticky JUSTO debajo del Nav global (top-14 ≈ 56 px). Si se posiciona en top-0
// queda oculta tras el `<Nav>` (que es fixed con z-50) y los usuarios no ven el
// botón Modificar.
function SearchSummaryBar({ params, navHeight, onBack, onModify }: { params: SearchParams; navHeight: number; onBack: () => void; onModify: () => void }) {
  const dateLabel = params.range ? formatRange(params.range) : 'Fechas flexibles'
  const guestLabel = params.guests > 0 ? `${params.guests} huésped${params.guests !== 1 ? 'es' : ''}` : 'Huéspedes'

  return (
    <div
      // marginTop -1 px solapa con el border-b del Nav para garantizar 0 gap
      // visible incluso si el `getBoundingClientRect().bottom` cae en sub-píxel.
      className='sticky z-40 bg-white border-b border-gray-100 shadow-sm'
      style={{ top: `${navHeight}px`, marginTop: '-1px' }}
    >
      <div className='max-w-6xl mx-auto px-4 md:px-8 xl:px-14 py-2.5 flex items-center justify-between gap-3'>
        <div className='flex items-center gap-2 sm:gap-3 min-w-0 flex-1'>
          {/* Volver a la home del catálogo (estado idle, con la barra de búsqueda) */}
          <button
            onClick={onBack}
            aria-label='Volver al inicio del catálogo'
            className='flex items-center gap-1.5 text-xs font-semibold text-gray-600 border border-gray-200 rounded-full px-3 py-2 hover:border-livic-pink hover:text-livic-pink transition-colors flex-shrink-0'
          >
            <ArrowLeft className='w-3.5 h-3.5' />
            <span className='hidden sm:inline'>Inicio</span>
          </button>

          <span className='w-px h-4 bg-gray-200 hidden sm:block flex-shrink-0' />

          <div className='flex items-center gap-2 text-sm text-gray-700 min-w-0'>
            <Search className='w-4 h-4 text-livic-pink flex-shrink-0' />
            <span className='font-semibold truncate'>{dateLabel}</span>
            <span className='w-px h-4 bg-gray-200 hidden sm:block flex-shrink-0' />
            <span className='text-gray-500 truncate hidden sm:inline'>{guestLabel}</span>
          </div>
        </div>

        <button
          onClick={onModify}
          aria-label='Modificar búsqueda'
          className='flex items-center gap-2 text-xs font-semibold text-white bg-livic-pink hover:bg-livic-pink/90 rounded-full px-3.5 py-2 transition-colors flex-shrink-0'
        >
          <SlidersHorizontal className='w-3.5 h-3.5' />
          <span className='hidden sm:inline'>Modificar</span>
        </button>
      </div>
    </div>
  )
}

// ── HeroPanel ────────────────────────────────────────────────────────────────────
// Reservamos `pt-20` (≈ 5rem) en mobile y `lg:pt-24` en desktop para que el navbar
// fijo (≈ 57 px) no recorte el card. Combinado con `flex items-center` y
// `lg:min-h-screen`, el hero queda visualmente centrado en el área debajo del nav.
function HeroPanel({
  onSearch,
  defaultRange,
  defaultGuests,
}: {
  onSearch: (range: string, guests: number, breakdown: Guests) => void
  defaultRange?: string
  defaultGuests?: Partial<Guests>
}) {
  return (
    <div className='w-full px-4 md:px-8 xl:px-14 pt-20 pb-6 lg:pt-24 lg:pb-10 flex items-start lg:items-center lg:min-h-screen'>
      <div
        className='relative w-full max-w-6xl mx-auto rounded-3xl flex items-center shadow-xl'
        style={{ minHeight: '560px' }}
      >
        {/* Fondo */}
        <div className='absolute inset-0 rounded-3xl overflow-hidden'>
          <img src='/portada.png' alt='Alojamientos Santa Marta' className='absolute inset-0 w-full h-full object-cover' />
          <div className='absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/10' />

        </div>

        {/* Contenido */}
        <div className='relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-10 items-center px-6 md:px-14 py-10 lg:py-14'>
          {/* Izquierda — stagger animado */}
          <motion.div variants={containerVariants} initial='hidden' animate='visible'>
            <motion.div variants={itemVariants}>
              <img src='/logo-livic-white.png' alt='LIVIC' className='h-14 w-auto mb-5' />
            </motion.div>

            <motion.div variants={itemVariants}>
              <span className='inline-block bg-livic-yellow text-livic-black text-xs font-bold px-4 py-1.5 rounded-full mb-5 uppercase tracking-wide'>
                Alojamientos verificados
              </span>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h1 className='text-4xl md:text-5xl font-black text-white leading-tight mb-6'>
                Cotiza tu estadía
                <br />
                <span style={{ background: 'linear-gradient(135deg,#E288AE,#AD80B4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  en Santa Marta
                </span>
              </h1>
            </motion.div>

            <ul className='space-y-2 mb-8'>
              {HERO_BULLETS.map((item) => (
                <motion.li
                  key={item}
                  variants={itemVariants}
                  className='flex items-center gap-3 text-white/85'
                >
                  <span className='w-5 h-5 rounded-full bg-livic-green/30 border border-livic-green/50 flex items-center justify-center flex-shrink-0'>
                    <Check className='w-3 h-3 text-livic-green' />
                  </span>
                  <span className='text-sm'>{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Panel de búsqueda — entrada desde la derecha */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className='bg-white rounded-2xl shadow-2xl p-6 md:p-7 w-full max-w-sm lg:ml-auto'
          >
            <h3 className='text-base font-bold text-gray-900 mb-1'>Consulta disponibilidad</h3>
            <p className='text-xs text-gray-500 mb-4'>Selecciona fechas y número de huéspedes</p>
            <AvailabilityBar
              onSearch={onSearch}
              defaultRange={defaultRange}
              defaultGuests={defaultGuests}
            />
          </motion.div>
        </div>
      </div>
    </div>
  )
}

// ── Adaptador API → Card ─────────────────────────────────────────────────────────
// `<Card>` espera el shape completo de `Apartment` (data estática con galería,
// amenidades, políticas…). La API pública solo expone un resumen, así que
// derivamos el precio-noche del pricing vigente y rellenamos con defaults los
// campos que la card no renderiza visualmente.
/**
 * Precio "desde" — mínimo entre tarifa entre-semana y fin-de-semana. Se
 * renderiza en las cards como "Desde $X / noche". Antes era el promedio
 * aritmético, pero ese midpoint no es un precio real configurado en el PMS.
 */
function computePricePerNight(
  pricing: PublicApartamentoSummary['pricingVigente'],
): number | undefined {
  if (!pricing) return undefined

  const com = pricing.comisionAirbnbPct ? parseFloat(pricing.comisionAirbnbPct) / 100 : 0.03
  const factor = 1 / Math.max(1 - com, 0.0001)

  const pubES = pricing.precioPublicadoEntreSemana
    ? parseFloat(pricing.precioPublicadoEntreSemana)
    : pricing.precioNetoEntreSemana
      ? parseFloat(pricing.precioNetoEntreSemana) * factor
      : undefined
  const pubFS = pricing.precioPublicadoFinSemana
    ? parseFloat(pricing.precioPublicadoFinSemana)
    : pricing.precioNetoFinSemana
      ? parseFloat(pricing.precioNetoFinSemana) * factor
      : undefined

  if (pubES == null && pubFS == null) return undefined

  const min = pubES != null && pubFS != null ? Math.min(pubES, pubFS) : (pubES ?? pubFS!)
  return Math.round(min)
}

function toApartmentShape(summary: PublicApartamentoSummary): Apartment {
  const hero = resolveHeroPhoto(summary.heroPhoto, summary.numero)

  return {
    // La página de detalle ahora consume la API con el slug del backend.
    slug: summary.slug,
    nombre: summary.tituloAnuncio?.trim() || summary.nombre,
    edificio: summary.edificio.nombre,
    apartamento: summary.numero,
    piso: summary.piso,
    tipo: summary.tipoPropiedad ?? summary.tipo,

    huespedes: summary.huespedes,
    habitaciones: summary.habitaciones,
    camas: summary.camas,
    banos: summary.banos,

    ubicacion: {
      ciudad: summary.edificio.ciudad,
      departamento: summary.edificio.departamento,
      pais: 'Colombia',
      lat: 0,
      lng: 0,
    },

    anfitrionPrincipal: {
      nombre: 'LIVIC',
      calificacion: summary.calificacion ?? 4.85,
      resenas: summary.resenas ?? 0,
    },

    amenidades: [],
    servicios: [],
    noIncluidos: [],
    badges: [],

    heroPhoto: hero,
    galeria: [],

    descripcionCorta: '',
    descripcionLarga: '',
    frasePosituelo: '',

    edificioAmenidades: [],
    edificioReglas: [],

    checkIn: '',
    checkOut: '',
    notas: [],

    precioNoche: computePricePerNight(summary.pricingVigente),
  }
}

// ── AllApartmentsSection ─────────────────────────────────────────────────────────
// Catálogo completo visible en estado idle (debajo del hero). Muestra todas las
// unidades disponibles con la card minimal estilo Airbnb (`ApartmentSearchCard`).
function AllApartmentsSection({ apartments }: { apartments: PublicApartamentoSummary[] }) {
  if (!apartments.length) return null

  return (
    <Section id='todos' titulo='Nuestros alojamientos' acento='pink' etiqueta='Catálogo'>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'>
        {apartments.map((apt) => (
          <ApartmentSearchCard key={apt.id} apartment={apt} />
        ))}
      </div>
    </Section>
  )
}

// ── ResultsPanel ─────────────────────────────────────────────────────────────────
function ResultsPanel({
  flow,
  params,
  apartments,
  errorMessage,
  navHeight,
  onBack,
  onModify,
}: {
  flow: FlowState
  params: SearchParams
  apartments: PublicApartamentoSummary[]
  errorMessage: string | null
  navHeight: number
  onBack: () => void
  onModify: () => void
}) {
  return (
    <div className='w-full h-full' style={{ paddingTop: `${navHeight}px` }}>
      {flow === 'searching' && (
        <div className='h-full flex items-center justify-center'>
          <SearchingScreen />
        </div>
      )}

      {flow === 'results' && (
        <div className='animate-in fade-in duration-500'>
          <SearchSummaryBar params={params} navHeight={navHeight} onBack={onBack} onModify={onModify} />
          <div>
            <Section id='alojamientos' titulo='Alojamientos disponibles' acento='pink' etiqueta='Resultados'>
              {errorMessage ? (
                <div className='text-center py-24 border border-dashed border-red-200 rounded-3xl'>
                  <p className='text-red-500 text-lg'>{errorMessage}</p>
                  <button
                    onClick={onModify}
                    className='mt-6 inline-flex items-center gap-2 text-sm font-semibold text-livic-pink hover:underline'
                  >
                    <SlidersHorizontal className='w-4 h-4' />
                    Modificar búsqueda
                  </button>
                </div>
              ) : (
                <>
                  <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'>
                    {apartments.map((apt) => (
                      <Card key={apt.id} apartment={toApartmentShape(apt)} />
                    ))}
                  </div>
                  {apartments.length === 0 && (
                    <div className='text-center py-24 border border-dashed border-gray-200 rounded-3xl'>
                      <p className='text-gray-400 text-lg'>No hay alojamientos disponibles para esas fechas.</p>
                    </div>
                  )}
                </>
              )}
            </Section>
          </div>
        </div>
      )}
    </div>
  )
}

// ── SearchFlow (componente raíz) ─────────────────────────────────────────────────
function SearchFlowImpl({ apartments }: { apartments: PublicApartamentoSummary[] }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [flow, setFlow] = useState<FlowState>('idle')
  const [params, setParams] = useState<SearchParams>({ range: '', guests: 0 })
  const [results, setResults] = useState<PublicApartamentoSummary[]>([])
  const [error, setError] = useState<string | null>(null)
  const desktopRef = useRef<HTMLDivElement>(null)
  const restoredRef = useRef(false)
  const navHeight = useNavHeight()

  // ── Transición horizontal en desktop ──
  const isRight = flow !== 'idle'

  function syncUrl(range: string, guests: number, view: 'results' | 'idle') {
    const sp = new URLSearchParams()
    if (view === 'results') {
      if (range) sp.set('range', range)
      if (guests > 0) sp.set('guests', String(guests))
      sp.set('view', 'results')
    }
    const qs = sp.toString()
    router.replace(qs ? `/catalogo?${qs}` : '/catalogo', { scroll: false })
  }

  async function handleSearch(
    range: string,
    guests: number,
    breakdownOrOpts?: Guests | { silent?: boolean },
    opts?: { silent?: boolean },
  ) {
    // Compat: el botón "Buscar" del AvailabilityBar pasa el breakdown como 3er
    // arg; la rehidratación silent desde URL pasa el opts. Distinguimos por shape.
    const breakdown =
      breakdownOrOpts && 'adultos' in breakdownOrOpts ? (breakdownOrOpts as Guests) : undefined
    const realOpts =
      breakdownOrOpts && 'silent' in breakdownOrOpts
        ? (breakdownOrOpts as { silent?: boolean })
        : opts

    // Si no hay breakdown explícito (rehidratación), conservamos el previo o
    // sintetizamos uno con todo en `adultos` como fallback.
    setParams((prev) => ({
      range,
      guests,
      breakdown: breakdown ?? prev.breakdown ?? (guests > 0 ? { adultos: guests, ninos: 0, bebes: 0, mascotas: 0 } : undefined),
    }))
    setError(null)
    syncUrl(range, guests, 'results')

    if (!realOpts?.silent) setFlow('searching')

    // Tiempo mínimo de animación para que el progreso sea perceptible
    const minSpinner = realOpts?.silent
      ? Promise.resolve()
      : new Promise<void>((res) => setTimeout(res, 1200))

    try {
      const [checkIn, checkOut] = range.includes('/') ? range.split('/') : [null, null]
      let data: PublicApartamentoSummary[]

      if (checkIn && checkOut) {
        // Hay rango: pega contra /disponibles (calendario + capacidad)
        data = await fetchAvailableApartments({
          checkIn,
          checkOut,
          huespedes: guests > 0 ? guests : undefined,
        })
      } else if (guests > 0) {
        // Solo capacidad: filtra el catálogo precargado en cliente
        data = apartments.filter((a) => a.huespedes >= guests)
      } else {
        // Sin filtros: muestra todo el catálogo
        data = apartments
      }

      await minSpinner
      setResults(data)
      setFlow('results')
    } catch (err) {
      await minSpinner
      setError(err instanceof Error ? err.message : 'No se pudo consultar la disponibilidad.')
      setResults([])
      setFlow('results')
    }
  }

  // Modificar: vuelve al hero/idle CONSERVANDO `params` (range + breakdown) para
  // que el AvailabilityBar muestre la selección previa y el usuario solo ajuste.
  function handleModify() {
    setFlow('idle')
    setError(null)
    // Quitamos solo el `view=results` de la URL; conservamos range/guests para
    // que un refresh re-rehidrate los inputs si el usuario refresca aquí.
    syncUrl('', 0, 'idle')
  }

  // Volver a la home del catálogo: mismo estado que Modificar (idle), pero con
  // semántica diferente para el usuario (botón "← Inicio" vs "Modificar").
  function handleBack() {
    setFlow('idle')
    setError(null)
    setResults([])
    setParams({ range: '', guests: 0 })
    syncUrl('', 0, 'idle')
  }

  // Rehidratar desde la URL al montar (al volver desde /catalogo/[slug] vía back).
  useEffect(() => {
    if (restoredRef.current) return
    restoredRef.current = true
    const range = searchParams.get('range') ?? ''
    const guests = parseInt(searchParams.get('guests') ?? '0', 10) || 0
    const view = searchParams.get('view')
    if (view === 'results') {
      handleSearch(range, guests, undefined, { silent: true })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {/* ══════════════════════════════════════════════════════════════
          MOBILE  (< lg) — scroll vertical normal
      ══════════════════════════════════════════════════════════════ */}
      <div className='lg:hidden min-h-screen'>
        {flow === 'idle' && (
          <>
            <HeroPanel
              onSearch={handleSearch}
              defaultRange={params.range}
              defaultGuests={params.breakdown}
            />
            <AllApartmentsSection apartments={apartments} />
          </>
        )}
        {flow === 'searching' && (
          <div className='min-h-screen flex items-center justify-center animate-in fade-in duration-400'>
            <SearchingScreen />
          </div>
        )}
        {flow === 'results' && (
          <div className='animate-in fade-in duration-500' style={{ paddingTop: `${navHeight}px` }}>
            <SearchSummaryBar params={params} navHeight={navHeight} onBack={handleBack} onModify={handleModify} />
            <div>
              <Section id='alojamientos' titulo='Alojamientos disponibles' acento='pink' etiqueta='Resultados'>
                {error ? (
                  <div className='text-center py-16 border border-dashed border-red-200 rounded-3xl'>
                    <p className='text-red-500 text-base'>{error}</p>
                  </div>
                ) : (
                  <>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                      {results.map((apt) => (
                        <Card key={apt.id} apartment={toApartmentShape(apt)} />
                      ))}
                    </div>
                    {results.length === 0 && (
                      <div className='text-center py-16 border border-dashed border-gray-200 rounded-3xl'>
                        <p className='text-gray-400 text-base'>No hay alojamientos disponibles para esas fechas.</p>
                      </div>
                    )}
                  </>
                )}
              </Section>
            </div>
          </div>
        )}
      </div>

      {/* ══════════════════════════════════════════════════════════════
          DESKTOP (≥ lg) — scroll horizontal entre paneles
      ══════════════════════════════════════════════════════════════ */}
      <div ref={desktopRef} className='hidden lg:block h-screen overflow-hidden'>
        {/* Track de dos paneles que se desplaza horizontalmente */}
        <div
          className='flex flex-row h-full'
          style={{
            width: '200vw',
            transform: isRight ? 'translateX(-50%)' : 'translateX(0)',
            transition: 'transform 0.65s cubic-bezier(0.77,0,0.175,1)',
          }}
        >
          {/* Panel 0 — Hero + catálogo completo (scroll vertical interno) */}
          <div className='w-screen h-full flex-shrink-0 overflow-y-auto'>
            <HeroPanel
              onSearch={handleSearch}
              defaultRange={params.range}
              defaultGuests={params.breakdown}
            />
            <AllApartmentsSection apartments={apartments} />
          </div>

          {/* Panel 1 — Searching / Results */}
          <div className='w-screen h-full flex-shrink-0 overflow-y-auto'>
            <ResultsPanel flow={flow} params={params} apartments={results} errorMessage={error} navHeight={navHeight} onBack={handleBack} onModify={handleModify} />
          </div>
        </div>
      </div>
    </>
  )
}

export default function SearchFlow(props: { apartments: PublicApartamentoSummary[] }) {
  return (
    <Suspense fallback={null}>
      <SearchFlowImpl {...props} />
    </Suspense>
  )
}
