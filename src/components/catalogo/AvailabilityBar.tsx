'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { Search, X, Users, CalendarDays, Check } from 'lucide-react'

/* ── Tipos ── */
type GuestKey = 'adultos' | 'ninos' | 'bebes' | 'mascotas'
interface Guests { adultos: number; ninos: number; bebes: number; mascotas: number }

/* ── Helpers ── */
function formatRange(value: string): string {
  if (!value?.includes('/')) return ''
  const [s, e] = value.split('/')
  if (!s || !e) return ''
  const fmt = (d: string) =>
    new Intl.DateTimeFormat('es-CO', { day: 'numeric', month: 'short' }).format(
      new Date(d + 'T00:00:00'),
    )
  return `${fmt(s)} – ${fmt(e)}`
}

const GUEST_ROWS: { key: GuestKey; label: string; sub: string }[] = [
  { key: 'adultos',  label: 'Adultos',  sub: 'Edad: 13 años o más' },
  { key: 'ninos',    label: 'Niños',    sub: 'Edades 2 – 12' },
  { key: 'bebes',    label: 'Bebés',    sub: 'Menos de 2 años' },
  { key: 'mascotas', label: 'Mascotas', sub: '¿Traes a un animal de servicio?' },
]

/* ── Modal base con portal + animación ──────────────────────────────────────── */
function Modal({
  open,
  onClose,
  children,
  bottomSheet = false,
}: {
  open: boolean
  onClose: () => void
  children: React.ReactNode
  bottomSheet?: boolean
}) {
  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (open) {
      setMounted(true)
      requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)))
    } else {
      setVisible(false)
      const t = setTimeout(() => setMounted(false), 300)
      return () => clearTimeout(t)
    }
  }, [open])

  // Bloquea scroll del body cuando está abierto
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!mounted) return null

  return createPortal(
    <div
      className={`fixed inset-0 z-[9999] transition-all duration-300 ${
        visible ? 'opacity-100' : 'opacity-0'
      } ${bottomSheet ? 'flex items-end' : 'flex items-center justify-center p-4'}`}
    >
      {/* Backdrop */}
      <div className='absolute inset-0 bg-black/50 backdrop-blur-sm' onClick={onClose} />

      {/* Panel */}
      <div
        className={`relative z-10 transition-all duration-300 ${bottomSheet ? 'w-full' : 'w-auto mx-auto'} ${
          bottomSheet
            ? visible ? 'translate-y-0' : 'translate-y-full'
            : visible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'
        }`}
      >
        {children}
      </div>
    </div>,
    document.body,
  )
}

