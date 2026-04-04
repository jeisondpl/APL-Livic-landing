/**
 * CTA.tsx
 * Bloque de llamada a la acción: "Consultar disponibilidad".
 * Client component para el botón con feedback visual (placeholder).
 */

"use client";

import { useState } from "react";

interface CTAProps {
  apartmentName: string;
}

export default function CTA({ apartmentName }: CTAProps) {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    // Placeholder: en futuro se conecta a formulario o a API de reservas.
    setTimeout(() => setClicked(false), 3000);
  };

  return (
    <div className="bg-surface-100 border border-surface-300 rounded-2xl p-6 md:p-8 text-center">
      <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-2">
        ¿Te gustan lo que ves?
      </h3>
      <p className="text-text-muted text-sm md:text-base mb-6 max-w-md mx-auto">
        Consulta la disponibilidad de <span className="text-foreground font-medium">{apartmentName}</span> y reserva tu estadía.
      </p>

      {clicked ? (
        <div className="inline-flex items-center gap-2 text-livic-green font-medium">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>¡Mensaje enviado! Te contactaremos pronto.</span>
        </div>
      ) : (
        <button
          onClick={handleClick}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-livic-pink text-livic-black font-semibold px-8 py-3 text-base hover:bg-livic-pink/90 active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-livic-pink focus-visible:ring-offset-2 focus-visible:ring-offset-surface-100"
        >
          Consultar disponibilidad
        </button>
      )}

      <p className="text-text-muted text-xs mt-4">
        Sin compromiso. Responderemos en menos de 24 horas.
      </p>
    </div>
  );
}
