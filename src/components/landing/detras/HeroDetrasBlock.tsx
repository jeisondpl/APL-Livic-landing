/**
 * HeroDetrasBlock.tsx
 *
 * Bloque 1 de "Detrás de Livic" — introduce a Lina con foto + título.
 * Grid 2-cols en md+, stack en mobile. Blob pink decorativo detrás de la foto.
 * Server Component (sin state).
 */

import Image from "next/image";
import { DETRAS_CONTENT } from "@/data/detras-content";

const { hero } = DETRAS_CONTENT;

export default function HeroDetrasBlock() {
  return (
    <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-center">
      {/* ─── Foto Lina + caption + blob decorativo ─── */}
      <figure className="relative order-1 md:order-1 m-0">
        {/* Blob decorativo detrás de la foto */}
        <div
          aria-hidden
          className="absolute -inset-6 rounded-[2.5rem] bg-livic-pink/25 blur-3xl bubble-drift-2"
        />
        <div
          aria-hidden
          className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-livic-yellow/40 blur-2xl bubble-drift-4"
        />

        {/* Foto */}
        <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-xl border border-white/60">
          <Image
            src={hero.foto.src}
            alt={hero.foto.alt}
            fill
            sizes="(min-width: 768px) 45vw, 100vw"
            className="object-cover"
          />
          {/* Overlay sutil para legibilidad si hubiera texto encima en el futuro */}
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-livic-black/10 via-transparent to-transparent"
          />
        </div>

        {/* Caption: nombre + rol debajo de la foto */}
        <figcaption className="relative mt-5 text-center">
          <p className="text-lg md:text-xl font-bold text-livic-black tracking-tight">
            {hero.persona.nombre}
          </p>
          <p className="mt-1 text-xs md:text-sm font-semibold tracking-[0.2em] uppercase text-livic-purple">
            {hero.persona.rol}
          </p>
          <div
            aria-hidden
            className="mt-3 h-px w-12 bg-gradient-to-r from-transparent via-livic-pink to-transparent mx-auto"
          />
        </figcaption>
      </figure>

      {/* ─── Copy ─── */}
      <div className="space-y-5 order-2 md:order-2">
        <span className="inline-flex items-center gap-2 px-3 py-1 text-[11px] font-semibold tracking-[0.2em] uppercase text-livic-purple bg-livic-purple/10 rounded-full border border-livic-purple/20">
          <span className="w-1.5 h-1.5 rounded-full bg-livic-purple" />
          {hero.etiqueta}
        </span>

        <h3 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight text-livic-black">
          {hero.titulo}{" "}
          <span className="bg-gradient-to-r from-livic-pink to-livic-purple bg-clip-text text-transparent">
            {hero.tituloHighlight}
          </span>
        </h3>

        <p className="text-lg md:text-xl text-text-muted leading-relaxed">
          {hero.subtitulo}
        </p>

        {/* Línea decorativa */}
        <div className="flex items-center gap-3 pt-2">
          <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-livic-pink to-transparent" />
          <span className="text-xs text-text-muted tracking-widest uppercase">Santa Marta · Colombia</span>
        </div>
      </div>
    </div>
  );
}
