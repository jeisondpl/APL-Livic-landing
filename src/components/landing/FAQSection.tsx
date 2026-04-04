'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, MessageCircle, Send } from 'lucide-react'
import Section from '@/components/shared/Section'
import { CONFIG } from '@/data/config'
import { getWhatsAppLink } from '@/lib/utils'

const FAQS = [
  {
    pregunta: '¿Que incluye el servicio de operacion turistica?',
    respuesta:
      'Gestionamos todo: publicacion en plataformas, atencion a huespedes, check-in/check-out, limpieza, mantenimiento, inventarios y reportes al propietario. Tu solo recibes los ingresos y la tranquilidad.',
  },
  {
    pregunta: '¿Necesito estar en Santa Marta para que operen mi inmueble?',
    respuesta:
      'No. Justamente nuestro servicio esta disenado para propietarios que no estan en la ciudad. Nos encargamos de todo con presencia real y reportes constantes para que tengas control total desde donde estes.',
  },
  {
    pregunta: '¿Como se manejan los pagos y la transparencia?',
    respuesta:
      'Enviamos reportes claros y periodicos con el detalle de ingresos, gastos y ocupacion. Cada propietario tiene visibilidad completa de la gestion de su propiedad.',
  },
  {
    pregunta: '¿Que pasa si mi inmueble no esta en operacion turistica?',
    respuesta:
      'Ofrecemos el servicio de Acompanamiento y Cuidado del Inmueble: visitas periodicas, supervision del estado general, coordinacion de mantenimientos y atencion de cualquier novedad.',
  },
  {
    pregunta: '¿En que zonas de Santa Marta operan?',
    respuesta:
      'Actualmente operamos en Gaira (Playa Salguero), con propiedades en edificios como Salguero Suite, Salguero Park, Reserva del Mar y Reserva del Mar 2. Estamos en constante expansion.',
  },
  {
    pregunta: '¿Cuanto cuesta el servicio de LIVIC?',
    respuesta:
      'Nuestras tarifas dependen del tipo de servicio y las caracteristicas del inmueble. Contactanos por WhatsApp para una cotizacion personalizada sin compromiso.',
  },
  {
    pregunta: '¿Puedo ver mi propiedad en las plataformas de reservas?',
    respuesta:
      'Si. Una vez activa, tu propiedad estara visible en Airbnb y otras plataformas. Ademas, gestionamos reservas directas para maximizar tus ingresos.',
  },
]

function FAQItem({ faq, index }: { faq: typeof FAQS[0]; index: number }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
    >
      <button
        onClick={() => setOpen(!open)}
        className='w-full text-left p-5 md:p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all group'
      >
        <div className='flex items-center justify-between gap-4'>
          <span className='text-base md:text-lg font-semibold text-gray-900 leading-snug'>
            {faq.pregunta}
          </span>
          <motion.div
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className='flex-shrink-0 w-8 h-8 rounded-full bg-livic-pink/10 flex items-center justify-center group-hover:bg-livic-pink/20 transition-colors'
          >
            <ChevronDown className='w-4 h-4 text-livic-pink' />
          </motion.div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className='overflow-hidden'
            >
              <p className='text-gray-500 text-sm md:text-base leading-relaxed mt-4 pr-12'>
                {faq.respuesta}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </motion.div>
  )
}

function ContactForm() {
  const [form, setForm] = useState({ nombre: '', email: '', mensaje: '' })
  const [estado, setEstado] = useState<'idle' | 'enviando' | 'enviado' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setEstado('enviando')

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
          from_name: 'LIVIC Landing',
          subject: `Nuevo mensaje de ${form.nombre}`,
          name: form.nombre,
          email: form.email,
          message: form.mensaje,
        }),
      })

      if (res.ok) {
        setEstado('enviado')
        setForm({ nombre: '', email: '', mensaje: '' })
        setTimeout(() => setEstado('idle'), 5000)
      } else {
        setEstado('error')
        setTimeout(() => setEstado('idle'), 4000)
      }
    } catch {
      setEstado('error')
      setTimeout(() => setEstado('idle'), 4000)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className='relative bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-10 overflow-hidden'
    >
      {/* Decoracion superior */}
      <div className='absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-livic-pink via-livic-purple to-livic-green' />

      <div className='flex items-center gap-3 mb-2'>
        <div className='w-10 h-10 rounded-xl bg-livic-pink/10 flex items-center justify-center'>
          <MessageCircle className='w-5 h-5 text-livic-pink' />
        </div>
        <h3 className='text-xl font-bold text-gray-900'>Escríbenos</h3>
      </div>
      <p className='text-gray-500 text-sm mb-6'>
        Completa el formulario y te contactamos
      </p>

      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <label htmlFor='faq-nombre' className='block text-sm font-medium text-gray-700 mb-1.5'>
            Nombre
          </label>
          <input
            id='faq-nombre'
            type='text'
            required
            value={form.nombre}
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
            placeholder='Tu nombre completo'
            className='w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-livic-pink focus:ring-2 focus:ring-livic-pink/20 outline-none transition-all text-sm bg-gray-50 focus:bg-white'
          />
        </div>

        <div>
          <label htmlFor='faq-email' className='block text-sm font-medium text-gray-700 mb-1.5'>
            Email
          </label>
          <input
            id='faq-email'
            type='email'
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder='tu@email.com'
            className='w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-livic-pink focus:ring-2 focus:ring-livic-pink/20 outline-none transition-all text-sm bg-gray-50 focus:bg-white'
          />
        </div>

        <div>
          <label htmlFor='faq-mensaje' className='block text-sm font-medium text-gray-700 mb-1.5'>
            Mensaje
          </label>
          <textarea
            id='faq-mensaje'
            required
            rows={4}
            value={form.mensaje}
            onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
            placeholder='Cuentanos en que podemos ayudarte...'
            className='w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-livic-pink focus:ring-2 focus:ring-livic-pink/20 outline-none transition-all text-sm bg-gray-50 focus:bg-white resize-none'
          />
        </div>

        <button
          type='submit'
          disabled={estado === 'enviando'}
          className='w-full bg-livic-pink hover:bg-livic-pink/90 disabled:bg-livic-pink/60 text-white font-semibold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl'
        >
          <Send className='w-4 h-4' />
          {estado === 'enviando' ? 'Enviando...' : 'Enviar mensaje'}
        </button>

        <AnimatePresence>
          {estado === 'enviado' && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className='text-center text-livic-green text-sm font-medium'
            >
              Mensaje enviado. Te contactaremos pronto!
            </motion.p>
          )}
          {estado === 'error' && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className='text-center text-red-500 text-sm font-medium'
            >
              Error al enviar. Intenta de nuevo.
            </motion.p>
          )}
        </AnimatePresence>
      </form>
    </motion.div>
  )
}

export default function FAQSection() {
  return (
    <Section
      id='faq'
      titulo='Preguntas Frecuentes'
      subtitulo='Resuelve tus dudas sobre nuestros servicios de operacion turistica y acompanamiento inmobiliario'
      acento='purple'
      centrado
      className='py-20 md:py-24'
    >
      <div className='grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-12 mt-12'>
        {/* Columna izquierda: FAQs */}
        <div className='lg:col-span-3 space-y-3'>
          {FAQS.map((faq, i) => (
            <FAQItem key={i} faq={faq} index={i} />
          ))}
        </div>

        {/* Columna derecha: Formulario */}
        <div className='lg:col-span-2'>
          <div className='lg:sticky lg:top-24'>
            <ContactForm />
          </div>
        </div>
      </div>
    </Section>
  )
}
