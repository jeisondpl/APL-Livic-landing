'use client'

/**
 * BeneficiosSection.tsx
 * Lista de beneficios para propietarios
 */

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Section from "@/components/shared/Section";
import { LANDING_CONTENT } from "@/data/landing-content";

export default function BeneficiosSection() {
  return (
    <Section
      id="beneficios"
      titulo="Qué obtienes como propietario"
      subtitulo="Beneficios reales para tu inversión y tranquilidad"
      acento="green"
      centrado
      className="py-20 md:py-24"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto mt-12">
        {LANDING_CONTENT.beneficios.map((beneficio, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="flex items-center gap-4 bg-white rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-livic-green/10 flex items-center justify-center">
              <Check className="w-6 h-6 text-livic-green" />
            </div>
            <span className="text-base font-medium text-foreground">
              {beneficio}
            </span>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
