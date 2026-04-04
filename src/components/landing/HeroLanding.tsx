'use client'

/**
 * HeroLanding.tsx
 * Hero principal estilo HeroPanel del catálogo
 * Adaptado para propósito institucional
 */

import { motion } from "framer-motion";
import { MessageCircle, ArrowDown, Check } from "lucide-react";
import { LANDING_CONTENT } from "@/data/landing-content";
import { getWhatsAppLink } from "@/lib/utils";
import { CONFIG } from "@/data/config";

// ── Variantes de animación (copiadas de catalogos) ──
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number]
    }
  },
}

// Bullets institucionales
const HERO_BULLETS = [
  'Presencia real y control operativo',
  'Atención humana y cercana',
  'Transparencia total en la gestión',
]

export default function HeroLanding() {
  const whatsappUrl = getWhatsAppLink(
    CONFIG.contact.whatsapp.number,
    CONFIG.contact.whatsapp.message
  );

  const handleScrollToServicios = () => {
    const element = document.querySelector('#servicios');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Dividir el tagline en dos partes para el gradiente
  const [titlePart1, titlePart2] = LANDING_CONTENT.hero.tagline.includes(':')
    ? LANDING_CONTENT.hero.tagline.split(':').map(s => s.trim())
    : [LANDING_CONTENT.hero.tagline, ''];

  return (
    <section className="w-full min-h-screen px-4 md:px-8 xl:px-14 py-12 flex items-center">
      <div
        className="relative w-full max-w-6xl mx-auto rounded-3xl shadow-2xl overflow-hidden"
        style={{ minHeight: '600px' }}
      >
        {/* Fondo con imagen y overlay direccional */}
        <div className="absolute inset-0">
          <img
            src={LANDING_CONTENT.hero.backgroundImage}
            alt="LIVIC Santa Marta"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/20" />
        </div>

        {/* Contenido en grid de 2 columnas */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center px-6 md:px-12 py-12 lg:py-16">

          {/* Columna izquierda - Contenido institucional */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-5"
          >
            {/* Logo */}
            <motion.div variants={itemVariants}>
              <img
                src="/logo-livic-white.png"
                alt="LIVIC"
                className="h-12 md:h-14 w-auto mb-5"
              />
            </motion.div>

            {/* Badge amarillo */}
            <motion.div variants={itemVariants}>
              <span className="inline-block bg-livic-yellow text-livic-black text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wide">
                Operación Turística Profesional
              </span>
            </motion.div>

            {/* Título con gradiente */}
            <motion.div variants={itemVariants}>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight">
                {titlePart1}
                {titlePart2 && (
                  <>
                    <br />
                    <span
                      className="inline-block bg-gradient-to-r from-livic-pink to-livic-purple bg-clip-text text-transparent"
                    >
                      {titlePart2}
                    </span>
                  </>
                )}
              </h1>
            </motion.div>

            {/* Subtítulo */}
            <motion.div variants={itemVariants}>
              <p className="text-base md:text-lg text-white/90 leading-relaxed">
                {LANDING_CONTENT.hero.subtitle}
              </p>
            </motion.div>

            {/* Lista de bullets con checkmarks */}
            <ul className="space-y-3">
              {HERO_BULLETS.map((item) => (
                <motion.li
                  key={item}
                  variants={itemVariants}
                  className="flex items-center gap-3 text-white/90"
                >
                  <span className="w-5 h-5 rounded-full bg-livic-green/30 border border-livic-green/50 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-livic-green" />
                  </span>
                  <span className="text-sm md:text-base">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Columna derecha - Panel de CTAs */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.4,
              ease: [0.22, 1, 0.36, 1] as [number, number, number, number]
            }}
            className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 w-full max-w-md lg:ml-auto"
          >
            {/* Título del panel */}
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Conoce nuestros servicios
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              Descubre cómo LIVIC puede ayudarte
            </p>

            {/* CTAs apilados */}
            <div className="space-y-4">
              {/* CTA 1: Ver servicios */}
              <button
                onClick={handleScrollToServicios}
                className="w-full bg-livic-pink hover:bg-livic-pink/90 text-white font-semibold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl"
              >
                <span>Ver servicios</span>
                <ArrowDown className="w-5 h-5" />
              </button>

              {/* CTA 2: WhatsApp */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-livic-green hover:bg-livic-green/90 text-white font-semibold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Contactar por WhatsApp</span>
              </a>
            </div>

            {/* Nota de confianza */}
            <p className="text-xs text-gray-400 mt-5 text-center">
              ✓ Respondemos en menos de 24 horas
            </p>

            {/* Mini stats discretos */}
            <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-100">
              <div className="text-center">
                <div className="text-lg font-bold text-livic-pink">50+</div>
                <div className="text-xs text-gray-500">Propiedades</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-livic-green">5+</div>
                <div className="text-xs text-gray-500">Años</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-livic-yellow">100%</div>
                <div className="text-xs text-gray-500">Satisfacción</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Indicador de scroll */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-1 cursor-pointer opacity-60 hover:opacity-100 transition-opacity"
          onClick={handleScrollToServicios}
        >
          <span className="text-white text-xs uppercase tracking-wider">
            Descubre más
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown className="w-5 h-5 text-white" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
