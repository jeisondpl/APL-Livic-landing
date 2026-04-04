'use client'

/**
 * ValorDiferencialSection.tsx
 * Grid de 8 valores diferenciales de LIVIC
 */

import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import Section from "@/components/shared/Section";
import { LANDING_CONTENT } from "@/data/landing-content";

export default function ValorDiferencialSection() {
  return (
    <Section
      id="valor"
      titulo="Por qué elegir Alojate con LIVIC"
      subtitulo="Nuestra experiencia y compromiso nos hacen diferentes"
      acento="purple"
      centrado
      className="py-20 md:py-24 bg-surface-100"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
        {LANDING_CONTENT.valorDiferencial.map((valor, index) => {
          const IconComponent = (LucideIcons as any)[valor.icono] || LucideIcons.Star;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-livic-purple/10 mb-4">
                <IconComponent className="w-6 h-6 text-livic-purple" />
              </div>

              <h4 className="text-lg font-bold text-foreground mb-2">
                {valor.titulo}
              </h4>

              <p className="text-sm text-text-muted leading-relaxed">
                {valor.descripcion}
              </p>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
