/**
 * /pricing — "Pricing & Plan" de Livic
 *
 * 3 modalidades de servicio en cards horizontales + tabla de servicios
 * complementarios. Conserva Nav + Footer del sitio.
 */

import type { Metadata } from "next";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import Section from "@/components/shared/Section";
import PricingTiersBlock from "@/components/pricing/PricingTiersBlock";
import ComplementaryServicesBlock from "@/components/pricing/ComplementaryServicesBlock";
import { PRICING_CONTENT } from "@/data/pricing-content";

export const metadata: Metadata = {
  title: "Pricing & Plan — Modalidades de Servicio Livic",
  description:
    "Conoce las modalidades de servicio de Livic: comercialización, administración y servicio integral. Cada plan se adapta al nivel de acompañamiento que necesitas para tu propiedad en Santa Marta.",
  openGraph: {
    title: "Pricing & Plan — Modalidades de Servicio Livic",
    description:
      "Elige el plan que mejor se ajusta a tu propiedad: comercialización 10%, administración mensual o servicio integral 15%.",
  },
};

const { hero } = PRICING_CONTENT;

export default function PricingPage() {
  return (
    <>
      <Nav />

      <main className="min-h-screen pt-20 md:pt-24 pb-16 md:pb-24">
        {/* ─── Hero ─── */}
        <Section
          id="pricing"
          etiqueta={hero.etiqueta}
          titulo={hero.titulo}
          subtitulo={hero.subtitulo}
          acento="purple"
          centrado
          className="pt-10 md:pt-12 pb-4 relative overflow-hidden"
        >
          {/* Blobs decorativos sutiles */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 -right-24 w-[26rem] h-[26rem] rounded-full bg-livic-purple/8 blur-3xl bubble-drift-2"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-24 -left-24 w-[22rem] h-[22rem] rounded-full bg-livic-pink/8 blur-3xl bubble-drift-4"
          />

          {/* Intro */}
          <p className="text-base md:text-lg text-livic-black leading-relaxed max-w-3xl mx-auto text-center relative">
            {hero.intro}
          </p>
        </Section>

        {/* ─── Tiers ─── */}
        <section className="w-full max-w-6xl mx-auto px-6 md:px-12 xl:px-16 pt-6 md:pt-8">
          <PricingTiersBlock />
        </section>

        {/* ─── Servicios complementarios ─── */}
        <section className="w-full max-w-6xl mx-auto px-6 md:px-12 xl:px-16 mt-20 md:mt-24">
          <ComplementaryServicesBlock />
        </section>
      </main>

      <Footer />
    </>
  );
}
