'use client'

import { motion } from "framer-motion";
import { MessageCircle, Clock, ArrowRight } from "lucide-react";
import { LANDING_CONTENT } from "@/data/landing-content";
import { getWhatsAppLink } from "@/lib/utils";
import { CONFIG } from "@/data/config";

export default function CTASection() {
  const whatsappUrl = getWhatsAppLink(
    CONFIG.contact.whatsapp.number,
    CONFIG.contact.whatsapp.message
  );

  return (
    <section className="w-full bg-surface-lowest relative py-32 overflow-hidden">
      {/* Editorial Decorative Graphic */}
      <div className="absolute top-0 right-0 w-[50%] h-full bg-[var(--color-primary-container)]/10 rounded-l-[8rem] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="bg-[var(--color-primary)] rounded-[3rem] p-12 md:p-24 overflow-hidden relative"
        >
          {/* Internal Gradient Glow */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white rounded-full blur-[100px] opacity-10 translate-x-1/2 -translate-y-1/2" />

          <div className="relative z-10 max-w-3xl">
            <span className="inline-block text-[var(--color-tertiary-fixed)] font-heading font-medium tracking-widest text-sm uppercase mb-6">
              Empieza Hoy
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 leading-[1.1] tracking-tight">
              {LANDING_CONTENT.cta.titulo}
            </h2>

            <p className="text-lg md:text-xl text-white/80 font-body mb-12 max-w-xl leading-relaxed">
              {LANDING_CONTENT.cta.subtitulo}
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center gap-3 bg-[var(--color-tertiary-fixed)] text-[var(--color-tertiary-container)] font-heading font-bold text-base px-10 py-5 rounded-full shadow-[0_20px_40px_rgba(0,0,0,0.2)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.3)] transition-all duration-300"
              >
                <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <span>{LANDING_CONTENT.cta.textoBoton}</span>
                <span className="w-8 h-8 rounded-full bg-[var(--color-tertiary-container)] flex items-center justify-center ml-2 border border-white/20">
                  <ArrowRight className="w-4 h-4 text-white" />
                </span>
              </a>

              <div className="flex items-center gap-2 text-white/70 font-body text-sm mt-4 sm:mt-0 px-4">
                <Clock className="w-4 h-4" />
                <span>{LANDING_CONTENT.cta.nota}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
