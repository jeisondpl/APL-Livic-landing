/**
 * Homepage - Landing Page Principal de LIVIC
 * Operación turística, acompañamiento y cuidado de inmuebles
 */

import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import HeroLanding from "@/components/landing/HeroLanding";
import ServiciosSection from "@/components/landing/ServiciosSection";
import ValorDiferencialSection from "@/components/landing/ValorDiferencialSection";
import BeneficiosSection from "@/components/landing/BeneficiosSection";
import CTASection from "@/components/landing/CTASection";

export default function HomePage() {
  return (
    <>
      <Nav />

      <main className="min-h-screen">
        {/* Hero Principal */}
        <HeroLanding />

        {/* Servicios */}
        <ServiciosSection />

        {/* Valor Diferencial */}
        <ValorDiferencialSection />

        {/* Beneficios */}
        <BeneficiosSection />

        {/* CTA Final */}
        <CTASection />
      </main>

      <Footer />
    </>
  );
}
