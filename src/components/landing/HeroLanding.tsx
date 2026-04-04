'use client'

import { motion } from "framer-motion";
import { MessageCircle, ArrowDown, Building2 } from "lucide-react";
import { LANDING_CONTENT } from "@/data/landing-content";
import { getWhatsAppLink } from "@/lib/utils";
import { CONFIG } from "@/data/config";

const easeCustom = [0.22, 1, 0.36, 1] as const;

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

  const [titlePart1, titlePart2] = LANDING_CONTENT.hero.tagline.includes(':')
    ? LANDING_CONTENT.hero.tagline.split(':').map(s => s.trim())
    : [LANDING_CONTENT.hero.tagline, ''];

  return (
    <section className="relative w-full min-h-screen bg-surface-lowest overflow-hidden flex flex-col justify-center">
      {/* Editorial typography mark */}
      <div className="absolute top-0 left-0 w-full h-[50vh] bg-surface-low z-0" />
      
      <div className="relative z-10 w-full max-w-[1440px] pl-6 md:pl-16 pr-6 md:pr-0 mx-auto grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-0 items-center">
        
        {/* Left Content Area (Asymmetrical Split) */}
        <div className="pt-24 lg:pt-0 pb-12 lg:pr-24 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: easeCustom }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--surface-lowest)] border border-[var(--color-outline-variant)]/40 shadow-sm mb-10">
              <Building2 className="w-4 h-4 text-[var(--color-primary)]" />
              <span className="text-xs font-heading font-medium tracking-widest uppercase text-foreground/80">
                Operación Turística Profesional
              </span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: easeCustom }}
            className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-foreground leading-[1.1] tracking-tight mb-8"
          >
            {titlePart1}
            {titlePart2 && (
              <>
                <br />
                <span className="text-[var(--color-primary)] font-medium">
                  {titlePart2}
                </span>
              </>
            )}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: easeCustom }}
            className="text-lg md:text-xl text-text-muted font-body leading-relaxed max-w-xl mb-12"
          >
            {LANDING_CONTENT.hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: easeCustom }}
            className="flex flex-col sm:flex-row gap-5"
          >
            <button
              onClick={handleScrollToServicios}
              className="group overflow-hidden relative px-8 py-4 rounded-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-container)] text-white hover:text-black font-heading font-semibold text-sm tracking-wide uppercase transition-all duration-300 shadow-[0_20px_40px_rgba(145,69,104,0.15)] flex items-center gap-3 justify-center"
            >
              <span>{LANDING_CONTENT.hero.ctaPrimary}</span>
              <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
            </button>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-full bg-transparent border border-[var(--color-outline-variant)] hover:border-[var(--color-primary)] text-foreground font-heading font-semibold text-sm tracking-wide uppercase transition-colors duration-300 flex items-center justify-center gap-3"
            >
              <MessageCircle className="w-5 h-5 text-[var(--color-secondary)]" />
              <span>{LANDING_CONTENT.hero.ctaSecondary}</span>
            </a>
          </motion.div>
        </div>

        {/* Right Image Area (Asymmetrical Full Bleed) */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: easeCustom }}
          className="relative h-[600px] lg:h-[90vh] w-full"
        >
          <div className="absolute inset-0 rounded-l-[2rem] lg:rounded-l-[4rem] overflow-hidden">
            <img
              src="/hero-landing.jpg"
              alt="LIVIC Property"
              className="w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-[2s] ease-out"
            />
            {/* Glassmorphism gradient overlay overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-surface-low/30 to-transparent mix-blend-overlay" />
          </div>

          {/* Floating Glassmorphism Badge */}
          <div className="absolute bottom-12 left-[-2rem] md:left-[-4rem] bg-surface-lowest/80 backdrop-blur-xl border border-surface-default/50 shadow-[0_30px_60px_rgba(25,28,29,0.06)] p-6 rounded-2xl w-72">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-[var(--color-secondary-container)] flex items-center justify-center">
                <span className="text-[var(--color-secondary)] font-heading font-bold text-xl">100%</span>
              </div>
              <div>
                <p className="font-heading font-bold text-foreground text-sm">Transparencia</p>
                <p className="font-body text-xs text-text-muted mt-1">Gestión integral real</p>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
