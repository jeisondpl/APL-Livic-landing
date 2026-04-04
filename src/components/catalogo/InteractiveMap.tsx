"use client";

import dynamic from "next/dynamic";

/**
 * InteractiveMap.tsx
 * Componente que carga el mapa de Leaflet dinámicamente para evitar errores de SSR.
 */

const InteractiveMap = dynamic(() => import("./LeafletMapContent"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-surface-200 animate-pulse flex items-center justify-center">
      <span className="text-text-muted text-sm">Cargando mapa...</span>
    </div>
  ),
});

export default InteractiveMap;
