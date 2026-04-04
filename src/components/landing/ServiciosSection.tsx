'use client'

import { motion } from "framer-motion";
import { LANDING_CONTENT } from "@/data/landing-content";
import * as Icons from "lucide-react";

export default function ServiciosSection() {
  return (
    <section id="servicios" className="w-full bg-surface-default py-24 md:py-32">
      <div className="max-w-[1440px] px-6 md:px-16 mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-20 max-w-2xl"
        >
          <span className="text-[var(--color-primary)] font-heading font-medium tracking-widest text-sm uppercase mb-4 block">
            El Estándar LIVIC
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground leading-[1.2]">
            Nuestros Servicios
          </h2>
          <p className="mt-6 text-text-muted font-body text-lg">
            Ofrecemos soluciones completas y transparentes para la gestión y cuidado de tu propiedad en renta turística o privada.
          </p>
        </motion.div>

        <div className="flex flex-col gap-12 md:gap-24">
          {LANDING_CONTENT.servicios.map((servicio, index) => {
            const Icon = Icons[servicio.icono as keyof typeof Icons] as any;
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={servicio.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.9, delay: 0.2 }}
                className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-16 items-center`}
              >
                {/* Image Area */}
                <div className="w-full lg:w-[45%] relative">
                  <div className="aspect-[4/5] w-full rounded-3xl overflow-hidden shadow-2xl relative">
                    <img 
                      src={servicio.imagen || '/hero-landing.jpg'} 
                      alt={servicio.titulo}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-[var(--color-primary)]/10 mix-blend-multiply" />
                  </div>
                  {/* Floating Icon Decorator */}
                  <div className={`absolute ${isEven ? '-right-8' : '-left-8'} top-16 bg-surface-lowest p-6 rounded-2xl shadow-[0_20px_40px_rgba(25,28,29,0.06)] hidden md:block`}>
                     {Icon && <Icon className="w-8 h-8 text-[var(--color-primary)]" />}
                  </div>
                </div>

                {/* Content Area */}
                <div className="w-full lg:w-[55%]">
                  <div className="bg-surface-lowest p-8 lg:p-12 rounded-[2rem] shadow-sm">
                    <h3 className="text-3xl font-heading font-bold text-foreground mb-4">
                      {servicio.titulo}
                    </h3>
                    <p className="text-text-muted font-body text-lg mb-8">
                      {servicio.descripcionCorta}
                    </p>
                    
                    <ul className="space-y-4">
                      {servicio.caracteristicas.map((caracteristica, i) => (
                        <li key={i} className="flex items-start gap-4 p-4 rounded-xl hover:bg-surface-low transition-colors duration-300">
                          <span className="w-6 h-6 shrink-0 rounded-full bg-[var(--color-secondary-container)] flex items-center justify-center mt-0.5">
                            <span className="w-2 h-2 rounded-full bg-[var(--color-secondary)]" />
                          </span>
                          <span className="font-body text-foreground leading-relaxed text-[15px]">
                            {caracteristica}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
