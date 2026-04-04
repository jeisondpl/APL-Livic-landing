'use client'

/**
 * ServicioCard.tsx
 * Card horizontal de servicio con imagen y características
 */

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import * as LucideIcons from "lucide-react";
import type { Servicio } from "@/data/landing-content";

interface ServicioCardProps {
  servicio: Servicio;
  /** Alternar posición de imagen (izquierda o derecha) */
  imagePosition?: "left" | "right";
  /** Índice para animación */
  index?: number;
}

export default function ServicioCard({
  servicio,
  imagePosition = "left",
  index = 0,
}: ServicioCardProps) {
  // Obtener el ícono dinámicamente de Lucide
  const IconComponent = (LucideIcons as any)[servicio.icono] || LucideIcons.Home;

  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.6, delay: index * 0.2, ease: "easeOut" as const }
  };

  return (
    <motion.div
      {...fadeInUp}
      className={`flex flex-col ${
        imagePosition === "right" ? "md:flex-row-reverse" : "md:flex-row"
      } gap-8 items-center bg-white rounded-2xl shadow-lg overflow-hidden p-6 md:p-8 card-hover`}
    >
      {/* Imagen */}
      <div className="w-full md:w-1/2 flex-shrink-0">
        <div
          className="w-full h-64 md:h-80 bg-cover bg-center rounded-xl"
          style={{
            backgroundImage: `url('${servicio.imagen}')`,
            backgroundColor: '#f5f5f5',
          }}
        />
      </div>

      {/* Contenido */}
      <div className="w-full md:w-1/2">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-livic-pink/10 mb-4">
          <IconComponent className="w-7 h-7 text-livic-pink" />
        </div>

        <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
          {servicio.titulo}
        </h3>

        <p className="text-base text-text-muted mb-6 leading-relaxed">
          {servicio.descripcionCorta}
        </p>

        <ul className="space-y-3">
          {servicio.caracteristicas.map((caracteristica, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <Check className="w-5 h-5 text-livic-green flex-shrink-0 mt-0.5" />
              <span className="text-sm text-gray-700">{caracteristica}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
