'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Bell, MessageCircle } from 'lucide-react'
import { CONFIG } from '@/data/config'
import { getWhatsAppLink } from '@/lib/utils'

interface ProximamenteModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ProximamenteModal({ isOpen, onClose }: ProximamenteModalProps) {
  const whatsappUrl = getWhatsAppLink(
    CONFIG.contact.whatsapp.number,
    'Hola LIVIC, quiero que me notifiquen cuando esté disponible el servicio de cotización de alojamientos'
  )

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
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
            <div className='relative bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden'>
              {/* Header decorativo */}
              <div className='relative bg-gradient-to-br from-livic-pink via-livic-purple to-livic-pink p-8 pb-12 text-center'>
                <button
                  onClick={onClose}
                  className='absolute top-4 right-4 text-white/70 hover:text-white transition-colors'
                >
                  <X className='w-5 h-5' />
                </button>

                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', damping: 15 }}
                  className='inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-4'
                >
                  <Bell className='w-8 h-8 text-white' />
                </motion.div>

                <h3 className='text-2xl font-black text-white'>Muy pronto</h3>
              </div>

              {/* Contenido */}
              <div className='px-8 pb-8 -mt-4'>
                <div className='bg-gray-50 rounded-2xl p-6 text-center'>
                  <p className='text-gray-700 text-base leading-relaxed mb-2'>
                    Estamos preparando algo increible para ti.
                  </p>
                  <p className='text-gray-500 text-sm leading-relaxed'>
                    Nuestro cotizador de alojamientos estara disponible muy pronto.
                    Escribenos y te avisamos en cuanto este listo. Te esperamos.
                  </p>
                </div>

                {/* CTA WhatsApp */}
                <a
                  href={whatsappUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='mt-6 w-full bg-livic-green hover:bg-livic-green/90 text-white font-semibold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl'
                >
                  <MessageCircle className='w-5 h-5' />
                  <span>Notificame por WhatsApp</span>
                </a>

                <button
                  onClick={onClose}
                  className='mt-3 w-full text-gray-400 hover:text-gray-600 text-sm font-medium py-2 transition-colors'
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
