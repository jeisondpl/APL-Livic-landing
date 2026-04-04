/**
 * Section.tsx
 * Contenedor de sección reutilizable con padding y título opcional.
 */

interface SectionProps {
  children: React.ReactNode;
  /** Título de la sección (opcional) */
  titulo?: string;
  /** Subtítulo debajo del título */
  subtitulo?: string;
  /** Acento de color bajo el título */
  acento?: "pink" | "green" | "purple" | "yellow";
  /** Etiqueta pequeña sobre el título */
  etiqueta?: string;
  /** id HTML para anchor links */
  id?: string;
  /** Clase extra para el contenedor exterior */
  className?: string;
  /** Alinear título al centro */
  centrado?: boolean;
}

const ACENTO_CLASSES: Record<string, string> = {
  pink:   "bg-livic-pink",
  green:  "bg-livic-green",
  purple: "bg-livic-purple",
  yellow: "bg-livic-yellow",
};

const ACENTO_TEXT_CLASSES: Record<string, string> = {
  pink:   "text-livic-pink",
  green:  "text-livic-green",
  purple: "text-livic-purple",
  yellow: "text-livic-yellow",
};

export default function Section({
  children,
  titulo,
  subtitulo,
  acento = "pink",
  etiqueta,
  id,
  className = "",
  centrado = false,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`w-full max-w-6xl mx-auto px-6 md:px-12 xl:px-16 py-10 md:py-10 ${className}`}
    >
      {titulo && (
        <div className={`mb-10 md:mb-12 ${centrado ? "text-center" : ""}`}>
          {/* Etiqueta de acento superior */}
          {etiqueta && (
            <span className={`text-xs font-bold uppercase tracking-[0.2em] ${ACENTO_TEXT_CLASSES[acento]} mb-3 block`}>
              {etiqueta}
            </span>
          )}

          <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-4">
            {titulo}
          </h2>

          {/* Línea de acento */}
          <div
            className={`h-1 rounded-full ${ACENTO_CLASSES[acento]} ${centrado ? "mx-auto" : ""}`}
            style={{ width: "3rem" }}
          />

          {subtitulo && (
            <p className="text-text-muted text-base md:text-lg mt-4 max-w-2xl leading-relaxed">
              {subtitulo}
            </p>
          )}
        </div>
      )}
      {children}
    </section>
  );
}
