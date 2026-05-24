'use client'

/**
 * Modal de "Solicitar reserva":
 *  - Estado `form`: muestra resumen completo del quote + inputs (nombre, email,
 *    teléfono). Botón "Enviar solicitud" → POST a la API.
 *  - Estado `loading`: spinner mientras el POST resuelve.
 *  - Estado `success`: checkmark animado + mensaje confirmando que LIVIC
 *    contactará por WhatsApp + nota de que el apto quedó bloqueado mientras
 *    procesan la solicitud. Botón "Seguir cotizando" cierra el modal.
 *  - Estado `error`: muestra el mensaje del backend (ej. 409 si ya hay
 *    solicitud activa) y permite reintentar editando el form.
 *
 * El estado se mantiene SOLO mientras el modal está abierto: cerrar y
 * volver a abrir vuelve al estado `form` en limpio.
 */

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Calendar, Users, AlertCircle, CheckCircle2, Send, MessageCircle } from 'lucide-react'
import type { QuoteResult } from '@/lib/api'
import { submitSolicitudCotizacion } from '@/lib/api'

interface Props {
  open: boolean
  onClose: () => void
  apiSlug: string
  apartamentoNombre: string
  quote: QuoteResult
}

type Estado = 'form' | 'loading' | 'success' | 'error'

function fmtCurrency(n: number, currency = 'COP'): string {
  return n.toLocaleString('es-CO', { style: 'currency', currency, maximumFractionDigits: 0 })
}

