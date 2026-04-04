/**
 * HostCard.tsx
 * Tarjeta de anfitrión con calificación, reseñas y datos de LIVIC.
 * Server Component.
 */

import type { ApartmentHost } from "@/data/apartments";

interface HostCardProps {
  host: ApartmentHost;
  /** Si es verdadero, se muestran los datos de empresa y experiencia */
  isPrimary?: boolean;
}

/** Genera estrellas visuals para la calificación */
function Stars({ rating }: { rating: number }) {
  const filled = Math.round(rating);
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < filled ? "text-livic-yellow" : "text-surface-300"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="text-text-muted text-xs ml-1">{rating.toFixed(1)}</span>
    </div>
  );
}

export default function HostCard({ host, isPrimary = false }: HostCardProps) {
  return (
    <div className="flex items-start gap-4 bg-surface-100 border border-surface-300 rounded-xl p-5">
      {/* Avatar placeholder circular */}
      <div className="flex-shrink-0 w-14 h-14 rounded-full bg-surface-200 border-2 border-livic-pink flex items-center justify-center">
        <span className="text-livic-pink text-xl font-semibold">
          {host.nombre.charAt(0)}
        </span>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="text-foreground font-semibold">{host.nombre}</h3>
          {host.empresa && (
            <span className="text-xs bg-livic-pink/20 text-livic-pink rounded-full px-2 py-0.5 font-medium">
              {host.empresa}
            </span>
          )}
        </div>

        {isPrimary && host.calificacion && (
          <div className="mt-1">
            <Stars rating={host.calificacion} />
          </div>
        )}

        {isPrimary && (
          <div className="mt-2 flex flex-wrap gap-3 text-xs text-text-muted">
            {host.resenas !== undefined && (
              <span>{host.resenas} reseña{host.resenas !== 1 ? "s" : ""}</span>
            )}
            {host.anosExperiencia !== undefined && (
              <span>{host.anosExperiencia} año{host.anosExperiencia !== 1 ? "s" : ""} de experiencia</span>
            )}
          </div>
        )}

        {!isPrimary && (
          <p className="text-text-muted text-xs mt-1">Co-anfitrión</p>
        )}
      </div>
    </div>
  );
}
