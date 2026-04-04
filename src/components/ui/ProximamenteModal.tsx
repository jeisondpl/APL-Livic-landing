'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Bell, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react'
import { CONFIG } from '@/data/config'
import { getWhatsAppLink } from '@/lib/utils'

interface ProximamenteModalProps {
  isOpen: boolean
  onClose: () => void
}

const STEPS = [
  { src: '/source/step/1.png', titulo: 'Busca tu destino', descripcion: 'Selecciona fechas y numero de huespedes' },
  { src: '/source/step/2.png', titulo: 'Explora opciones', descripcion: 'Compara alojamientos verificados por LIVIC' },
  { src: '/source/step/3.png', titulo: 'Mira cada detalle', descripcion: 'Fotos, amenidades y ubicacion en un solo lugar' },
  { src: '/source/step/4.png', titulo: 'Consulta disponibilidad', descripcion: 'Calendario en tiempo real de cada propiedad' },
  { src: '/source/step/5.png', titulo: 'Cotiza al instante', descripcion: 'Precio exacto sin sorpresas ni cargos ocultos' },
  { src: '/source/step/6.png', titulo: 'Reserva facil', descripcion: 'Confirma tu alojamiento en pocos clics' },
]

export default function ProximamenteModal({ isOpen, onClose }: ProximamenteModalProps) {
  const [step, setStep] = useState(0)

  const whatsappUrl = getWhatsAppLink(
    CONFIG.contact.whatsapp.number,
    'Hola LIVIC, quiero que me notifiquen cuando este disponible el servicio de cotizacion de alojamientos'
  )

  const handleClose = () => {
    setStep(0)
    onClose()
  }

  const nextStep = () => setStep((s) => Math.min(s + 1, STEPS.length - 1))
  const prevStep = () => setStep((s) => Math.max(s - 1, 0))

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className='fixed inset-0 bg-black/60 backdrop-blur-sm z-50'
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className='fixed inset-0 z-50 flex items-center justify-center p-4'
          >
            <div className='relative bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden'>
              {/* Header */}
              <div className='relative bg-gradient-to-br from-livic-pink via-livic-purple to-livic-pink px-6 pt-6 pb-4 text-center'>
                <button
                  onClick={handleClose}
                  className='absolute top-4 right-4 text-white/70 hover:text-white transition-colors'
                >
                  <X className='w-5 h-5' />
                </button>

                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', damping: 15 }}
                  className='inline-flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full mb-3'
                >
                  <Bell className='w-6 h-6 text-white' />
                </motion.div>

                <h3 className='text-xl font-black text-white'>Muy pronto</h3>
                <p className='text-white/80 text-xs mt-1'>Asi se vera nuestro cotizador</p>
              </div>

              {/* Step viewer */}
              <div className='px-6 pt-5 pb-2'>
                {/* Progress dots */}
                <div className='flex items-center justify-center gap-2 mb-4'>
                  {STEPS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setStep(i)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        i === step
                          ? 'w-8 bg-livic-pink'
                          : i < step
                          ? 'w-3 bg-livic-pink/40'
                          : 'w-3 bg-gray-200'
                      }`}
                    />
                  ))}
                </div>

                {/* Image with navigation */}
                <div className='relative rounded-2xl overflow-hidden bg-gray-50 border border-gray-100'>
                  <AnimatePresence mode='wait'>
                    <motion.img
                      key={step}
                      src={STEPS[step].src}
                      alt={STEPS[step].titulo}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{ duration: 0.25 }}
                      className='w-full h-auto'
                    />
                  </AnimatePresence>

                  {/* Arrows */}
                  {step > 0 && (
                    <button
                      onClick={prevStep}
                      className='absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 hover:bg-white rounded-full shadow-md flex items-center justify-center transition-all'
                    >
                      <ChevronLeft className='w-4 h-4 text-gray-700' />
                    </button>
                  )}
                  {step < STEPS.length - 1 && (
                    <button
                      onClick={nextStep}
                      className='absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 hover:bg-white rounded-full shadow-md flex items-center justify-center transition-all'
                    >
                      <ChevronRight className='w-4 h-4 text-gray-700' />
                    </button>
                  )}
                </div>

                {/* Step info */}
                <div className='text-center mt-4'>
                  <div className='inline-block bg-livic-pink/10 text-livic-pink text-xs font-bold px-3 py-1 rounded-full mb-1.5'>
                    Paso {step + 1} de {STEPS.length}
                  </div>
                  <h4 className='text-base font-bold text-gray-900'>{STEPS[step].titulo}</h4>
                  <p className='text-gray-500 text-sm'>{STEPS[step].descripcion}</p>
                </div>
              </div>

              {/* Footer */}
              <div className='px-6 pb-6 pt-3'>
                <p className='text-center text-gray-400 text-xs mb-4'>
                  Escribenos y te avisamos en cuanto este listo
                </p>

                <a
                  href={whatsappUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='w-full bg-livic-green hover:bg-livic-green/90 text-white font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl'
                >
                  <MessageCircle className='w-5 h-5' />
                  <span>Notificame por WhatsApp</span>
                </a>

                <button
                  onClick={handleClose}
                  className='mt-2 w-full text-gray-400 hover:text-gray-600 text-sm font-medium py-2 transition-colors'
                >
                  Tal vez despues
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
