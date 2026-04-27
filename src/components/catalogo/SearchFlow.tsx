'use client'

/**
 * SearchFlow.tsx
 * Mobile  → scroll vertical, navbar fijo
 * Desktop → dos paneles side-by-side, transición horizontal con translateX
 *           scroll vertical solo dentro del panel de resultados
 */

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import AvailabilityBar from '@/components/catalogo/AvailabilityBar'
import ApartmentSearchCard from '@/components/catalogo/ApartmentSearchCard'
import Section from '@/components/shared/Section'
import { Search, Check, SlidersHorizontal } from 'lucide-react'
import type { PublicApartamentoSummary } from '@/lib/api'

// ── Constantes ──────────────────────────────────────────────────────────────────
const HERO_BULLETS = ['Apartamentos frente al mar Caribe', 'Check-in autónomo 24/7', 'Atención personalizada']

type FlowState = 'idle' | 'searching' | 'results'
interface SearchParams {
  range: string
  guests: number
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
function SearchSummaryBar({ params, onModify }: { params: SearchParams; onModify: () => void }) {
  const dateLabel = params.range ? formatRange(params.range) : 'Fechas flexibles'
  const guestLabel = params.guests > 0 ? `${params.guests} huésped${params.guests !== 1 ? 'es' : ''}` : 'Huéspedes'

  return (
    <div className='sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm'>
      <div className='max-w-6xl mx-auto px-4 md:px-8 xl:px-14 py-3 flex items-center justify-between gap-4'>
        <div className='flex items-center gap-3 text-sm text-gray-700 flex-wrap'>
          <Search className='w-4 h-4 text-livic-pink flex-shrink-0' />
          <span className='font-semibold'>{dateLabel}</span>
          <span className='w-px h-4 bg-gray-200 hidden sm:block' />
          <span className='text-gray-500'>{guestLabel}</span>
        </div>
        <button
          onClick={onModify}
          className='flex items-center gap-2 text-xs font-semibold text-gray-600 border border-gray-200 rounded-full px-3.5 py-2 hover:border-livic-pink hover:text-livic-pink transition-colors flex-shrink-0'
        >
          <SlidersHorizontal className='w-3.5 h-3.5' />
          Modificar
        </button>
      </div>
    </div>
  )
}

// ── HeroPanel ────────────────────────────────────────────────────────────────────
function HeroPanel({ onSearch }: { onSearch: (range: string, guests: number) => void }) {
  return (
    <div className='w-full h-full overflow-y-auto px-4 md:px-8 xl:px-14 py-2 flex items-start lg:items-center'>
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
            <AvailabilityBar onSearch={onSearch} />
          </motion.div>
        </div>
      </div>
    </div>
  )
}

// ── ResultsPanel ─────────────────────────────────────────────────────────────────
function ResultsPanel({ flow, params, apartments, onModify }: { flow: FlowState; params: SearchParams; apartments: PublicApartamentoSummary[]; onModify: () => void }) {
  return (
    <div className='w-full h-full overflow-y-auto'>
      {flow === 'searching' && (
        <div className='h-full flex items-center justify-center'>
          <SearchingScreen />
        </div>
      )}

      {flow === 'results' && (
        <div className='animate-in fade-in duration-500'>
          <SearchSummaryBar params={params} onModify={onModify} />
          <div>
            <Section id='alojamientos' titulo='Alojamientos disponibles' acento='pink' etiqueta='Resultados'>
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'>
                {apartments.map((apt) => (
                  <ApartmentSearchCard key={apt.id} apartment={apt} />
                ))}
              </div>
              {apartments.length === 0 && (
                <div className='text-center py-24 border border-dashed border-gray-200 rounded-3xl'>
                  <p className='text-gray-400 text-lg'>No hay alojamientos disponibles para esas fechas.</p>
                </div>
              )}
            </Section>
          </div>
        </div>
      )}
    </div>
  )
}

// ── SearchFlow (componente raíz) ─────────────────────────────────────────────────
export default function SearchFlow({ apartments }: { apartments: PublicApartamentoSummary[] }) {
  const [flow, setFlow] = useState<FlowState>('idle')
  const [params, setParams] = useState<SearchParams>({ range: '', guests: 0 })
  const desktopRef = useRef<HTMLDivElement>(null)

  // ── Transición horizontal en desktop ──
  const isRight = flow !== 'idle'

  function handleSearch(range: string, guests: number) {
    setParams({ range, guests })
    setFlow('searching')
    setTimeout(() => setFlow('results'), 2400)
  }

  function handleModify() {
    setFlow('idle')
  }

  return (
    <>
      {/* ══════════════════════════════════════════════════════════════
          MOBILE  (< lg) — scroll vertical normal
      ══════════════════════════════════════════════════════════════ */}
      <div className='lg:hidden min-h-screen'>
        {flow === 'idle' && (
          <div className='h-screen'>
            <HeroPanel onSearch={handleSearch} />
          </div>
        )}
        {flow === 'searching' && (
          <div className='min-h-screen flex items-center justify-center animate-in fade-in duration-400'>
            <SearchingScreen />
          </div>
        )}
        {flow === 'results' && (
          <div className='animate-in fade-in duration-500'>
            <SearchSummaryBar params={params} onModify={handleModify} />
            <div>
              <Section id='alojamientos' titulo='Alojamientos disponibles' acento='pink' etiqueta='Resultados'>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                  {apartments.map((apt) => (
                    <ApartmentSearchCard key={apt.id} apartment={apt} />
                  ))}
                </div>
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
          {/* Panel 0 — Hero */}
          <div className='w-screen h-full flex-shrink-0'>
            <HeroPanel onSearch={handleSearch} />
          </div>

          {/* Panel 1 — Searching / Results */}
          <div className='w-screen h-full flex-shrink-0 overflow-y-auto'>
            <ResultsPanel flow={flow} params={params} apartments={apartments} onModify={handleModify} />
          </div>
        </div>
      </div>
    </>
  )
}
