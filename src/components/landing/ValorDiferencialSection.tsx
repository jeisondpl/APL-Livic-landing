'use client'

import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { LANDING_CONTENT } from "@/data/landing-content";

export default function ValorDiferencialSection() {
  return (
    <section id="valor" className="w-full bg-surface-lowest relative py-24 md:py-32">
      {/* Background Graphic Element */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[30%] h-[70%] bg-surface-low rounded-r-[4rem] z-0" />

      <div className="relative z-10 max-w-[1440px] px-6 md:px-16 mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl lg:ml-auto lg:mr-24 mb-20 md:text-right"
        >
          <span className="inline-block text-[var(--color-tertiary)] font-heading font-medium tracking-widest text-sm uppercase mb-4">
            Nuestra Diferencia
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground leading-[1.2]">
            Por qué elegir LIVIC
          </h2>
          <p className="mt-6 text-text-muted font-body text-lg">
            Nuestra experiencia y compromiso nos hacen diferentes. Operamos propiedades con una mentalidad enfocada en maximizar el retorno sin sacrificar la tranquilidad.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16 mt-12">
          {LANDING_CONTENT.valorDiferencial.map((valor, index) => {
            const IconComponent = (LucideIcons as any)[valor.icono] || LucideIcons.Star;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: (index % 4) * 0.1 }}
                className="group flex flex-col items-start bg-transparent"
              >
                <div className="relative flex items-center justify-center w-14 h-14 rounded-2xl bg-surface-low group-hover:bg-surface-default transition-colors duration-300 mb-6 shrink-0">
                  <IconComponent className="w-6 h-6 text-[var(--color-primary)]" />
                  {/* Subtle hover glow */}
                  <div className="absolute inset-0 rounded-2xl bg-[var(--color-primary)] opacity-0 group-hover:opacity-10 transition-opacity blur-md" />
                </div>

                <h4 className="text-xl font-heading font-bold text-foreground mb-3">
                  {valor.titulo}
                </h4>

                <p className="font-body text-[15px] text-text-muted leading-relaxed">
                  {valor.descripcion}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
