/**
 * ComplementaryServicesBlock.tsx
 *
 * Tabla / grid de servicios complementarios (fotografía, videos, ambientación, etc.)
 * Tabla HTML real para mejor accesibilidad. Responsive: en mobile colapsa a cards.
 */

import { PRICING_CONTENT } from '@/data/pricing-content'

const { complementarios } = PRICING_CONTENT

export default function ComplementaryServicesBlock() {
  return (
    <section className='max-w-5xl mx-auto'>
      {/* Header */}
      <div className='text-center mb-8'>
        <span className='text-[11px] font-bold uppercase tracking-[0.2em] text-livic-yellow mb-3 block'>{complementarios.subtitulo}</span>
        <h3 className='text-2xl md:text-3xl font-black text-livic-black leading-tight'>{complementarios.titulo}</h3>
        <div aria-hidden className='mt-4 h-1 w-12 rounded-full bg-livic-yellow mx-auto' />
        <p className='text-text-muted text-sm md:text-base mt-4 max-w-2xl mx-auto leading-relaxed'>{complementarios.intro}</p>
      </div>

      {/* Tabla — desktop */}
      <div className='hidden md:block bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm'>
        <table className='w-full text-sm md:text-base'>
          <thead className='border-b-2 border-livic-yellow/30'>
            <tr>
              <th className='text-left py-3 font-bold text-livic-black'>Servicio</th>
              <th className='text-right py-3 font-bold text-livic-black'>Valor estimado</th>
            </tr>
          </thead>
          <tbody>
            {complementarios.items.map((item) => (
              <tr key={item.servicio} className='border-b border-gray-100 last:border-b-0'>
                <td className='py-4 text-livic-black flex items-center gap-2.5'>
                  <span className='text-livic-yellow' aria-hidden></span>
                  {item.servicio}
                </td>
                <td className='py-4 text-right font-bold text-livic-purple tabular-nums whitespace-nowrap'>{item.valor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards stacked — mobile */}
      <ul className='md:hidden space-y-3'>
        {complementarios.items.map((item) => (
          <li key={item.servicio} className='bg-white rounded-2xl p-4 border border-gray-100 flex items-start justify-between gap-3'>
            <div className='flex items-start gap-2.5 flex-1'>
              <span className='text-livic-yellow flex-shrink-0 mt-0.5' aria-hidden></span>
              <span className='text-sm text-livic-black leading-snug'>{item.servicio}</span>
            </div>
            <span className='text-xs font-bold text-livic-purple tabular-nums text-right whitespace-nowrap mt-0.5'>{item.valor}</span>
          </li>
        ))}
      </ul>

      {/* Nota final */}
      <p className='mt-6 text-xs md:text-sm text-text-muted italic leading-relaxed flex gap-2 max-w-3xl mx-auto'>
        <span className='text-livic-pink flex-shrink-0' aria-hidden>
          📌
        </span>
        <span>{complementarios.nota}</span>
      </p>
    </section>
  )
}