/* ── Modal Calendario ────────────────────────────────────────────────────────── */
function CalendarModal({
  open,
  onClose,
  range,
  onRangeChange,
}: {
  open: boolean
  onClose: () => void
  range: string
  onRangeChange: (val: string) => void
}) {
  const calendarRef  = useRef<HTMLDivElement>(null)
  const rangeRef     = useRef(range)
  rangeRef.current   = range
  const today        = new Date().toISOString().split('T')[0]
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
    const onResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const mountCalendar = useCallback(() => {
    const container = calendarRef.current
    if (!container) return

    import('cally').then(() => {
      if (!calendarRef.current) return
      container.innerHTML = ''

      const mobile = window.innerWidth < 768
      const calRange = document.createElement('calendar-range') as HTMLElement & { value: string }
      calRange.setAttribute('locale', 'es-CO')
      calRange.setAttribute('min', today)
      calRange.setAttribute('months', mobile ? '1' : '2')
      calRange.style.setProperty('--color-accent', '#E288AE')
      calRange.style.display = 'block'
      if (mobile) calRange.style.width = '100%'

      if (rangeRef.current) calRange.setAttribute('value', rangeRef.current)

      const month1 = document.createElement('calendar-month')
      if (mobile) month1.style.width = '100%'

      const row = document.createElement('div')
      if (mobile) {
        row.style.cssText = 'display:block;width:100%;'
        row.appendChild(month1)
      } else {
        const month2 = document.createElement('calendar-month')
        month2.setAttribute('offset', '1')
        row.style.cssText = 'display:flex;flex-direction:row;gap:2rem;align-items:flex-start;'
        row.appendChild(month1)
        row.appendChild(month2)
      }

      calRange.appendChild(row)

      calRange.addEventListener('change', (e: Event) => {
        const val = (e.target as HTMLElement & { value: string }).value ?? ''
        onRangeChange(val)
        rangeRef.current = val
        if (val.includes('/') && val.split('/').every(Boolean)) {
          setTimeout(onClose, 350)
        }
      })

      container.appendChild(calRange)
    })
  }, [today, onClose, onRangeChange])

  useEffect(() => {
    if (open) {
      const t = setTimeout(mountCalendar, 50)
      return () => clearTimeout(t)
    }
  }, [open, mountCalendar])

  const dateLabel = range ? formatRange(range) : null

  // ── Mobile: bottom sheet ──────────────────────────────────────────────────────
  if (isMobile) {
    return (
      <Modal open={open} onClose={onClose} bottomSheet>
        <div className='bg-white rounded-t-3xl shadow-2xl w-full max-h-[90vh] flex flex-col'>
          {/* Handle */}
          <div className='flex justify-center pt-3 pb-1 flex-shrink-0'>
            <div className='w-10 h-1 rounded-full bg-gray-200' />
          </div>

          {/* Header */}
          <div className='flex items-center justify-between px-5 pt-2 pb-4 border-b border-gray-100 flex-shrink-0'>
            <div>
              <p className='font-bold text-gray-900'>Selecciona las fechas</p>
              {dateLabel
                ? <p className='text-xs text-livic-pink font-semibold mt-0.5'>{dateLabel}</p>
                : <p className='text-xs text-gray-400 mt-0.5'>Elige entrada y salida</p>
              }
            </div>
            <button onClick={onClose} className='w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500'>
              <X className='w-4 h-4' />
            </button>
          </div>

          {/* Calendario scrollable */}
          <div className='flex-1 overflow-y-auto px-4 py-4'>
            <div ref={calendarRef} />
          </div>

          {/* Footer */}
          <div className='px-5 py-4 border-t border-gray-100 flex items-center gap-3 flex-shrink-0'>
            {range && (
              <button
                onClick={() => { onRangeChange(''); rangeRef.current = '' }}
                className='text-xs text-gray-400 underline underline-offset-2'
              >
                Limpiar
              </button>
            )}
            <button
              onClick={onClose}
              className='flex-1 flex items-center justify-center gap-2 bg-livic-pink text-white text-sm font-semibold py-3 rounded-full'
            >
              {range ? <><Check className='w-4 h-4' />Confirmar fechas</> : 'Cerrar'}
            </button>
          </div>
        </div>
      </Modal>
    )
  }

  // ── Desktop: modal centrado con 2 meses ───────────────────────────────────────
  return (
    <Modal open={open} onClose={onClose}>
      <div className='bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden'>
        <div className='flex items-center justify-between px-6 pt-5 pb-4 border-b border-gray-100'>
          <div className='flex items-center gap-3'>
            <div className='w-9 h-9 rounded-full bg-livic-pink/10 flex items-center justify-center'>
              <CalendarDays className='w-5 h-5 text-livic-pink' />
            </div>
            <div>
              <p className='font-bold text-gray-900 text-sm'>Selecciona las fechas</p>
              {dateLabel
                ? <p className='text-xs text-livic-pink font-medium'>{dateLabel}</p>
                : <p className='text-xs text-gray-400'>Entrada y salida</p>
              }
            </div>
          </div>
          <button onClick={onClose} className='w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors'>
            <X className='w-4 h-4' />
          </button>
        </div>
        <div className='p-6'>
          <div ref={calendarRef} />
        </div>
        <div className='px-6 pb-5 flex items-center justify-between gap-3'>
          {range && (
            <button
              onClick={() => { onRangeChange(''); rangeRef.current = '' }}
              className='text-xs text-gray-400 hover:text-gray-600 transition-colors underline underline-offset-2'
            >
              Limpiar fechas
            </button>
          )}
          <button
            onClick={onClose}
            className='ml-auto flex items-center gap-2 bg-livic-pink hover:bg-livic-pink/90 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors'
          >
            {range ? <><Check className='w-4 h-4' /> Confirmar</> : 'Cerrar'}
          </button>
        </div>
      </div>
    </Modal>
  )
}

