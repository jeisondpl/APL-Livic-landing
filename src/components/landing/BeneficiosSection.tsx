'use client'

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { LANDING_CONTENT } from "@/data/landing-content";

export default function BeneficiosSection() {
  return (
    <section id="beneficios" className="w-full bg-surface-default py-24 md:py-32 overflow-hidden">
      <div className="max-w-[1440px] px-6 md:px-16 mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="inline-block text-[var(--color-secondary)] font-heading font-medium tracking-widest text-sm uppercase mb-4">
            Beneficios Exclusivos
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground leading-[1.2]">
            Qué obtienes como propietario
          </h2>
          <p className="mt-6 text-text-muted font-body text-lg">
            Beneficios reales para tu inversión y la tranquilidad de saber que tu inmueble está en manos de profesionales.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto relative z-10">
          {LANDING_CONTENT.beneficios.map((beneficio, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group flex flex-col items-center text-center bg-surface-lowest rounded-3xl p-8 shadow-[0_12px_24px_rgba(25,28,29,0.03)] hover:shadow-[0_24px_48px_rgba(25,28,29,0.06)] transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-full bg-surface-low group-hover:bg-[var(--color-secondary-container)] flex items-center justify-center transition-colors duration-300 mb-6 shrink-0">
                <Check className="w-5 h-5 text-text-muted group-hover:text-[var(--color-secondary)] transition-colors duration-300" />
              </div>
              <span className="text-[17px] font-heading font-semibold text-foreground leading-snug">
                {beneficio}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
