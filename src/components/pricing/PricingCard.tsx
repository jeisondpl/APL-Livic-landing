/**
 * PricingCard.tsx
 *
 * Card individual de un tier. Server Component (sin state).
 * Recibe el tier completo + WhatsApp URL ya construida.
 * El tier marcado como `recomendado: true` recibe tratamiento visual destacado
 * (border + badge + scale + sombra más fuerte).
 */

import type { PricingTier } from "@/data/pricing-content";
import { Check } from "lucide-react";

/** Map de acento → clases Tailwind para texto/bg/border. */
const ACENTO = {
  green: {
    text: "text-livic-green",
    bg: "bg-livic-green",
    bgSoft: "bg-livic-green/10",
    border: "border-livic-green",
    gradient: "from-livic-green to-livic-purple",
  },
  pink: {
    text: "text-livic-pink",
    bg: "bg-livic-pink",
    bgSoft: "bg-livic-pink/10",
    border: "border-livic-pink",
    gradient: "from-livic-pink to-livic-purple",
  },
  purple: {
    text: "text-livic-purple",
    bg: "bg-livic-purple",
    bgSoft: "bg-livic-purple/10",
    border: "border-livic-purple",
    gradient: "from-livic-purple to-livic-pink",
  },
} as const;

interface Props {
  tier: PricingTier;
  whatsappUrl: string;
}

export default function PricingCard({ tier, whatsappUrl }: Props) {
  const acento = ACENTO[tier.acento];
  const isRecomendado = tier.recomendado;
  // Valores largos como "Desde $200.000" no caben en text-5xl: usar tamaño
  // adaptativo según largo del string para que SIEMPRE entre en una línea.
  const valorLargo = tier.destacado.valor.length > 6;
  const valorSizeClasses = valorLargo
    ? "text-2xl sm:text-3xl md:text-[2rem]"
    : "text-4xl md:text-5xl";

  return (
    <div
      className={[
        "relative flex flex-col bg-white rounded-3xl p-7 md:p-8 transition-all duration-300 text-center",
        isRecomendado
          ? `border-2 ${acento.border} shadow-2xl shadow-livic-pink/15 md:scale-[1.02] z-10`
          : "border border-gray-200 hover:border-gray-300 hover:shadow-xl",
      ].join(" ")}
    >
      {/* Badge "Recomendado" — solo en el tier destacado */}
      {isRecomendado && (
        <span
          className={`absolute -top-3.5 left-1/2 -translate-x-1/2 ${acento.bg} text-white text-[11px] font-bold tracking-widest uppercase px-4 py-1.5 rounded-full shadow-lg whitespace-nowrap`}
        >
          ★ Más recomendado
        </span>
      )}

      {/* Número de tier */}
      <span
        className={`text-xs font-bold tracking-[0.2em] uppercase ${acento.text} mb-2`}
      >
        Tier {tier.numero}
      </span>

      {/* Nombre del servicio */}
      <h3 className="text-2xl md:text-[1.65rem] font-black text-livic-black leading-tight min-h-[3.5rem] flex items-center justify-center">
        {tier.nombre}
      </h3>

      {/* Ideal para */}
      <p className="mt-3 text-sm text-text-muted leading-relaxed min-h-[5rem]">
        {tier.ideal}
      </p>

      {/* Valor destacado (precio / comisión) — todo centrado */}
      <div
        className={`mt-6 p-5 md:p-6 rounded-2xl ${acento.bgSoft} border ${acento.border}/30 flex flex-col items-center justify-center min-h-[10rem]`}
      >
        <p className="text-[11px] font-semibold text-text-muted uppercase tracking-wider mb-2 leading-tight">
          {tier.destacado.label}
        </p>
        <p
          className={`${valorSizeClasses} font-black leading-none bg-gradient-to-br ${acento.gradient} bg-clip-text text-transparent whitespace-nowrap`}
        >
          {tier.destacado.valor}
        </p>
        {tier.destacado.sufijo && (
          <p className="mt-3 text-xs text-text-muted italic leading-snug px-2">
            {tier.destacado.sufijo}
          </p>
        )}
      </div>

      {/* Features con checkmark — lista alineada a la izquierda dentro de la card centrada */}
      <ul className="mt-6 space-y-3 flex-1 text-left">
        {tier.features.map((feature) => (
          <li
            key={feature}
            className="flex items-start gap-2.5 text-sm text-livic-black leading-relaxed"
          >
            <span
              className={`flex-shrink-0 mt-0.5 w-5 h-5 rounded-full ${acento.bgSoft} flex items-center justify-center`}
              aria-hidden
            >
              <Check className={`w-3 h-3 ${acento.text}`} strokeWidth={3} />
            </span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {/* Extras condicionales — tabla de modalidades A/B o fees (left-aligned para legibilidad) */}
      {tier.extras?.kind === "tabla-modalidades" && (
        <div className="mt-6 pt-6 border-t border-gray-100 text-left">
          <p className="text-xs font-semibold text-livic-black uppercase tracking-wider mb-3 text-center">
            {tier.extras.titulo}
          </p>
          <div className="space-y-2.5">
            {tier.extras.rows.map((row) => (
              <div
                key={row.modalidad}
                className="flex justify-between items-baseline gap-3 text-xs"
              >
                <span className="text-text-muted leading-snug flex-1">{row.modalidad}</span>
                <span className={`${acento.text} font-bold tabular-nums whitespace-nowrap`}>
                  {row.valor}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-3 space-y-2">
            {tier.extras.notas.map((nota) => (
              <p
                key={nota.slice(0, 30)}
                className="text-[11px] text-text-muted italic leading-relaxed flex gap-1.5"
              >
                <span aria-hidden>📌</span>
                <span>{nota}</span>
              </p>
            ))}
          </div>
        </div>
      )}

      {tier.extras?.kind === "tabla-fees" && (
        <div className="mt-6 pt-6 border-t border-gray-100 text-left">
          <p className="text-xs font-semibold text-livic-black uppercase tracking-wider mb-3 text-center">
            {tier.extras.titulo}
          </p>
          <div className="space-y-2.5">
            {tier.extras.rows.map((row) => (
              <div
                key={row.tipo}
                className="flex justify-between items-baseline gap-3 text-xs"
              >
                <span className="text-text-muted leading-snug flex-1">{row.tipo}</span>
                <span className={`${acento.text} font-bold tabular-nums whitespace-nowrap`}>
                  {row.valor}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-3 text-[11px] text-text-muted italic leading-relaxed flex gap-1.5">
            <span aria-hidden>📌</span>
            <span>{tier.extras.nota}</span>
          </p>
        </div>
      )}

      {tier.extras?.kind === "sin-fee" && (
        <div className={`mt-6 pt-6 border-t border-gray-100 text-left`}>
          <p className="text-[11px] text-text-muted italic leading-relaxed flex gap-1.5">
            <span aria-hidden>📌</span>
            <span>{tier.extras.mensaje}</span>
          </p>
        </div>
      )}

      {/* CTA */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`mt-7 inline-flex items-center justify-center gap-2 w-full px-6 py-3 rounded-xl font-bold text-sm transition-all ${
          isRecomendado
            ? `${acento.bg} text-white shadow-lg shadow-${tier.acento === "pink" ? "livic-pink" : tier.acento === "green" ? "livic-green" : "livic-purple"}/30 hover:opacity-90`
            : `${acento.bgSoft} ${acento.text} hover:${acento.bg} hover:text-white border ${acento.border}/30 hover:border-transparent`
        }`}
      >
        {tier.cta.label}
      </a>
    </div>
  );
}