/* ── Modal Huéspedes ─────────────────────────────────────────────────────────── */
function GuestsModal({
  open,
  onClose,
  guests,
  onAdjust,
}: {
  open: boolean
  onClose: () => void
  guests: Guests
  onAdjust: (key: GuestKey, delta: number) => void
}) {
  const total = Object.values(guests).reduce((a, b) => a + b, 0)

  return (
    <Modal open={open} onClose={onClose}>
      <div className='bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden'>
        {/* Header */}
        <div className='flex items-center justify-between px-6 pt-5 pb-4 border-b border-gray-100'>
          <div className='flex items-center gap-3'>
            <div className='w-9 h-9 rounded-full bg-livic-purple/10 flex items-center justify-center'>
              <Users className='w-5 h-5 text-livic-purple' />
            </div>
            <div>
              <p className='font-bold text-gray-900 text-sm'>¿Cuántos viajan?</p>
              <p className='text-xs text-gray-400'>
                {total > 0 ? `${total} huésped${total !== 1 ? 'es' : ''}` : 'Agrega huéspedes'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className='w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors'
          >
            <X className='w-4 h-4' />
          </button>
        </div>

        {/* Filas */}
        <div className='px-6'>
          {GUEST_ROWS.map((row, i) => (
            <div
              key={row.key}
              className={`flex items-center justify-between py-4 ${
                i < GUEST_ROWS.length - 1 ? 'border-b border-gray-100' : ''
              }`}
            >
              <div>
                <p className='text-sm font-medium text-gray-900'>{row.label}</p>
                <p className='text-xs text-gray-400 mt-0.5'>{row.sub}</p>
              </div>
              <div className='flex items-center gap-3'>
                <button
                  onClick={() => onAdjust(row.key, -1)}
                  disabled={guests[row.key] === 0}
                  className='w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-gray-700 text-xl leading-none disabled:opacity-25 hover:border-livic-pink hover:text-livic-pink transition-colors'
                >–</button>
                <span className='w-6 text-center text-sm font-bold text-gray-900 tabular-nums'>
                  {guests[row.key]}
                </span>
                <button
                  onClick={() => onAdjust(row.key, 1)}
                  className='w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-gray-700 text-xl leading-none hover:border-livic-pink hover:text-livic-pink transition-colors'
                >+</button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className='px-6 pb-5 pt-3'>
          <button
            onClick={onClose}
            className='w-full flex items-center justify-center gap-2 bg-livic-pink hover:bg-livic-pink/90 text-white text-sm font-semibold py-3 rounded-full transition-colors'
          >
            <Check className='w-4 h-4' />
            {total > 0 ? `Confirmar ${total} huésped${total !== 1 ? 'es' : ''}` : 'Cerrar'}
          </button>
        </div>
      </div>
    </Modal>
  )
}

/* ── Componente principal ────────────────────────────────────────────────────── */
interface AvailabilityBarProps {
  onSearch?: (range: string, guests: number) => void
}

export default function AvailabilityBar({ onSearch }: AvailabilityBarProps = {}) {
  const [range,  setRange]  = useState('')
  const [guests, setGuests] = useState<Guests>({ adultos: 0, ninos: 0, bebes: 0, mascotas: 0 })
  const [modal,  setModal]  = useState<'fechas' | 'quien' | null>(null)

  const total = Object.values(guests).reduce((a, b) => a + b, 0)

  function adjust(key: GuestKey, delta: number) {
    setGuests(prev => ({ ...prev, [key]: Math.max(0, prev[key] + delta) }))
  }

  return (
    <>
      {/* ── Triggers ── */}
      <div className='flex flex-col gap-2 mb-4'>

        {/* Fechas */}
        <button
          onClick={() => setModal('fechas')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border transition-colors text-left ${
            range ? 'border-livic-pink bg-livic-pink/5' : 'border-gray-200 bg-gray-50 hover:border-gray-300'
          }`}
        >
          <CalendarDays className={`w-4 h-4 flex-shrink-0 ${range ? 'text-livic-pink' : 'text-gray-400'}`} />
          <div>
            <p className='text-xs font-semibold text-gray-700 tracking-wide leading-none mb-0.5'>Fechas</p>
            <p className={`text-sm leading-none ${range ? 'text-livic-pink font-medium' : 'text-gray-400'}`}>
              {range ? formatRange(range) : 'Agrega fechas de entrada y salida'}
            </p>
          </div>
        </button>

        {/* Huéspedes */}
        <button
          onClick={() => setModal('quien')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border transition-colors text-left ${
            total > 0 ? 'border-livic-purple bg-livic-purple/5' : 'border-gray-200 bg-gray-50 hover:border-gray-300'
          }`}
        >
          <Users className={`w-4 h-4 flex-shrink-0 ${total > 0 ? 'text-livic-purple' : 'text-gray-400'}`} />
          <div>
            <p className='text-xs font-semibold text-gray-700 tracking-wide leading-none mb-0.5'>Huéspedes</p>
            <p className={`text-sm leading-none ${total > 0 ? 'text-livic-purple font-medium' : 'text-gray-400'}`}>
              {total > 0 ? `${total} huésped${total !== 1 ? 'es' : ''}` : '¿Cuántos viajan?'}
            </p>
          </div>
        </button>
      </div>

      {/* Buscar */}
      <button
        onClick={() => { setModal(null); onSearch?.(range, total) }}
        aria-label='Buscar disponibilidad'
        className='w-full bg-livic-pink hover:bg-livic-pink/90 active:scale-[0.98] text-white rounded-xl py-3.5 font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-md'
      >
        <Search size={16} strokeWidth={2.5} />
        Buscar disponibilidad
      </button>

      {/* ── Modales ── */}
      <CalendarModal
        open={modal === 'fechas'}
        onClose={() => setModal(null)}
        range={range}
        onRangeChange={setRange}
      />

      <GuestsModal
        open={modal === 'quien'}
        onClose={() => setModal(null)}
        guests={guests}
        onAdjust={adjust}
      />
    </>
  )
}
