'use client'

/**
 * EdificioAmenidadesSection — "Espacios pensados para relajarte".
 *
 * Renderea las amenidades del edificio agrupadas por categoría + un
 * **preview 2×2** con las 4 primeras fotos del edificio. La 4ta foto
 * tiene un overlay "+N más" si hay más de 4. Click sobre cualquier
 * preview abre el modal directo en el lightbox de esa foto.
 *
 * Si NO hay fotos, el bloque preview no se renderiza. Si NO hay
 * amenidades, se muestra mensaje vacío.
 *
 * Es Client Component porque recibe callback que muta state del padre.
 */

import { Images } from 'lucide-react'
import type { ApartmentAmenityCategory, ApartmentPhoto } from '@/data/apartments'
import IconBadge from './IconBadge'

interface Props {
  amenidades: ApartmentAmenityCategory[]
  fotos: ApartmentPhoto[]
  /** Llamado al click sobre una foto preview o el botón. `index` indica qué foto
   *  abrir directo en lightbox; `null` abre la grilla del modal. */
  onOpenFotos: (index: number | null) => void
}

const PREVIEW_COUNT = 4

export default function EdificioAmenidadesSection({
  amenidades,
  fotos,
  onOpenFotos,
}: Props) {
  const previewFotos = fotos.slice(0, PREVIEW_COUNT)
  const extraCount = Math.max(0, fotos.length - PREVIEW_COUNT)
  const tieneFotos = fotos.length > 0

  return (
    <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100 mb-4">
      <h2 className="text-base font-bold text-gray-900 mb-1">
        Espacios pensados para relajarte
      </h2>
      <p className="text-xs text-gray-500 mb-5">
        Áreas comunes y comodidades del conjunto.
      </p>

      {amenidades.length === 0 ? (
        <p className="text-sm text-gray-400 italic">
          El conjunto aún no tiene amenidades publicadas.
        </p>
      ) : (
        <div className="space-y-5">
          {amenidades.map((cat) => (
            <div key={cat.titulo}>
              <div className="flex items-center gap-2 mb-2.5">
                <IconBadge name={cat.icono} size={16} className="text-livic-pink" />
                <h3 className="text-sm font-semibold text-gray-800">{cat.titulo}</h3>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 pl-1">
                {cat.items.map((item) => (
                  <li key={item.nombre} className="flex items-center gap-2 text-sm text-gray-700">
                    <IconBadge name={item.icono} size={14} className="text-gray-400 flex-shrink-0" />
                    <span>{item.nombre}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {tieneFotos && (
        <div className="mt-6 pt-5 border-t border-gray-100">
          {/* Preview grid 2x4 con las primeras 4 fotos. La 4ta lleva overlay
              "+N mas" si hay extras. Cada foto abre el modal en lightbox en
              ese indice — el boton general abre el modal en la grilla. */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
            {previewFotos.map((foto, idx) => {
              const isLast = idx === previewFotos.length - 1
              const showOverlay = isLast && extraCount > 0
              return (
                <button
                  key={`${foto.src}-${idx}`}
                  type="button"
                  onClick={() => onOpenFotos(idx)}
                  aria-label={`Abrir foto: ${foto.alt}`}
                  className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100 group focus:outline-none focus-visible:ring-2 focus-visible:ring-livic-pink"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={foto.src}
                    alt={foto.alt}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {showOverlay && (
                    <div className="absolute inset-0 bg-black/55 flex items-center justify-center text-white">
                      <span className="text-lg font-bold tracking-tight">+{extraCount}</span>
                    </div>
                  )}
                </button>
              )
            })}
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => onOpenFotos(null)}
              className="inline-flex items-center gap-2 bg-livic-pink/10 hover:bg-livic-pink/20 text-livic-pink font-medium px-4 py-2 rounded-full text-sm transition-colors"
            >
              <Images size={16} />
              Ver todas las fotos ({fotos.length})
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
