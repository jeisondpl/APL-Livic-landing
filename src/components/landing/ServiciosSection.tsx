/**
 * ServiciosSection.tsx
 * Sección de 2 servicios principales de LIVIC
 */

import Section from "@/components/shared/Section";
import ServicioCard from "./ServicioCard";
import Button from "@/components/ui/Button";
import { LANDING_CONTENT } from "@/data/landing-content";
import { Search } from "lucide-react";

export default function ServiciosSection() {
  return (
    <Section
      id="servicios"
      titulo="Nuestros Servicios"
      subtitulo="Ofrecemos soluciones completas para la gestión y cuidado de tu propiedad"
      acento="pink"
      centrado
      className="py-20 md:py-24"
    >
      <div className="space-y-12 mt-12">
        {LANDING_CONTENT.servicios.map((servicio, index) => (
          <ServicioCard
            key={servicio.id}
            servicio={servicio}
            imagePosition={index % 2 === 0 ? "left" : "right"}
            index={index}
          />
        ))}
      </div>

      {/* CTA: Cotiza tu alojamiento → /catalogo */}
      <div className="mt-16 text-center">
        <Button href="/catalogo" variant="secondary" size="lg">
          <Search className="w-5 h-5" />
          Cotiza tu alojamiento
        </Button>
      </div>
    </Section>
  );
}
