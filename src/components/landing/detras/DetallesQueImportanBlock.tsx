/**
 * DetallesQueImportanBlock.tsx
 *
 * Bloque 3 — 11 recomendaciones prácticas para optimizar la propiedad.
 * Grid 2-cols en md+, cada item es una card pequeña con icono Radix semántico.
 * Cierre con pull-quote y la frase de Lina.
 */

import { DETRAS_CONTENT } from '@/data/detras-content'
import {
  BorderSolidIcon,
  LockClosedIcon,
  LayersIcon,
  ListBulletIcon,
  LightningBoltIcon,
  CubeIcon,
  BackpackIcon,
  GearIcon,
  SunIcon,
  MobileIcon,
  ArchiveIcon,
} from '@radix-ui/react-icons'

const { recomendaciones } = DETRAS_CONTENT

/**
 * Mapping semántico de cada recomendación (por orden del array `items`)
 * a un icono Radix. Cada par mantiene el color de acento del bloque:
 * - pink / green / purple / yellow rotando para variedad visual sin overload.
 *
 * Tipo del Icon: Radix icons son ForwardRefExoticComponent. Usamos
 * `React.ComponentType<{ className?: string }>` que es compatible y solo
 * declara los props que usamos (className para color/tamaño).
 */
type IconConfig = {
  Icon: React.ComponentType<{ className?: string }>
  color: string // clase tailwind del color del icono
  bg: string    // clase tailwind del fondo suave del wrapper
}

const ICON_MAP: IconConfig[] = [
  // 1. Protectores en paredes y columnas (esquineros / borde)
  { Icon: BorderSolidIcon, color: 'text-livic-pink', bg: 'from-livic-pink/15 to-livic-pink/5' },
  // 2. Cajones / closets con llave (lock)
  { Icon: LockClosedIcon, color: 'text-livic-purple', bg: 'from-livic-purple/15 to-livic-purple/5' },
  // 3. Protectores de colchón / almohadas (capas/layers de cama)
  { Icon: LayersIcon, color: 'text-livic-green', bg: 'from-livic-green/15 to-livic-green/5' },
  // 4. Inventario organizado (lista / checklist)
  { Icon: ListBulletIcon, color: 'text-livic-yellow', bg: 'from-livic-yellow/15 to-livic-yellow/5' },
  // 5. Cerraduras electrónicas (rayo = electronic)
  { Icon: LightningBoltIcon, color: 'text-livic-pink', bg: 'from-livic-pink/15 to-livic-pink/5' },
  // 6. Mobiliario resistente (cubo = mueble)
  { Icon: CubeIcon, color: 'text-livic-purple', bg: 'from-livic-purple/15 to-livic-purple/5' },
  // 7. Utensilios básicos de cocina (mochila/contenedor de cosas)
  { Icon: BackpackIcon, color: 'text-livic-green', bg: 'from-livic-green/15 to-livic-green/5' },
  // 8. Mantenimientos preventivos (engranaje)
  { Icon: GearIcon, color: 'text-livic-yellow', bg: 'from-livic-yellow/15 to-livic-yellow/5' },
  // 9. Iluminación cálida y funcional (sol)
  { Icon: SunIcon, color: 'text-livic-pink', bg: 'from-livic-pink/15 to-livic-pink/5' },
  // 10. Puntos de carga celulares, ganchos, espejos (mobile)
  { Icon: MobileIcon, color: 'text-livic-purple', bg: 'from-livic-purple/15 to-livic-purple/5' },
  // 11. Espacio para limpieza y operación (archivo / storage)
  { Icon: ArchiveIcon, color: 'text-livic-green', bg: 'from-livic-green/15 to-livic-green/5' },
]

export default function DetallesQueImportanBlock() {
  return (
    <div>
      {/* Header bloque */}
      <div className='text-center mb-10'>
        <span className='text-[11px] font-bold uppercase tracking-[0.2em] text-livic-green mb-3 block'>{recomendaciones.etiqueta}</span>
        <h3 className='text-3xl md:text-4xl font-black text-livic-black leading-tight'>{recomendaciones.titulo}</h3>
        <p className='text-text-muted text-base md:text-lg mt-3 max-w-2xl mx-auto leading-relaxed'>{recomendaciones.subtitulo}</p>
        <div aria-hidden className='mt-4 h-1 w-12 rounded-full bg-livic-green mx-auto' />
      </div>

      {/* Intro */}
      <p className='text-base md:text-lg text-livic-black leading-relaxed max-w-3xl mx-auto text-center mb-10'>{recomendaciones.intro}</p>

      {/* Grid de items */}
      <ul className='grid sm:grid-cols-2 gap-4 md:gap-5'>
        {recomendaciones.items.map((item, idx) => {
          const config = ICON_MAP[idx] ?? ICON_MAP[0]
          const Icon = config.Icon
          return (
            <li key={idx} className='bg-white rounded-2xl p-5 md:p-6 border border-gray-100 card-hover shadow-sm flex gap-4'>
              {/* Icono Radix + número */}
              <div className='flex-shrink-0 flex flex-col items-center gap-1.5'>
                <span
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${config.bg} flex items-center justify-center`}
                  aria-hidden
                >
                  <Icon className={`w-5 h-5 ${config.color}`} />
                </span>
                <span className='text-[10px] font-bold text-livic-purple tabular-nums'>{String(idx + 1).padStart(2, '0')}</span>
              </div>
              <p className='text-sm md:text-base text-livic-black leading-relaxed flex-1'>{item}</p>
            </li>
          )
        })}
      </ul>

      {/* Cierre destacado + quote */}
      <div className='mt-12 max-w-3xl mx-auto space-y-5'>
        <p className='text-base md:text-lg text-livic-black leading-relaxed text-center'>{recomendaciones.cierre}</p>
        <blockquote className='relative bg-livic-yellow/10 border-l-4 border-livic-yellow rounded-2xl p-6 md:p-8'>
          <span aria-hidden className='absolute -top-4 -left-2 text-6xl text-livic-yellow/60 font-serif leading-none select-none'>
            “
          </span>
          <p className='text-lg md:text-xl text-livic-black font-medium italic leading-relaxed'>{recomendaciones.quote}</p>
        </blockquote>
      </div>
    </div>
  )
}