function fmtDateLabel(iso: string): string {
  return new Intl.DateTimeFormat('es-CO', { day: 'numeric', month: 'long', year: 'numeric' })
    .format(new Date(`${iso}T00:00:00`))
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
// Permisivo, igual que el backend.
const phoneRegex = /^[\d\s\-+()]{7,50}$/

export default function SolicitudReservaModal({
  open,
  onClose,
  apiSlug,
  apartamentoNombre,
  quote,
}: Props) {
  const router = useRouter()
  const [estado, setEstado] = useState<Estado>('form')
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [telefono, setTelefono] = useState('')

  // Reset al abrir/cerrar el modal: estado limpio en cada nueva sesión.
  useEffect(() => {
    if (open) {
      setEstado('form')
      setErrorMsg(null)
    }
  }, [open])

  const formValido =
    nombre.trim().length >= 2 &&
    emailRegex.test(email.trim()) &&
    phoneRegex.test(telefono.trim())

  async function handleSubmit() {
    if (!formValido) return
    setEstado('loading')
    setErrorMsg(null)
    try {
      await submitSolicitudCotizacion(apiSlug, {
        checkIn: quote.checkIn,
        checkOut: quote.checkOut,
        huespedes: quote.huespedes,
        nombre: nombre.trim(),
        email: email.trim(),
        telefono: telefono.trim(),
      })
      setEstado('success')
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Error al enviar la solicitud.')
      setEstado('error')
    }
  }

  function handleReintentar() {
    setEstado('form')
    setErrorMsg(null)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className='fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto'
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 60, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 60, opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className='bg-white w-full sm:max-w-lg sm:rounded-3xl rounded-t-3xl shadow-2xl my-0 sm:my-8 overflow-hidden'
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className='flex items-center justify-between px-6 py-4 border-b border-gray-100'>
              <div>
                <p className='text-[10px] text-gray-400 uppercase tracking-[0.18em] font-semibold'>
                  {estado === 'success' ? 'Solicitud enviada' : 'Confirmar solicitud'}
                </p>
                <h2 className='text-base font-bold text-gray-900 mt-0.5 line-clamp-1'>
                  {apartamentoNombre}
                </h2>
              </div>
              <button
                type='button'
                onClick={onClose}
                aria-label='Cerrar'
                className='text-gray-400 hover:text-gray-700 p-1.5 hover:bg-gray-100 rounded-lg transition-colors'
              >
                <X size={20} />
              </button>
            </div>

            {/* Body — switching por estado */}
            <div className='px-6 py-5'>
              {estado === 'form' || estado === 'error' ? (
                <FormContent
                  quote={quote}
                  nombre={nombre}
                  email={email}
                  telefono={telefono}
                  onNombre={setNombre}
                  onEmail={setEmail}
                  onTelefono={setTelefono}
                  errorMsg={errorMsg}
                />
              ) : null}

              {estado === 'loading' && <LoadingContent />}

              {estado === 'success' && <SuccessContent nombre={nombre} telefono={telefono} />}
            </div>

            {/* Footer */}
            <div className='px-6 py-4 border-t border-gray-100 bg-gray-50/50 flex gap-3'>
              {estado === 'form' || estado === 'error' ? (
                <>
                  <button
                    type='button'
                    onClick={onClose}
                    className='flex-1 sm:flex-none px-5 py-3 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-2xl transition-colors'
                  >
                    Cancelar
                  </button>
                  <button
                    type='button'
                    onClick={handleSubmit}
                    disabled={!formValido}
                    className='flex-1 inline-flex items-center justify-center gap-2 bg-livic-black hover:bg-gray-900 disabled:opacity-30 disabled:cursor-not-allowed text-white font-semibold px-5 py-3 rounded-2xl text-sm transition-colors'
                  >
                    <Send size={14} />
                    {estado === 'error' ? 'Reintentar enviar' : 'Enviar solicitud'}
                  </button>
                </>
              ) : estado === 'loading' ? (
                <div className='w-full text-center text-xs text-gray-400 py-1'>
                  No cierres esta ventana
                </div>
              ) : (
                <button
                  type='button'
                  onClick={() => {
                    handleReintentar()
                    onClose()
                    // Tras enviar la solicitud, el usuario queda en /catalogo/[slug]
                    // del apto bloqueado (ya no está disponible). Lo mandamos al
                    // listado para que pueda explorar otras opciones.
                    router.push('/catalogo')
                  }}
                  className='w-full bg-livic-pink hover:bg-livic-pink/90 text-white font-semibold px-5 py-3 rounded-2xl text-sm transition-colors'
                >
                  Seguir cotizando
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ────────────────────────────────────────────────────────────────── */
/*  Subcomponentes                                                    */
/* ────────────────────────────────────────────────────────────────── */

interface FormContentProps {
  quote: QuoteResult
  nombre: string
  email: string
  telefono: string
  onNombre: (v: string) => void
  onEmail: (v: string) => void
  onTelefono: (v: string) => void
  errorMsg: string | null
}

function FormContent({
  quote,
  nombre,
  email,
  telefono,
  onNombre,
  onEmail,
  onTelefono,
  errorMsg,
}: FormContentProps) {
  return (
    <>
      {/* Resumen del quote */}
      <div className='bg-gray-50 rounded-2xl p-4 mb-5 space-y-3'>
        <div className='flex items-center gap-2 text-sm text-gray-700'>
          <Calendar size={14} className='text-gray-400' />
          <span>
            {fmtDateLabel(quote.checkIn)} → {fmtDateLabel(quote.checkOut)}
          </span>
          <span className='ml-auto text-xs text-gray-400 tabular-nums'>
            {quote.noches} noche{quote.noches !== 1 ? 's' : ''}
          </span>
        </div>
        <div className='flex items-center gap-2 text-sm text-gray-700'>
          <Users size={14} className='text-gray-400' />
          <span>
            {quote.huespedes} huésped{quote.huespedes !== 1 ? 'es' : ''}
          </span>
        </div>

        <div className='h-px bg-gray-200' />

        {/* Breakdown */}
        <div className='space-y-1.5 text-xs'>
          <div className='flex justify-between text-gray-500'>
            <span>
              {quote.nochesEntreSemana} entre semana + {quote.nochesFinDeSemana} fin de semana
            </span>
            <span className='tabular-nums text-gray-700'>
              {fmtCurrency(quote.subtotal, quote.moneda)}
            </span>
          </div>
          {quote.descuentoPct > 0 && (
            <div className='flex justify-between text-emerald-700'>
              <span>
                Descuento {quote.descuentoTipo} ({quote.descuentoPct.toFixed(0)}%)
              </span>
              <span className='tabular-nums'>
                − {fmtCurrency(quote.descuentoMonto, quote.moneda)}
              </span>
            </div>
          )}
          {quote.descuentoHuespedesMonto > 0 && quote.descuentoHuespedesAplicadoA != null && (
            <div className='flex justify-between text-emerald-700'>
              <span>
                Descuento por {quote.descuentoHuespedesAplicadoA} huésped
                {quote.descuentoHuespedesAplicadoA !== 1 ? 'es' : ''}
              </span>
              <span className='tabular-nums'>
                − {fmtCurrency(quote.descuentoHuespedesMonto, quote.moneda)}
              </span>
            </div>
          )}
          {quote.tarifaLimpieza > 0 && (
            <div className='flex justify-between text-gray-500'>
              <span>Tarifa de limpieza</span>
              <span className='tabular-nums text-gray-700'>
                {fmtCurrency(quote.tarifaLimpieza, quote.moneda)}
              </span>
            </div>
          )}
        </div>

        <div className='h-px bg-gray-200' />

        <div className='flex items-baseline justify-between'>
          <p className='text-[10px] text-gray-400 uppercase tracking-[0.12em]'>Total</p>
          <p className='text-xl font-bold text-gray-900 tabular-nums tracking-tight'>
            {fmtCurrency(quote.total, quote.moneda)}
          </p>
        </div>
      </div>

      {/* Form */}
      <p className='text-xs text-gray-500 mb-3 leading-relaxed'>
        Completa tus datos. LIVIC te confirmará por WhatsApp en pocos minutos y bloqueará el
        apartamento para que nadie más lo reserve mientras tanto.
      </p>

      <div className='space-y-3'>
        <FieldLabel label='Nombre' required>
          <input
            type='text'
            value={nombre}
            onChange={(e) => onNombre(e.target.value)}
            placeholder='Tu nombre completo'
            autoComplete='name'
            className='w-full px-4 py-3 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-livic-pink/50 focus:border-livic-pink transition-all'
          />
        </FieldLabel>

        <FieldLabel label='Email' required>
          <input
            type='email'
            value={email}
            onChange={(e) => onEmail(e.target.value)}
            placeholder='tu@email.com'
            autoComplete='email'
            inputMode='email'
            className='w-full px-4 py-3 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-livic-pink/50 focus:border-livic-pink transition-all'
          />
        </FieldLabel>

        <FieldLabel label='WhatsApp' required hint='Con código de país. Ej. +57 300 1234567'>
          <input
            type='tel'
            value={telefono}
            onChange={(e) => onTelefono(e.target.value)}
            placeholder='+57 300 1234567'
            autoComplete='tel'
            inputMode='tel'
            className='w-full px-4 py-3 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-livic-pink/50 focus:border-livic-pink transition-all'
          />
        </FieldLabel>
      </div>

      {errorMsg && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className='mt-4 p-3 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-2 text-xs text-red-700'
        >
          <AlertCircle className='w-3.5 h-3.5 mt-0.5 flex-shrink-0' />
          <span>{errorMsg}</span>
        </motion.div>
      )}
    </>
  )
}

interface FieldLabelProps {
  label: string
  required?: boolean
  hint?: string
  children: React.ReactNode
}

function FieldLabel({ label, required, hint, children }: FieldLabelProps) {
  return (
    <label className='block'>
      <span className='text-xs font-medium text-gray-700 block mb-1.5'>
        {label}
        {required && <span className='text-livic-pink ml-0.5'>*</span>}
      </span>
      {children}
      {hint && <span className='text-[10px] text-gray-400 mt-1 block'>{hint}</span>}
    </label>
  )
}

function LoadingContent() {
  return (
    <div className='py-12 flex flex-col items-center justify-center text-center gap-4'>
      <div className='w-12 h-12 border-[3px] border-gray-100 border-t-livic-pink rounded-full animate-spin' />
      <div>
        <p className='text-sm font-semibold text-gray-900'>Enviando tu solicitud…</p>
        <p className='text-xs text-gray-400 mt-1'>Apenas unos segundos</p>
      </div>
    </div>
  )
}

interface SuccessContentProps {
  nombre: string
  telefono: string
}

function SuccessContent({ nombre, telefono }: SuccessContentProps) {
  return (
    <div className='py-6 flex flex-col items-center text-center'>
      {/* Checkmark animado */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 14, delay: 0.05 }}
        className='relative w-20 h-20 mb-4'
      >
        {/* Ring de pulso */}
        <motion.div
          initial={{ scale: 0.6, opacity: 0.6 }}
          animate={{ scale: 1.5, opacity: 0 }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeOut' }}
          className='absolute inset-0 rounded-full bg-emerald-200'
        />
        <div className='relative w-full h-full bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center shadow-lg shadow-emerald-200'>
          <motion.div
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <CheckCircle2 size={40} className='text-white' strokeWidth={2.5} />
          </motion.div>
        </div>
      </motion.div>

      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        className='text-lg font-bold text-gray-900'
      >
        ¡Listo{nombre ? `, ${nombre.split(' ')[0]}` : ''}!
      </motion.h3>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className='text-sm text-gray-600 mt-2 max-w-sm leading-relaxed'
      >
        Tu solicitud está <span className='font-semibold text-gray-900'>en proceso de confirmación</span>.
        En unos minutos te escribiremos al WhatsApp{' '}
        <span className='font-semibold text-gray-900 tabular-nums'>{telefono}</span> para coordinar.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65, duration: 0.4 }}
        className='mt-5 px-4 py-3 bg-livic-pink/5 border border-livic-pink/20 rounded-2xl flex items-start gap-2.5 text-xs text-gray-700 max-w-sm'
      >
        <MessageCircle className='w-4 h-4 mt-0.5 flex-shrink-0 text-livic-pink' />
        <span className='text-left leading-relaxed'>
          El apartamento quedó <strong>en proceso de cotización</strong> y no aparecerá disponible
          para otros cotizantes hasta que LIVIC confirme tu reserva.
        </span>
      </motion.div>
    </div>
  )
}
