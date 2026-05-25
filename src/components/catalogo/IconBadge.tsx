/**
 * IconBadge — renderer dinámico de íconos Lucide por nombre string.
 *
 * El catálogo `amenidades` del backend guarda iconos como nombres de
 * componentes Lucide (ej. "Wifi", "Snowflake", "Camera"). Acá los
 * resolvemos en runtime. Si el nombre no corresponde a un ícono válido
 * (typo o ícono nuevo no instalado en esta versión de lucide-react),
 * caemos al fallback `LayoutGrid` para no crashear el SSR.
 *
 * Server-compatible (sin hooks ni state).
 */

import * as Icons from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface Props {
  name: string
  size?: number
  className?: string
}

export default function IconBadge({ name, size = 18, className }: Props) {
  const lookup = (Icons as unknown as Record<string, LucideIcon | undefined>)[name]
  const Cmp = lookup ?? Icons.LayoutGrid
  return <Cmp size={size} className={className} aria-hidden />
}
