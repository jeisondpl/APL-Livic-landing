/**
 * DetrasDeLivicSection.tsx
 *
 * Sección raíz "Detrás de Livic" — agrupa 4 bloques de storytelling:
 *   1. Hero con foto de Lina
 *   2. Manifiesto / historia
 *   3. Detalles que hacen la diferencia (11 recomendaciones)
 *   4. Modalidades de administración + tarifas
 *
 * Anchor: #detras  (Nav scrollea acá).
 * Acento: purple (livic-purple) — no usado en otras secciones landing.
 * Server Component.
 */

import Section from "@/components/shared/Section";
import HeroDetrasBlock from "./detras/HeroDetrasBlock";
import HistoriaLinaBlock from "./detras/HistoriaLinaBlock";
import DetallesQueImportanBlock from "./detras/DetallesQueImportanBlock";
// import ModalidadesBlock from "./detras/ModalidadesBlock"; // movido a /pricing

export default function DetrasDeLivicSection() {
  return (
    <Section
      id="detras"
      etiqueta="Equipo & Servicios"
      titulo="Detrás de Livic"
      subtitulo="La historia y las personas que cuidan tu propiedad como propia."
      acento="purple"
      centrado
      className="py-20 md:py-24 relative overflow-hidden"
    >
      {/* Blob decorativo de fondo (muy sutil) */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-32 w-[28rem] h-[28rem] rounded-full bg-livic-purple/8 blur-3xl bubble-drift-3"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 -left-32 w-[24rem] h-[24rem] rounded-full bg-livic-pink/8 blur-3xl bubble-drift-5"
      />

      {/* Bloques apilados con separación generosa */}
      <div className="relative space-y-24 md:space-y-28 mt-8">
        <HeroDetrasBlock />
        <HistoriaLinaBlock />
        <DetallesQueImportanBlock />
        {/* <ModalidadesBlock /> — movido a /pricing por requerimiento de Lina */}
      </div>
    </Section>
  );
}
