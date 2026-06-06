/**
 * /propuesta-pms — Propuesta comercial pública de APL Livic PMS
 *
 * Página de venta pensada para administradores de apartamentos turísticos,
 * apartahoteles boutique y dueños-operadores. Sigue el patrón visual del
 * resto del sitio (Nav + Footer + Section) con la paleta de marca LIVIC.
 *
 * Reglas duras del contenido (ver propuesta-pms-content.ts):
 *  - Solo features reales del PMS — no inventar capacidades.
 *  - Transparencia explícita sobre lo que el producto NO hace.
 *  - CTAs principales apuntan a WhatsApp con mensaje pre-relleno.
 */

import type { Metadata } from "next";
import Image from "next/image";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import Section from "@/components/shared/Section";
import { CONFIG } from "@/data/config";
import { getWhatsAppLink } from "@/lib/utils";
import { PROPUESTA_PMS_CONTENT, type AcentoPmsTier, type PmsTier } from "@/data/propuesta-pms-content";
import {
  AppWindow,
  Award,
  BadgeCheck,
  BellRing,
  Building2,
  CalendarCheck,
  CalendarDays,
  ChartNoAxesColumn,
  Check,
  ClipboardCheck,
  ArrowRight,
  ChevronRight,
  Hotel,
  MessageCircle,
  MessageSquareQuote,
  PackageOpen,
  Pin,
  RefreshCw,
  ShieldCheck,
  Sparkle,
  Sparkles,
  Tags,
  UsersRound,
  X as XIcon,
  type LucideIcon,
} from "lucide-react";

export const metadata: Metadata = {
  title: "APL Livic PMS — Propuesta para operadores hoteleros | LIVIC",
  description:
    "Plataforma operativa para administradoras de renta corta, apartahoteles boutique y dueños-operadores. Panel de propietario, sincronización con Airbnb y trazabilidad operativa. Diseñada en LATAM, para LATAM.",
  keywords: [
    "PMS hotelero",
    "Property Management System",
    "renta corta",
    "apartahotel",
    "Airbnb sync",
    "panel propietario",
    "LIVIC",
    "Santa Marta",
    "hospitality LATAM",
  ],
  openGraph: {
    title: "APL Livic PMS — Propuesta comercial",
    description:
      "Reservas, propietarios, calendario, Airbnb sync y trazabilidad operativa en una sola plataforma. Diseñada en LATAM, para LATAM.",
  },
};

/** Map de acento → clases Tailwind. Igual patrón que PricingCard. */
const ACENTO = {
  green: {
    text: "text-livic-green",
    bg: "bg-livic-green",
    bgSoft: "bg-livic-green/10",
    border: "border-livic-green",
    gradient: "from-livic-green to-livic-purple",
    shadow: "shadow-livic-green/30",
  },
  pink: {
    text: "text-livic-pink",
    bg: "bg-livic-pink",
    bgSoft: "bg-livic-pink/10",
    border: "border-livic-pink",
    gradient: "from-livic-pink to-livic-purple",
    shadow: "shadow-livic-pink/30",
  },
  purple: {
    text: "text-livic-purple",
    bg: "bg-livic-purple",
    bgSoft: "bg-livic-purple/10",
    border: "border-livic-purple",
    gradient: "from-livic-purple to-livic-pink",
    shadow: "shadow-livic-purple/30",
  },
  yellow: {
    text: "text-livic-yellow",
    bg: "bg-livic-yellow",
    bgSoft: "bg-livic-yellow/10",
    border: "border-livic-yellow",
    gradient: "from-livic-yellow to-livic-pink",
    shadow: "shadow-livic-yellow/30",
  },
} as const satisfies Record<AcentoPmsTier, unknown>;

