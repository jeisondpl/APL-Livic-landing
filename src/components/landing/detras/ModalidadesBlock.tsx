/**
 * ModalidadesBlock.tsx
 *
 * Bloque 4 — Modalidades de Administración y Comercialización.
 * 4 sub-bloques: anuncio (cards A/B), fotografía, administración (fees), comisión 10%.
 * Server Component.
 */

import { DETRAS_CONTENT } from '@/data/detras-content'

const { modalidades } = DETRAS_CONTENT
const { anuncio, fotografia, administracion, comision } = modalidades

/** Item de lista con sparkle, reutilizable dentro del bloque. */
function ListItem({ children }: { children: React.ReactNode }) {
  return (
    <li className='flex items-start gap-2.5 text-sm md:text-base text-livic-black leading-relaxed'>
      <span className='text-livic-yellow flex-shrink-0 mt-0.5' aria-hidden></span>
      <span>{children}</span>
    </li>
  )
}

export default function ModalidadesBlock() {
  return (
    <div>
      {/* Header bloque */}
      <div className='text-center mb-10'>
        <span className='text-[11px] font-bold uppercase tracking-[0.2em] text-livic-pink mb-3 block'>{modalidades.etiqueta}</span>
        <h3 className='text-3xl md:text-4xl font-black text-livic-black leading-tight max-w-3xl mx-auto'>{modalidades.titulo}</h3>
        <p className='text-text-muted text-base md:text-lg mt-3 max-w-2xl mx-auto leading-relaxed'>{modalidades.subtitulo}</p>
        <div aria-hidden className='mt-4 h-1 w-12 rounded-full bg-livic-pink mx-auto' />
      </div>

      {/* Intro */}
      <p className='text-base md:text-lg text-livic-black leading-relaxed max-w-3xl mx-auto text-center mb-14'>{modalidades.intro}</p>

      {/* ═══════════════════════════════════════════════════════
          4.1 — CREACIÓN Y CONFIGURACIÓN DEL ANUNCIO
      ═══════════════════════════════════════════════════════ */}
      <section className='mb-16'>
        <h4 className='text-2xl md:text-3xl font-bold text-livic-black mb-4'>{anuncio.titulo}</h4>
        <p className='text-sm md:text-base text-text-muted mb-5'>La creación del anuncio incluye:</p>
        <ul className='grid sm:grid-cols-2 gap-2 mb-10 max-w-2xl'>
          {anuncio.incluye.map((item) => (
            <ListItem key={item}>{item}</ListItem>
          ))}
        </ul>

        {/* Cards Modalidad A vs B */}
        <div className='grid md:grid-cols-2 gap-6'>
          {anuncio.modalidades.map((mod, idx) => (
            <div
              key={mod.nombre}
              className={`relative bg-white rounded-2xl p-7 md:p-8 card-hover ${
                mod.recomendada ? 'border-2 border-livic-pink shadow-lg shadow-livic-pink/10' : 'border border-gray-200'
              } ${idx === 0 ? 'delay-200' : 'delay-400'}`}
            >
              {mod.recomendada && (
                <span className='absolute -top-3 left-1/2 -translate-x-1/2 bg-livic-pink text-white text-[11px] font-bold tracking-widest uppercase px-3 py-1 rounded-full shadow'>
                  Recomendada
                </span>
              )}

              <h5 className='text-lg md:text-xl font-black text-livic-black mb-2 leading-tight'>{mod.nombre}</h5>
              <p className='text-sm text-text-muted leading-relaxed mb-6 min-h-[3.5rem]'>{mod.ideal}</p>

              <dl className='space-y-3 text-sm'>
                <div className='flex justify-between items-baseline gap-3 border-b border-gray-100 pb-2'>
                  <dt className='text-text-muted'>Creación y configuración</dt>
                  <dd className={`font-bold tabular-nums text-right ${mod.recomendada ? 'text-livic-green' : 'text-livic-black'}`}>{mod.creacionValor}</dd>
                </div>
                <div className='flex justify-between items-baseline gap-3 border-b border-gray-100 pb-2'>
                  <dt className='text-text-muted'>Propiedad del anuncio</dt>
                  <dd className='font-semibold text-livic-black'>{mod.propiedadAnuncio}</dd>
                </div>
                <div className='flex justify-between items-baseline gap-3 border-b border-gray-100 pb-2'>
                  <dt className='text-text-muted'>Comisión sobre reservas</dt>
                  <dd className='font-semibold text-livic-purple'>{mod.comision}</dd>
                </div>
                <div className='flex justify-between items-baseline gap-3 pb-2'>
                  <dt className='text-text-muted'>Gestión operativa y comercial</dt>
                  <dd className='font-semibold text-livic-black'>{mod.gestion}</dd>
                </div>
              </dl>

              <p className='mt-5 text-xs text-text-muted italic leading-relaxed'>📌 {mod.nota}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          4.2 — FOTOGRAFÍA PROFESIONAL
      ═══════════════════════════════════════════════════════ */}
      <section className='mb-16'>
        <h4 className='text-2xl md:text-3xl font-bold text-livic-black mb-4'>{fotografia.titulo}</h4>
        <p className='text-base md:text-lg text-livic-black leading-relaxed max-w-3xl mb-6'>{fotografia.intro}</p>

        <div className='grid md:grid-cols-2 gap-8'>
          {/* Lista */}
          <div className='bg-white rounded-2xl p-6 md:p-7 border border-gray-100'>
            <p className='text-sm font-semibold text-livic-purple uppercase tracking-wider mb-4'>El servicio incluye</p>
            <ul className='space-y-2'>
              {fotografia.incluye.map((item) => (
                <ListItem key={item}>{item}</ListItem>
              ))}
            </ul>
          </div>

          {/* Tabla de tarifas */}
          <div className='bg-livic-yellow/10 rounded-2xl p-6 md:p-7 border border-livic-yellow/30 flex flex-col'>
            <p className='text-sm font-semibold text-livic-black uppercase tracking-wider mb-4'>Tarifas</p>
            <table className='w-full text-sm flex-1'>
              <thead className='border-b-2 border-livic-yellow/40'>
                <tr>
                  <th className='text-left py-2 font-bold text-livic-black'>Servicio</th>
                  <th className='text-right py-2 font-bold text-livic-black'>Valor</th>
                </tr>
              </thead>
              <tbody>
                {fotografia.tarifas.map((t) => (
                  <tr key={t.servicio} className='border-b border-livic-yellow/20 last:border-b-0'>
                    <td className='py-3 text-livic-black'>{t.servicio}</td>
                    <td className='py-3 text-right font-semibold text-livic-purple tabular-nums'>{t.valor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className='mt-4 text-xs text-text-muted italic leading-relaxed'>📌 {fotografia.nota}</p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          4.3 — ADMINISTRACIÓN Y OPERACIÓN
      ═══════════════════════════════════════════════════════ */}
      <section className='mb-16'>
        <h4 className='text-2xl md:text-3xl font-bold text-livic-black mb-4'>{administracion.titulo}</h4>
        <p className='text-sm md:text-base text-text-muted mb-5'>La gestión operativa podrá incluir:</p>
        <ul className='grid sm:grid-cols-2 gap-2 mb-10 max-w-3xl'>
          {administracion.incluye.map((item) => (
            <ListItem key={item}>{item}</ListItem>
          ))}
        </ul>

        {/* Tabla fees */}
        <div className='bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm'>
          <h5 className='text-lg md:text-xl font-bold text-livic-black mb-5'>{administracion.feeTitulo}</h5>

          <div className='overflow-x-auto'>
            <table className='w-full text-sm md:text-base'>
              <thead className='border-b-2 border-livic-purple/20'>
                <tr>
                  <th className='text-left py-3 font-bold text-livic-black'>Tipo de inmueble</th>
                  <th className='text-right py-3 font-bold text-livic-black'>Fee mensual</th>
                </tr>
              </thead>
              <tbody>
                {administracion.fees.map((f) => (
                  <tr key={f.tipo} className='border-b border-gray-100 last:border-b-0'>
                    <td className='py-4 text-livic-black'>{f.tipo}</td>
                    <td className='py-4 text-right font-bold text-livic-purple tabular-nums whitespace-nowrap'>{f.fee}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Notas */}
          <div className='mt-6 space-y-3'>
            {administracion.notas.map((nota, i) => (
              <p key={i} className='text-xs md:text-sm text-text-muted leading-relaxed flex gap-2'>
                <span className='text-livic-pink flex-shrink-0' aria-hidden>
                  📌
                </span>
                <span>{nota}</span>
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          4.4 — COMISIÓN POR COMERCIALIZACIÓN
      ═══════════════════════════════════════════════════════ */}
      <section>
        <h4 className='text-2xl md:text-3xl font-bold text-livic-black mb-6'>{comision.titulo}</h4>

        <div className='bg-gradient-to-br from-livic-purple/10 via-white to-livic-pink/5 rounded-3xl p-6 md:p-10 border-l-4 border-livic-purple shadow-sm'>
          <div className='grid md:grid-cols-[auto_1fr] gap-6 md:gap-10 items-center'>
            {/* Porcentaje destacado */}
            <div className='text-center md:text-left flex-shrink-0'>
              <div className='text-6xl md:text-7xl lg:text-8xl font-black bg-gradient-to-br from-livic-purple to-livic-pink bg-clip-text text-transparent leading-none'>
                {comision.porcentaje}
              </div>
              <p className='mt-2 text-xs md:text-sm font-bold tracking-widest uppercase text-livic-purple'>Sobre reservas efectivas</p>
            </div>

            {/* Lista de qué incluye */}
            <div>
              <p className='text-sm md:text-base text-livic-black leading-relaxed mb-4'>{comision.intro}</p>
              <ul className='grid sm:grid-cols-2 gap-2'>
                {comision.incluye.map((item) => (
                  <ListItem key={item}>{item}</ListItem>
                ))}
              </ul>
            </div>
          </div>

          <p className='mt-6 pt-6 border-t border-livic-purple/15 text-xs md:text-sm text-text-muted italic leading-relaxed'>📌 {comision.nota}</p>
        </div>
      </section>
    </div>
  )
}
