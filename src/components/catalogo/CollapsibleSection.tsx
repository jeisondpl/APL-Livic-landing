'use client'

/**
 * CollapsibleSection — disclosure animado accesible.
 *
 * Útil para info honesta pero secundaria (debilidades, disclaimers).
 * NO esconde la sección — solo plega contenido secundario.
 *
 * - Click header → toggle abierto/cerrado
 * - Chevron rotativo
 * - Animación suave de altura (CSS grid trick)
 * - Soporta defaultOpen
 * - Accesible: aria-expanded + aria-controls
 */

import { useId, useState, type ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Props {
  title: string
  icon?: ReactNode
  children: ReactNode
  defaultOpen?: boolean
  tone?: 'amber' | 'gray' | 'neutral'
}

const TONE: Record<NonNullable<Props['tone']>, { bg: string; border: string; title: string; icon: string }> = {
  amber: {
    bg: 'bg-amber-50/40 hover:bg-amber-50/60',
    border: 'border-amber-100',
    title: 'text-amber-900',
    icon: 'text-amber-500',
  },
  gray: {
    bg: 'bg-gray-50/60 hover:bg-gray-100/60',
    border: 'border-gray-100',
    title: 'text-gray-700',
    icon: 'text-gray-400',
  },
  neutral: {
    bg: 'bg-white hover:bg-gray-50',
    border: 'border-gray-100',
    title: 'text-gray-900',
    icon: 'text-gray-500',
  },
}

export default function CollapsibleSection({
  title,
  icon,
  children,
  defaultOpen = false,
  tone = 'neutral',
}: Props) {
  const [open, setOpen] = useState(defaultOpen)
  const id = useId()
  const t = TONE[tone]

  return (
    <div className={cn('rounded-xl border overflow-hidden transition-colors', t.bg, t.border)}>
      <button
        type='button'
        onClick={() => setOpen((o) => !o)}
        className='w-full flex items-center justify-between gap-3 px-4 py-3 text-left'
        aria-expanded={open}
        aria-controls={id}
      >
        <span className='flex items-center gap-2 min-w-0'>
          {icon && <span className={cn('flex-shrink-0', t.icon)}>{icon}</span>}
          <span className={cn('text-sm font-semibold truncate', t.title)}>{title}</span>
        </span>
        <ChevronDown
          size={18}
          className={cn(
            'flex-shrink-0 text-gray-400 transition-transform duration-200',
            open && 'rotate-180',
          )}
        />
      </button>

      {/* Grid-row animation trick: 0fr → 1fr para animar altura sin medir DOM */}
      <div
        id={id}
        className={cn('grid transition-[grid-template-rows] duration-200 ease-out')}
        style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
      >
        <div className='overflow-hidden'>
          <div className='px-4 pb-4 pt-1'>{children}</div>
        </div>
      </div>
    </div>
  )
}
