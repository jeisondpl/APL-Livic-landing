/**
 * LocationCard.tsx
 * Componente de ubicación con mapa placeholder e información del edificio.
 */

import { MapPin, Building2, Palmtree } from "lucide-react";
import Badge from "@/components/shared/Badge";
import InteractiveMap from "@/components/catalogo/InteractiveMap";
import type { ApartmentLocation } from "@/data/apartments";

interface LocationCardProps {
  location: ApartmentLocation;
  edificio: string;
}

export default function LocationCard({ location, edificio }: LocationCardProps) {
  return (
    <div className="bg-surface-100 border border-surface-300 rounded-2xl overflow-hidden shadow-sm">
      {/* Mapa Interactivo */}
      <div className="relative h-64 sm:h-80 bg-surface-200 border-b border-surface-300">
        <InteractiveMap
          longitude={location.lng}
          latitude={location.lat}
          name={`Edificio ${edificio}`}
        />

        {/* Badges flotantes sobre el mapa */}
        <div className="absolute top-4 right-4 flex gap-2 z-10">
          <div className="px-3 py-1.5 rounded-full bg-livic-black/60 backdrop-blur-md text-xs font-medium text-livic-white border border-livic-white/10">
            {location.ciudad}
          </div>
          {location.accesoPlaya && (
            <Badge variant="green">
              <span className="flex items-center gap-1">
                <Palmtree className="w-3.5 h-3.5" />
                Acceso playa
              </span>
            </Badge>
          )}
        </div>
      </div>

      {/* Info del edificio y zona */}
      <div className="p-6 md:p-8">
        <div className="flex items-start gap-4 mb-5">
          <div className="p-3 rounded-xl bg-livic-pink/10 border border-livic-pink/20">
            <Building2 className="w-6 h-6 text-livic-pink flex-shrink-0" />
          </div>
          <div>
            <h4 className="text-xl font-bold text-foreground">
              Edificio {edificio}
            </h4>
            <div className="flex items-center gap-1.5 text-text-muted text-sm mt-1.5">
              <MapPin className="w-4 h-4 text-livic-pink" />
              <span>
                {location.cercaDe || location.ciudad}, {location.departamento} · {location.pais}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {location.descripcionUbicacion && (
            <p className="text-text-muted text-base leading-relaxed">
              {location.descripcionUbicacion}
            </p>
          )}

          {location.distanciaPlayas && (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-livic-green/10 border border-livic-green/20">
              <Palmtree className="w-4 h-4 text-livic-green" />
              <span className="text-livic-green text-sm font-medium">
                Distancia a la playa: {location.distanciaPlayas}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
