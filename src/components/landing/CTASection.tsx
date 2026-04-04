'use client'

/**
 * CTASection.tsx
 * Sección de llamada a acción final con WhatsApp
 */

import { motion } from "framer-motion";
import { MessageCircle, Clock } from "lucide-react";
import { LANDING_CONTENT } from "@/data/landing-content";
import { getWhatsAppLink } from "@/lib/utils";
import { CONFIG } from "@/data/config";

export default function CTASection() {
  const whatsappUrl = getWhatsAppLink(
    CONFIG.contact.whatsapp.number,
    CONFIG.contact.whatsapp.message
  );

  return (
    <section className="w-full py-24 md:py-32 bg-gradient-to-br from-livic-purple via-livic-pink to-livic-purple relative overflow-hidden">
      {/* Patrón decorativo de fondo */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            {LANDING_CONTENT.cta.titulo}
          </h2>

          <p className="text-lg md:text-xl text-white/95 mb-12 max-w-2xl mx-auto leading-relaxed">
            {LANDING_CONTENT.cta.subtitulo}
          </p>

          <motion.a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 bg-livic-green text-white font-bold text-lg md:text-xl px-10 py-5 rounded-2xl shadow-2xl hover:shadow-[0_20px_60px_rgba(106,184,149,0.5)] hover:scale-105 transition-all duration-300 mb-8 group"
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
          >
            <MessageCircle className="w-7 h-7 group-hover:rotate-12 transition-transform" />
            <span>{LANDING_CONTENT.cta.textoBoton}</span>
          </motion.a>

          <div className="flex items-center justify-center gap-2 text-white/90 text-sm md:text-base">
            <Clock className="w-5 h-5" />
            <span>{LANDING_CONTENT.cta.nota}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
