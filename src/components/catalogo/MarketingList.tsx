'use client'

/**
 * MarketingList — wrapper polimórfico para renderizar listas del PMS
 * (fortalezas, debilidades, huespedIdeal, noIncluidos) con visual coherente.
 *
 * Layouts soportados:
 *  - 'grid': 2 columnas en desktop, 1 en mobile (para fortalezas/debilidades)
 *  - 'list': 1 columna siempre (para noIncluidos típicamente)
 *  - 'chips': pills inline horizontales con wrap (para huespedIdeal)
 *
 * Tones: green (positivo), amber (disclaimer), purple (info), gray (neutro/no-incluido).
 *
 * Si `items` está vacío, NO renderiza nada (sin "Sin información" awkward).
 */

import type { ReactNode } from 'react'
import { Check, X, Sparkles, AlertCircle } from 'lucide-react'

type Tone = 'green' | 'amber' | 'purple' | 'gray'
type Layout = 'grid' | 'list' | 'chips'
type IconKind = 'check' | 'cross' | 'sparkle' | 'bullet'

interface Props {
  items: string[]
  title?: string
  /** Icono junto al título. */
  titleIcon?: ReactNode
  tone: Tone
  layout: Layout
  /** Icono por cada item de la lista. Default: bullet (•). */
  iconPerItem?: IconKind
}

const TONE_BG: Record<Tone, string> = {
  green: 'bg-emerald-50/60 border-emerald-100',
  amber: 'bg-amber-50/60 border-amber-100',
  purple: 'bg-livic-purple-50 border-livic-purple-100',
  gray: 'bg-gray-50/60 border-gray-100',
}

const TONE_ICON: Record<Tone, string> = {
  green: 'text-emerald-500',
  amber: 'text-amber-500',
  purple: 'text-livic-purple-500',
  gray: 'text-gray-400',
}

const TONE_TITLE: Record<Tone, string> = {
  green: 'text-emerald-900',
  amber: 'text-amber-900',
  purple: 'text-livic-purple-700',
  gray: 'text-gray-700',
}

const TONE_CHIP: Record<Tone, string> = {
  green: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  amber: 'bg-amber-50 text-amber-800 border-amber-200',
  purple: 'bg-livic-purple-50 text-livic-purple-700 border-livic-purple-200',
  gray: 'bg-gray-50 text-gray-700 border-gray-200',
}

function ItemIcon({ kind, tone }: { kind: IconKind; tone: Tone }) {
  const cls = `${TONE_ICON[tone]} flex-shrink-0 mt-0.5`
  if (kind === 'check') return <Check size={16} className={cls} strokeWidth={2.5} />
  if (kind === 'cross') return <X size={16} className={cls} strokeWidth={2.5} />
  if (kind === 'sparkle') return <Sparkles size={14} className={cls} />
  return <span className={`${cls} text-base leading-none mt-1`}>•</span>
}

export default function MarketingList({
  items,
  title,
  titleIcon,
  tone,
  layout,
  iconPerItem = 'bullet',
}: Props) {
  if (!items || items.length === 0) return null

  // ── Chips layout (huespedIdeal) ─────────────────────────────
  if (layout === 'chips') {
    return (
      <div>
        {title && (
          <div className={`flex items-center gap-2 mb-3 text-sm font-semibold ${TONE_TITLE[tone]}`}>
            {titleIcon}
            <span>{title}</span>
          </div>
        )}
        <div className='flex flex-wrap gap-2'>
          {items.map((item, i) => (
            <span
              key={`${item}-${i}`}
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${TONE_CHIP[tone]}`}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    )
  }

  // ── Grid / List layouts (fortalezas, debilidades, noIncluidos) ──
  const gridCls = layout === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2.5' : 'space-y-2.5'

  return (
    <div className={`rounded-xl border ${TONE_BG[tone]} p-4 md:p-5`}>
      {title && (
        <div className={`flex items-center gap-2 mb-3 text-sm font-semibold ${TONE_TITLE[tone]}`}>
          {titleIcon ?? <AlertCircle size={16} />}
          <span>{title}</span>
        </div>
      )}
      <ul className={gridCls}>
        {items.map((item, i) => (
          <li key={`${item}-${i}`} className='flex items-start gap-2.5 text-sm text-gray-700 leading-relaxed'>
            <ItemIcon kind={iconPerItem} tone={tone} />
            <span className='flex-1'>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
