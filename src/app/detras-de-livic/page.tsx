/**
 * /detras-de-livic — Página "Detrás de Livic"
 *
 * Storytelling de equipo + servicios + tarifas. Conserva Nav + Footer del sitio.
 * Contenido estático: Server Component.
 */

import type { Metadata } from "next";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import DetrasDeLivicSection from "@/components/landing/DetrasDeLivicSection";

export const metadata: Metadata = {
  title: "Detrás de Livic — Equipo, servicios y modalidades de administración",
  description:
    "Conoce a Lina Villalba y al equipo de Livic: hospitalidad real, recomendaciones para cuidar tu propiedad y modalidades transparentes de administración y comercialización en Santa Marta.",
  openGraph: {
    title: "Detrás de Livic — Cuidamos tu propiedad como propia",
    description:
      "Hospitalidad con atención real. Conoce el equipo, las modalidades y las tarifas de administración de Livic en Santa Marta.",
    images: ["/operadora.jpeg"],
  },
};

export default function DetrasDeLivicPage() {
  return (
    <>
      <Nav />

      <main className="min-h-screen pt-20 md:pt-24">
        <DetrasDeLivicSection />
      </main>

      <Footer />
    </>
  );
}
