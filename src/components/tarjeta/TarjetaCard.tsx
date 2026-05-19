/**
 * TarjetaCard.tsx
 *
 * Tarjeta de bienvenida HORIZONTAL compartida por:
 *   - /tarjeta             (genérica, sin apartamento)
 *   - /tarjeta/[codigo]    (personalizada, ej: rmdll630)
 *
 * Layout asimétrico 42/58 con divisor curvo SVG entre paneles.
 * Server Component. QR pasado como SVG inline (generado por el caller).
 */

import Image from "next/image";
import Link from "next/link";
import { Instagram, MessageCircle, MapPin } from "lucide-react";
import { CONFIG } from "@/data/config";
import { getWhatsAppLink } from "@/lib/utils";
import type { ApartamentoTarjeta } from "@/lib/tarjeta-codigo";

/** TikTok no está en Lucide — SVG inline. */
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.1Z" />
    </svg>
  );
}

interface Props {
  /** SVG string del QR ya generado a build time por el caller. */
  qrSvg: string;
  /** Apartamento opcional. Si viene, personaliza el saludo. */
  apartamento?: ApartamentoTarjeta | null;
}

export default function TarjetaCard({ qrSvg, apartamento }: Props) {
  const whatsappMessage = apartamento
    ? `Hola Livic, estoy hospedado en el apartamento ${apartamento.edificio} ${apartamento.numero} y necesito asistencia.`
    : "Hola Livic, estoy hospedado en uno de sus apartamentos y necesito asistencia.";

  const whatsappUrl = getWhatsAppLink(CONFIG.contact.whatsapp.number, whatsappMessage);

  // Pre-título dinámico: con apto muestra el número, sin apto un texto genérico
  const preTitulo = apartamento
    ? `Apto ${apartamento.numero}`
    : "A tu estadía";

  return (
    <article
      className="
        group relative bg-white rounded-3xl overflow-hidden
        transition-all duration-300 ease-out
        shadow-[0_30px_60px_-12px_rgba(226,136,174,0.35),0_18px_36px_-12px_rgba(173,128,180,0.28),0_8px_16px_-4px_rgba(12,10,11,0.08),inset_0_1px_0_rgba(255,255,255,0.6)]
        hover:shadow-[0_40px_80px_-12px_rgba(226,136,174,0.45),0_24px_48px_-12px_rgba(173,128,180,0.35),0_12px_20px_-4px_rgba(12,10,11,0.12),inset_0_1px_0_rgba(255,255,255,0.7)]
        hover:-translate-y-1
        print:shadow-none print:rounded-none print:border print:border-gray-300 print:hover:translate-y-0
      "
    >
      {/* Glow base abajo de la tarjeta */}
      <span
        aria-hidden
        className="
          pointer-events-none absolute inset-x-12 -bottom-6 h-10
          bg-gradient-to-b from-livic-pink/30 to-transparent
          blur-2xl opacity-70 print:hidden
          transition-opacity duration-300
          group-hover:opacity-90
        "
      />

      <div className="grid grid-cols-1 md:grid-cols-[42%_58%] min-h-[420px] md:min-h-[480px]">

        {/* ════════════════════════════════════════════
            PANEL IZQUIERDO — Marca con gradient
        ════════════════════════════════════════════ */}
        <aside className="relative bg-gradient-to-br from-livic-pink via-livic-pink to-livic-purple text-white overflow-hidden flex flex-col justify-between p-7 md:p-9">

          {/* Stars decorativos */}
          <div aria-hidden className="absolute inset-0 opacity-20">
            <div className="absolute top-6 right-8 text-2xl">✦</div>
            <div className="absolute top-1/3 left-6 text-lg">✦</div>
            <div className="absolute bottom-1/4 right-12 text-xl">✦</div>
            <div className="absolute bottom-12 left-10 text-base">✦</div>
          </div>

          {/* Blobs interiores */}
          <div aria-hidden className="absolute -top-20 -right-20 w-56 h-56 rounded-full bg-livic-yellow/30 blur-3xl" />
          <div aria-hidden className="absolute -bottom-20 -left-20 w-48 h-48 rounded-full bg-livic-purple/40 blur-3xl" />

          {/* Header — logo */}
          <div className="relative">
            <Link href="/" className="inline-block hover:opacity-80 transition-opacity">
              <Image
                src="/logo-livic-white.png"
                alt="LIVIC"
                width={140}
                height={56}
                className="h-12 md:h-14 w-auto"
                priority
              />
            </Link>
          </div>

          {/* Centro — Bienvenidos + apartamento */}
          <div className="relative my-6 md:my-0">
            <p className="text-[11px] font-bold tracking-[0.3em] uppercase opacity-80 mb-3">
              {preTitulo}
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[0.9] italic tracking-tight drop-shadow-sm">
              Bien
              <br />
              venidos
            </h1>

            {/* Badge del apartamento — solo si viene apartamento */}
            {apartamento && (
              <div className="mt-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/30 text-white">
                <span className="w-1.5 h-1.5 rounded-full bg-livic-yellow flex-shrink-0" aria-hidden />
                <span className="text-xs font-bold tracking-wider">
                  {apartamento.edificio}{" "}
                  <span className="text-livic-yellow">· {apartamento.numero}</span>
                </span>
              </div>
            )}

            <div className="mt-4 flex items-center gap-3" aria-hidden>
              <div className="h-px w-16 bg-white/60" />
              <span className="text-livic-yellow text-xl drop-shadow">✦</span>
            </div>
          </div>

          {/* Footer del panel izquierdo */}
          <div className="relative space-y-2">
            <div className="flex items-center gap-2 text-xs opacity-90">
              <MapPin className="w-3.5 h-3.5" />
              <span className="tracking-wider uppercase font-semibold">Santa Marta · Colombia</span>
            </div>
            <p className="text-[11px] opacity-75 italic">
              Hospitalidad con atención real
            </p>
          </div>
        </aside>

        {/* ════════════════════════════════════════════
            DIVISOR CURVO ENTRE PANELES (solo md+)
        ════════════════════════════════════════════ */}
        <svg
          aria-hidden
          viewBox="0 0 40 480"
          preserveAspectRatio="none"
          className="hidden md:block absolute top-0 bottom-0 z-10 pointer-events-none"
          style={{ left: "42%", width: "40px", marginLeft: "-20px", height: "100%" }}
        >
          <path
            d="M 20,0 Q 0,120 20,240 Q 40,360 20,480 L 0,480 L 0,0 Z"
            fill="url(#leftGrad)"
          />
          <defs>
            <linearGradient id="leftGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#E288AE" />
              <stop offset="100%" stopColor="#AD80B4" />
            </linearGradient>
          </defs>
        </svg>

        {/* ════════════════════════════════════════════
            PANEL DERECHO — Mensaje + QR + redes
        ════════════════════════════════════════════ */}
        <section className="relative bg-white p-7 md:p-10 flex flex-col justify-between">

          {/* Glow decorativo */}
          <div
            aria-hidden
            className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full bg-gradient-to-tl from-livic-yellow/20 via-livic-pink/10 to-transparent blur-2xl pointer-events-none"
          />

          {/* Mensaje principal */}
          <div className="relative space-y-4 mb-6">
            <p className="text-[11px] font-bold tracking-[0.3em] uppercase text-livic-purple">
              Equipo Livic
            </p>

            {apartamento ? (
              <p className="text-lg md:text-xl text-livic-black leading-relaxed font-medium">
                Bienvenido al apartamento{" "}
                <span className="text-livic-pink font-bold">
                  {apartamento.edificio} {apartamento.numero}
                </span>
                . Gracias por elegirnos para tu estancia en{" "}
                <span className="text-livic-purple font-bold">Santa Marta</span>.
              </p>
            ) : (
              <p className="text-lg md:text-xl text-livic-black leading-relaxed font-medium">
                Gracias por elegirnos para tu estancia en{" "}
                <span className="text-livic-pink font-bold">Santa Marta</span>.
              </p>
            )}

            <p className="text-sm md:text-base text-livic-black/80 leading-relaxed">
              Esperamos que disfrutes de la comodidad de{" "}
              {apartamento ? "tu apartamento" : "nuestros apartamentos"}.
              Para cualquier necesidad,{" "}
              <span className="text-livic-purple font-bold">estamos aquí para ayudarte</span>.
            </p>

            {/* Cierre con firma */}
            <div className="pt-2">
              <p className="text-sm md:text-base text-livic-black">
                ¡Que tengas una excelente estadía! <span className="text-livic-yellow">💛</span>
              </p>
              <p className="mt-1 text-sm md:text-base font-bold italic bg-gradient-to-r from-livic-pink to-livic-purple bg-clip-text text-transparent">
                Cordialmente, el equipo de Livic
              </p>
            </div>
          </div>

          {/* Separador dashed */}
          <div className="relative border-t border-dashed border-livic-pink/30 my-4" />

          {/* QR + Redes (footer) */}
          <div className="relative grid grid-cols-[auto_1fr] gap-5 items-center">

            {/* QR */}
            <div className="flex flex-col items-center">
              <div
                className="w-[110px] h-[110px] rounded-xl border-2 border-livic-pink/25 bg-white p-1.5 shadow-md overflow-hidden [&_svg]:w-full [&_svg]:h-full [&_svg]:block"
                dangerouslySetInnerHTML={{ __html: qrSvg }}
              />
              <p className="mt-2 text-[9px] font-bold tracking-[0.18em] uppercase text-livic-pink text-center leading-tight">
                ¡Conéctate<br />con nosotros!
              </p>
            </div>

            {/* Redes */}
            <ul className="space-y-2">
              <li>
                <a
                  href={CONFIG.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2.5 text-sm text-livic-black hover:text-livic-pink transition-colors"
                >
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-livic-pink/10 text-livic-pink group-hover:bg-livic-pink group-hover:text-white transition-colors flex-shrink-0">
                    <Instagram className="w-3.5 h-3.5" />
                  </span>
                  <div className="leading-tight">
                    <span className="block text-[9px] font-bold tracking-widest uppercase text-text-muted">Instagram</span>
                    <span className="text-sm font-semibold">@livic.aptos</span>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href={CONFIG.social["tik-tok"]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2.5 text-sm text-livic-black hover:text-livic-purple transition-colors"
                >
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-livic-purple/10 text-livic-purple group-hover:bg-livic-purple group-hover:text-white transition-colors flex-shrink-0">
                    <TikTokIcon className="w-3.5 h-3.5" />
                  </span>
                  <div className="leading-tight">
                    <span className="block text-[9px] font-bold tracking-widest uppercase text-text-muted">TikTok</span>
                    <span className="text-sm font-semibold">@livic.aptos</span>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2.5 text-sm text-livic-black hover:text-livic-green transition-colors"
                >
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-livic-green/10 text-livic-green group-hover:bg-livic-green group-hover:text-white transition-colors flex-shrink-0">
                    <MessageCircle className="w-3.5 h-3.5" />
                  </span>
                  <div className="leading-tight">
                    <span className="block text-[9px] font-bold tracking-widest uppercase text-text-muted">WhatsApp 24/7</span>
                    <span className="text-sm font-semibold">Soporte inmediato</span>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </section>

      </div>
    </article>
  );
}
