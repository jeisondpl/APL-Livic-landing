/**
 * HistoriaLinaBlock.tsx
 *
 * Bloque 2 — manifiesto en primera persona de Lina + lista de procesos
 * acompañados por Livic + cierre con voice quote.
 * Server Component, una columna centrada con max-w prose.
 */

import { DETRAS_CONTENT } from '@/data/detras-content'
import {
  ChatBubbleIcon,
  EnterIcon,
  EyeOpenIcon,
  GearIcon,
  BarChartIcon,
  FileTextIcon,
} from '@radix-ui/react-icons'

const { historia } = DETRAS_CONTENT

/**
 * Mapping semántico: cada proceso del manifiesto a un icono Radix.
 * Mismo orden que `historia.procesos` en `data/detras-content.ts`.
 */
type ProcesoIcon = React.ComponentType<{ className?: string }>
const PROCESO_ICONS: ProcesoIcon[] = [
  ChatBubbleIcon,  // 1. Atención al huésped
  EnterIcon,       // 2. Check in y check out
  EyeOpenIcon,     // 3. Supervisión y limpieza
  GearIcon,        // 4. Coordinación de mantenimientos
  BarChartIcon,    // 5. Gestión operativa y comercial
  FileTextIcon,    // 6. Acompañamiento legal y administrativo
]

export default function HistoriaLinaBlock() {
  return (
    <div className='max-w-3xl mx-auto'>
      {/* Etiqueta + título */}
      <div className='text-center mb-10'>
        <span className='text-[11px] font-bold uppercase tracking-[0.2em] text-livic-purple mb-3 block'>{historia.etiqueta}</span>
        <h3 className='text-3xl md:text-4xl font-black text-livic-black leading-tight max-w-2xl mx-auto'>{historia.titulo}</h3>
        <div aria-hidden className='mt-4 h-1 w-12 rounded-full bg-livic-purple mx-auto' />
      </div>

      {/* Manifiesto en párrafos */}
      <div className='space-y-5 text-lg text-livic-black leading-relaxed'>
        {historia.parrafos.map((parrafo, i) => (
          <p key={i} className={i === 0 ? 'text-xl font-semibold text-livic-purple' : ''}>
            {parrafo}
          </p>
        ))}
      </div>

      {/* Lista de procesos como pills con icono Radix */}
      <ul className='mt-6 flex flex-wrap gap-2.5'>
        {historia.procesos.map((proceso, idx) => {
          const Icon = PROCESO_ICONS[idx] ?? ChatBubbleIcon
          return (
            <li
              key={proceso}
              className='inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-100 rounded-full text-sm font-medium text-livic-black shadow-sm card-hover'
            >
              <Icon className='w-3.5 h-3.5 text-livic-purple flex-shrink-0' />
              {proceso}
            </li>
          )
        })}
      </ul>

      {/* Cierre destacado — pull quote */}
      <div className='mt-12 relative bg-gradient-to-br from-livic-pink/5 via-white to-livic-purple/5 rounded-2xl p-6 md:p-8 border-l-4 border-livic-pink'>
        <div className='space-y-3 text-base md:text-lg leading-relaxed text-livic-black'>
          {historia.cierre.map((linea, i) => (
            <p key={i} className={i === historia.cierre.length - 1 ? 'font-semibold text-livic-purple' : ''}>
              {linea}
            </p>
          ))}
        </div>
        <p className='mt-5 text-sm text-text-muted italic'>{historia.firma}</p>
      </div>
    </div>
  )
}
