'use client'

import { motion } from 'framer-motion'
import { Construction, ArrowLeft, Bell, MessageCircle } from 'lucide-react'
import Link from 'next/link'
import Nav from '@/components/layout/Nav'
import { CONFIG } from '@/data/config'
import { getWhatsAppLink } from '@/lib/utils'

export default function CatalogoPage() {
  const whatsappUrl = getWhatsAppLink(
    CONFIG.contact.whatsapp.number,
    'Hola LIVIC, quiero que me notifiquen cuando el catalogo de alojamientos este disponible'
  )

  return (
    <>
      <Nav />
      <div className='min-h-screen flex items-center justify-center px-4 py-20'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='max-w-lg w-full text-center'
        >
          {/* Icono animado */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', damping: 15 }}
            className='inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-livic-pink/10 to-livic-purple/10 rounded-full mb-8'
          >
            <motion.div
              animate={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <Construction className='w-12 h-12 text-livic-pink' />
            </motion.div>
          </motion.div>

          {/* Badge */}
          <span className='inline-block bg-livic-yellow text-livic-black text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wide mb-4'>
            En construccion
          </span>

          {/* Titulo */}
          <h1 className='text-3xl md:text-4xl font-black text-gray-900 mb-4'>
            Estamos construyendo algo
            <span className='block bg-gradient-to-r from-livic-pink to-livic-purple bg-clip-text text-transparent'>
              increible para ti
            </span>
          </h1>

          {/* Descripcion */}
          <p className='text-gray-500 text-base md:text-lg leading-relaxed mb-8 max-w-md mx-auto'>
            Nuestro catalogo de alojamientos estara disponible muy pronto.
            Estamos preparando la mejor experiencia para que encuentres tu lugar ideal en Santa Marta.
          </p>

          {/* Progress visual */}
          <div className='max-w-xs mx-auto mb-10'>
            <div className='flex justify-between text-xs text-gray-400 mb-2'>
              <span>Progreso</span>
              <span className='text-livic-pink font-bold'>75%</span>
            </div>
            <div className='h-2 bg-gray-100 rounded-full overflow-hidden'>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '75%' }}
                transition={{ duration: 1.5, delay: 0.5, ease: 'easeOut' }}
                className='h-full bg-gradient-to-r from-livic-pink to-livic-purple rounded-full'
              />
            </div>
          </div>

          {/* CTAs */}
          <div className='flex flex-col sm:flex-row items-center justify-center gap-3'>
            <Link
              href='/'
              className='w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-livic-black hover:bg-livic-black/90 text-white font-semibold py-3.5 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl'
            >
              <ArrowLeft className='w-4 h-4' />
              Volver al inicio
            </Link>

            <a
              href={whatsappUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-livic-green hover:bg-livic-green/90 text-white font-semibold py-3.5 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl'
            >
              <MessageCircle className='w-4 h-4' />
              Avisame cuando este listo
            </a>
          </div>

          {/* Nota */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className='mt-10 inline-flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-full px-5 py-2.5'
          >
            <Bell className='w-4 h-4 text-livic-pink' />
            <span className='text-xs text-gray-500'>Escribenos y te notificamos al lanzar</span>
          </motion.div>
        </motion.div>
      </div>
    </>
  )
}