const MODULO_ICONS: Record<string, LucideIcon> = {
  Apartamentos: Building2,
  Edificios: Hotel,
  Propietarios: UsersRound,
  Reservas: CalendarCheck,
  "Calendario avanzado": CalendarDays,
  "Sincronización Airbnb": RefreshCw,
  Cotizador: MessageSquareQuote,
  "Actividades operativas": ClipboardCheck,
  "Tipos de actividades": Tags,
  Inventario: PackageOpen,
  Amenidades: Sparkle,
  Notificaciones: BellRing,
  "Multi-rol": ShieldCheck,
  Dashboard: ChartNoAxesColumn,
};

export default function PropuestaPmsPage() {
  const c = PROPUESTA_PMS_CONTENT;
  const whatsappHero = getWhatsAppLink(
    CONFIG.contact.whatsapp.number,
    c.hero.cta1.whatsappMessage,
  );
  const whatsappFinal = getWhatsAppLink(
    CONFIG.contact.whatsapp.number,
    c.cta.whatsappMessage,
  );

  return (
    <>
      <Nav />

      <main className="min-h-screen pt-20 md:pt-24 pb-16 md:pb-24">
        {/* ════════════════════════════════════════════════
            HERO
        ════════════════════════════════════════════════ */}
        <Section
          id="propuesta-hero"
          etiqueta={c.hero.etiqueta}
          titulo={c.hero.titulo}
          subtitulo={c.hero.subtitulo}
          acento="pink"
          centrado
          className="pt-10 md:pt-12 pb-4 relative overflow-hidden"
        >
          {/* Blobs decorativos */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 -right-24 w-[26rem] h-[26rem] rounded-full bg-livic-pink/8 blur-3xl bubble-drift-2"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-24 -left-24 w-[22rem] h-[22rem] rounded-full bg-livic-purple/8 blur-3xl bubble-drift-4"
          />

          {/* CTAs hero */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8 relative">
            <a
              href={whatsappHero}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-livic-green text-white hover:bg-livic-green/90 shadow-lg shadow-livic-green/25 transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              {c.hero.cta1.label}
            </a>
            <a
              href={c.hero.cta2.anchor}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-livic-pink/10 text-livic-pink hover:bg-livic-pink hover:text-white border border-livic-pink/30 hover:border-transparent transition-all"
            >
              {c.hero.cta2.label}
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </Section>

        {/* ════════════════════════════════════════════════
            PROBLEMA — síntomas en grid
        ════════════════════════════════════════════════ */}
        <Section
          id="problema"
          etiqueta={c.problema.etiqueta}
          titulo={c.problema.titulo}
          subtitulo={c.problema.subtitulo}
          acento="pink"
          centrado
          className="mt-8 md:mt-12"
        >
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 mt-4">
            {c.problema.sintomas.map((sintoma) => (
              <div
                key={sintoma.titulo}
                className="relative bg-white rounded-2xl p-5 md:p-6 border border-gray-100 hover:border-livic-pink/30 hover:shadow-lg transition-all"
              >
                <div className="flex items-start gap-3">
                  <span
                    className="flex-shrink-0 w-8 h-8 rounded-lg bg-livic-pink/10 flex items-center justify-center"
                    aria-hidden
                  >
                    <XIcon className="w-4 h-4 text-livic-pink" strokeWidth={3} />
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-livic-black leading-tight mb-2">
                      {sintoma.titulo}
                    </h3>
                    <p className="text-sm text-text-muted leading-relaxed">
                      {sintoma.descripcion}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ════════════════════════════════════════════════
            SOLUCIÓN — qué es Livic PMS
        ════════════════════════════════════════════════ */}
        <Section
          id="solucion"
          etiqueta={c.solucion.etiqueta}
          titulo={c.solucion.titulo}
          subtitulo={c.solucion.subtitulo}
          acento="green"
          centrado
        >
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-base md:text-lg text-livic-black leading-relaxed">
              {c.solucion.intro}
            </p>
          </div>

          {/* Screenshots del producto — par lado a lado debajo del intro de la solución */}
          <div className="mt-10 md:mt-14 max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-5 md:gap-6">
              <div className="relative rounded-2xl overflow-hidden border border-gray-200 shadow-xl shadow-livic-purple/15 bg-white">
                <Image
                  src="/pms.png"
                  alt="Vista del panel de APL Livic PMS — operación real de apartamentos"
                  width={1913}
                  height={910}
                  sizes="(min-width: 768px) 36rem, 100vw"
                  className="w-full h-auto"
                />
              </div>
              <div className="relative rounded-2xl overflow-hidden border border-gray-200 shadow-xl shadow-livic-purple/15 bg-white">
                <Image
                  src="/board.png"
                  alt="Vista del calendario operativo de APL Livic PMS"
                  width={1893}
                  height={849}
                  sizes="(min-width: 768px) 36rem, 100vw"
                  className="w-full h-auto"
                />
              </div>
            </div>
            <p className="mt-4 text-center text-xs text-text-muted italic">
              Vistas reales del PMS en operación
            </p>
          </div>
        </Section>

        {/* ════════════════════════════════════════════════
            DIFERENCIADORES — 3 cards destacadas
        ════════════════════════════════════════════════ */}
        <Section
          id="diferenciadores"
          etiqueta="Por qué Livic"
          titulo="Tres diferenciadores que cambian tu operación"
          subtitulo="Lo que hace que un operador firme con nosotros y no con un PMS empacado internacional."
          acento="purple"
          centrado
        >
          <div className="grid md:grid-cols-3 gap-6 md:gap-7 lg:gap-8 items-stretch pt-2">
            {c.diferenciadores.map((diff) => {
              const a = ACENTO[diff.acento];
              return (
                <div
                  key={diff.numero}
                  className={`relative flex flex-col bg-white rounded-3xl p-7 md:p-8 border ${a.border}/30 hover:border-2 hover:${a.border} hover:shadow-2xl ${a.shadow} transition-all`}
                >
                  <span
                    className={`text-xs font-bold tracking-[0.2em] uppercase ${a.text} mb-2`}
                  >
                    Diferenciador {diff.numero}
                  </span>

                  <h3 className="text-xl md:text-2xl font-black text-livic-black leading-tight mb-3">
                    {diff.titulo}
                  </h3>

                  <p
                    className={`text-sm font-semibold ${a.text} italic leading-relaxed mb-5`}
                  >
                    {diff.promesa}
                  </p>

                  <ul className="space-y-3 flex-1">
                    {diff.detalle.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-sm text-livic-black leading-relaxed"
                      >
                        <span
                          className={`flex-shrink-0 mt-0.5 w-5 h-5 rounded-full ${a.bgSoft} flex items-center justify-center`}
                          aria-hidden
                        >
                          <Check className={`w-3 h-3 ${a.text}`} strokeWidth={3} />
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div
                    className={`mt-6 pt-5 border-t border-gray-100 flex items-start gap-2`}
                  >
                    <Sparkles
                      className={`w-4 h-4 ${a.text} flex-shrink-0 mt-0.5`}
                      aria-hidden
                    />
                    <p
                      className={`text-xs font-bold ${a.text} uppercase tracking-wider leading-snug`}
                    >
                      {diff.resultado}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Section>

        {/* ════════════════════════════════════════════════
            MÓDULOS — grid de 14 items
        ════════════════════════════════════════════════ */}
        <Section
          id="modulos"
          etiqueta={c.modulos.etiqueta}
          titulo={c.modulos.titulo}
          subtitulo={c.modulos.subtitulo}
          acento="yellow"
          centrado
        >
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-2">
            {c.modulos.items.map((modulo) => {
              const ModuloIcon = MODULO_ICONS[modulo.nombre] ?? AppWindow;

              return (
                <div
                  key={modulo.nombre}
                  className="bg-white rounded-2xl p-5 border border-gray-100 hover:border-livic-yellow/40 hover:shadow-md transition-all"
                >
                  <span
                    className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-livic-yellow/10 text-livic-yellow"
                    aria-hidden
                  >
                    <ModuloIcon className="h-5 w-5" strokeWidth={2.5} />
                  </span>
                  <h3 className="text-sm font-bold text-livic-black mb-1.5 leading-tight">
                    {modulo.nombre}
                  </h3>
                  <p className="text-xs text-text-muted leading-relaxed">
                    {modulo.descripcion}
                  </p>
                </div>
              );
            })}
          </div>
        </Section>

        {/* ════════════════════════════════════════════════
            CASOS REALES
        ════════════════════════════════════════════════ */}
        <Section
          id="casos"
          etiqueta={c.casos.etiqueta}
          titulo={c.casos.titulo}
          subtitulo={c.casos.subtitulo}
          acento="green"
          centrado
        >
          <div className="grid md:grid-cols-3 gap-6 mt-2">
            {c.casos.items.map((caso) => (
              <div
                key={caso.segmento}
                className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all"
              >
                <p className="text-xs font-bold tracking-wider uppercase text-livic-green mb-1">
                  {caso.segmento}
                </p>
                <p className="text-xs text-text-muted italic mb-4">{caso.contexto}</p>

                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-livic-pink mb-1">
                      Antes
                    </p>
                    <p className="text-livic-black leading-snug">{caso.antes}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-livic-green mb-1">
                      Después
                    </p>
                    <p className="text-livic-black leading-snug">{caso.despues}</p>
                  </div>
                  <div className="pt-3 border-t border-gray-100">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-livic-purple mb-1">
                      Ganancia
                    </p>
                    <p className="text-livic-black font-semibold leading-snug">
                      {caso.ganancia}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ════════════════════════════════════════════════
            ROI — tabla por tamaño de operación
        ════════════════════════════════════════════════ */}
        <Section
          id="roi"
          etiqueta={c.roi.etiqueta}
          titulo={c.roi.titulo}
          subtitulo={c.roi.subtitulo}
          acento="purple"
          centrado
        >
          <div className="overflow-x-auto rounded-2xl border border-gray-100 bg-white">
            <table className="w-full text-sm">
              <thead className="bg-livic-purple/5">
                <tr>
                  {c.roi.headers.map((h) => (
                    <th
                      key={h}
                      className="text-left px-4 md:px-6 py-4 text-xs font-bold uppercase tracking-wider text-livic-purple"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {c.roi.rows.map((row, idx) => (
                  <tr
                    key={row.perfil}
                    className={idx % 2 === 0 ? "bg-white" : "bg-gray-50/50"}
                  >
                    <td className="px-4 md:px-6 py-4 font-bold text-livic-black">
                      {row.perfil}
                    </td>
                    <td className="px-4 md:px-6 py-4 text-livic-black tabular-nums">
                      {row.horas}
                    </td>
                    <td className="px-4 md:px-6 py-4 text-livic-black tabular-nums">
                      {row.overbookings}
                    </td>
                    <td className="px-4 md:px-6 py-4 text-livic-black tabular-nums">
                      {row.retencion}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 space-y-2 max-w-3xl mx-auto">
            {c.roi.notas.map((nota) => (
              <p
                key={nota.slice(0, 20)}
                className="text-xs text-text-muted italic flex gap-1.5 leading-relaxed"
              >
                <Pin
                  className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-livic-purple"
                  aria-hidden
                />
                <span>{nota}</span>
              </p>
            ))}
          </div>
        </Section>

        {/* ════════════════════════════════════════════════
            INVERSIÓN — 4 tiers
        ════════════════════════════════════════════════ */}
        <Section
          id="planes"
          etiqueta="Inversión"
          titulo="4 planes según tamaño de operación"
          subtitulo="Precios de lanzamiento 2026. Sin permanencia mínima. 14 días de prueba. El precio se calcula por apartamento activo, con mínimo mensual por plan."
          acento="pink"
          centrado
        >
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5 md:gap-6 items-stretch pt-2">
            {c.tiers.map((tier) => (
              <TierCard key={tier.id} tier={tier} />
            ))}
          </div>

          <p className="mt-8 text-center text-xs text-text-muted italic max-w-2xl mx-auto">
            Los mínimos mensuales garantizan soporte, estabilidad y acompañamiento.
            La implementación inicial se cotiza según volumen real, carga de datos e
            integraciones requeridas.
          </p>
        </Section>

        {/* ════════════════════════════════════════════════
            LO QUE NO INCLUYE — transparencia
        ════════════════════════════════════════════════ */}
        <Section
          id="no-incluye"
          etiqueta={c.noIncluye.etiqueta}
          titulo={c.noIncluye.titulo}
          subtitulo={c.noIncluye.subtitulo}
          acento="yellow"
          centrado
        >
          <div className="bg-livic-yellow/5 border border-livic-yellow/30 rounded-2xl p-6 md:p-8 max-w-3xl mx-auto">
            <ul className="space-y-3">
              {c.noIncluye.items.map((item) => (
                <li
                  key={item.slice(0, 30)}
                  className="flex items-start gap-3 text-sm text-livic-black leading-relaxed"
                >
                  <span
                    className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full bg-livic-yellow/20 flex items-center justify-center"
                    aria-hidden
                  >
                    <XIcon className="w-3 h-3 text-livic-yellow" strokeWidth={3} />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <p className="mt-6 pt-6 border-t border-livic-yellow/20 text-sm text-livic-black italic leading-relaxed">
              {c.noIncluye.cierre}
            </p>
          </div>
        </Section>

        {/* ════════════════════════════════════════════════
            IMPLEMENTACIÓN — timeline
        ════════════════════════════════════════════════ */}
        <Section
          id="implementacion"
          etiqueta={c.implementacion.etiqueta}
          titulo={c.implementacion.titulo}
          subtitulo={c.implementacion.subtitulo}
          acento="green"
          centrado
        >
          <div className="space-y-3 max-w-3xl mx-auto">
            {c.implementacion.pasos.map((paso, idx) => (
              <div
                key={paso.semana}
                className="flex gap-4 bg-white rounded-2xl p-5 md:p-6 border border-gray-100 hover:border-livic-green/30 transition-all"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-livic-green text-white font-bold flex items-center justify-center text-sm tabular-nums">
                  {idx + 1}
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-baseline gap-3 mb-1">
                    <h3 className="text-base font-bold text-livic-black">
                      {paso.titulo}
                    </h3>
                    <span className="text-xs font-bold uppercase tracking-wider text-livic-green">
                      {paso.semana}
                    </span>
                  </div>
                  <p className="text-sm text-text-muted leading-relaxed">
                    {paso.detalle}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-6 flex items-start justify-center gap-1.5 text-center text-xs font-semibold text-livic-green max-w-2xl mx-auto">
            <BadgeCheck
              className="mt-0.5 h-3.5 w-3.5 flex-shrink-0"
              aria-hidden
            />
            <span>{c.implementacion.soporte}</span>
          </p>
        </Section>

        {/* ════════════════════════════════════════════════
            CTA FINAL
        ════════════════════════════════════════════════ */}
        <section className="w-full max-w-5xl mx-auto px-6 md:px-12 xl:px-16 mt-12 md:mt-16">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-livic-pink via-livic-purple to-livic-green p-8 md:p-12 text-center text-white">
            {/* Blobs decorativos */}
            <div
              aria-hidden
              className="pointer-events-none absolute -top-16 -right-16 w-48 h-48 rounded-full bg-white/10 blur-3xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-white/10 blur-3xl"
            />

            <div className="relative">
              <h2 className="text-2xl md:text-4xl font-black leading-tight mb-3">
                {c.cta.titulo}
              </h2>
              <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto leading-relaxed mb-8">
                {c.cta.subtitulo}
              </p>

              <ol className="text-left max-w-xl mx-auto space-y-2 mb-8">
                {c.cta.pasos.map((paso, idx) => (
                  <li
                    key={paso.slice(0, 20)}
                    className="flex items-start gap-3 text-sm md:text-base text-white/95"
                  >
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-white/20 text-white text-xs font-bold flex items-center justify-center mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{paso}</span>
                  </li>
                ))}
              </ol>

              <a
                href={whatsappFinal}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-base bg-white text-livic-pink hover:bg-white/95 shadow-2xl transition-all"
              >
                <MessageCircle className="w-5 h-5" />
                Agendar llamada por WhatsApp
                <ArrowRight className="w-4 h-4" />
              </a>

              <p className="mt-5 text-xs text-white/70">
                Tu data es tuya. Sin permanencia. Sin rehén.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

// ════════════════════════════════════════════════
// Sub-componente local: card de tier de inversión
// ════════════════════════════════════════════════

function TierCard({ tier }: { tier: PmsTier }) {
  const a = ACENTO[tier.acento];
  const whatsappUrl = getWhatsAppLink(
    CONFIG.contact.whatsapp.number,
    tier.ctaWhatsappMessage,
  );
  const isRecomendado = tier.recomendado;
  // Todos los valores de precioMensual están en formato corto ("$29.000").
  // Tamaño único responsive que entra bien en cualquier ancho de card.
  const valorSizeClasses = "text-3xl md:text-4xl";

  return (
    <div
      className={[
        "relative flex flex-col bg-white rounded-3xl p-6 md:p-7 transition-all duration-300 text-center",
        isRecomendado
          ? `border-2 ${a.border} shadow-2xl ${a.shadow} md:scale-[1.02] z-10`
          : "border border-gray-200 hover:border-gray-300 hover:shadow-xl",
      ].join(" ")}
    >
      {isRecomendado && (
        <span
          className={`absolute -top-3.5 left-1/2 -translate-x-1/2 ${a.bg} text-white text-[11px] font-bold tracking-widest uppercase px-4 py-1.5 rounded-full shadow-lg whitespace-nowrap inline-flex items-center gap-1.5`}
        >
          <Award className="h-3.5 w-3.5" aria-hidden />
          Recomendado
        </span>
      )}

      <span className={`text-xs font-bold tracking-[0.2em] uppercase ${a.text} mb-2`}>
        Plan {tier.numero}
      </span>

      <h3 className="text-xl md:text-2xl font-black text-livic-black leading-tight min-h-[3rem] flex items-center justify-center">
        {tier.nombre}
      </h3>

      <p className="mt-3 text-xs text-text-muted leading-relaxed min-h-[5.5rem]">
        {tier.ideal}
      </p>

      <div
        className={`mt-5 p-4 md:p-5 rounded-2xl ${a.bgSoft} border ${a.border}/30 flex flex-col items-center justify-center min-h-[8.5rem]`}
      >
        <p className="text-[11px] font-semibold text-text-muted uppercase tracking-wider mb-2 leading-tight">
          Mensual por apartamento
        </p>
        <p
          className={`${valorSizeClasses} font-black leading-none bg-gradient-to-br ${a.gradient} bg-clip-text text-transparent whitespace-nowrap`}
        >
          {tier.precioMensual}
        </p>
        <p className="mt-2 text-[11px] text-text-muted leading-snug">
          {tier.precioMensualSufijo}
        </p>
        <p className={`mt-3 text-[11px] font-bold ${a.text} uppercase tracking-wider`}>
          {tier.setup}
        </p>
      </div>

      <ul className="mt-5 space-y-2.5 flex-1 text-left">
        {tier.features.map((feature) => (
          <li
            key={feature}
            className="flex items-start gap-2 text-xs text-livic-black leading-relaxed"
          >
            <span
              className={`flex-shrink-0 mt-0.5 w-4 h-4 rounded-full ${a.bgSoft} flex items-center justify-center`}
              aria-hidden
            >
              <Check className={`w-2.5 h-2.5 ${a.text}`} strokeWidth={3} />
            </span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`mt-6 inline-flex items-center justify-center gap-2 w-full px-5 py-2.5 rounded-xl font-bold text-xs transition-all ${
          isRecomendado
            ? `${a.bg} text-white shadow-lg ${a.shadow} hover:opacity-90`
            : `${a.bgSoft} ${a.text} hover:${a.bg} hover:text-white border ${a.border}/30 hover:border-transparent`
        }`}
      >
        {tier.ctaLabel}
      </a>
    </div>
  );
}
