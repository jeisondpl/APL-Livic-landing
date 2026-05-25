'use client'

/**
 * EdificioAmenidadesSection — "Espacios pensados para relajarte".
 *
 * Renderea las amenidades del edificio agrupadas por categoría + un CTA
 * para abrir el modal "Ver fotos del edificio". Es Client Component porque
 * recibe un callback (`onOpenFotos`) que muta state del padre.
 *
 * Si `amenidades` está vacío Y `tieneFotos === false`, el padre debe NO
 * renderear este componente (caso edge — apto cuyo edificio no tiene
 * datos cargados todavía).
 */

import { Images } from 'lucide-react'
import type { ApartmentAmenityCategory } from '@/data/apartments'
import IconBadge from './IconBadge'

interface Props {
  amenidades: ApartmentAmenityCategory[]
  onOpenFotos: () => void
  tieneFotos: boolean
}

export default function EdificioAmenidadesSection({
  amenidades,
  onOpenFotos,
  tieneFotos,
}: Props) {
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
        <div className="mt-6 pt-5 border-t border-gray-100 flex justify-end">
          <button
            type="button"
            onClick={onOpenFotos}
            className="inline-flex items-center gap-2 bg-livic-pink/10 hover:bg-livic-pink/20 text-livic-pink font-medium px-4 py-2 rounded-full text-sm transition-colors"
          >
            <Images size={16} />
            Ver fotos del edificio
          </button>
        </div>
      )}
    </div>
  )
}
