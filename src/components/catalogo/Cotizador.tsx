'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { AlertTriangle, CalendarOff, RefreshCw } from 'lucide-react';
import AvailabilityBar from '@/components/catalogo/AvailabilityBar';
import SolicitudReservaModal from '@/components/catalogo/SolicitudReservaModal';
import { fetchQuote, type QuoteResult } from '@/lib/api';

interface CotizadorProps {
  /** Slug del apartamento en la API LIVIC (puede diferir del slug del catálogo). */
  apiSlug: string;
  /** Nombre del apto para mostrar en el header del modal de solicitud. */
  apartamentoNombre: string;
  /** Mínimo de noches del apartamento (informativo). */
  nochesMinimas?: number;
  /** Capacidad máxima de huéspedes. */
  huespedesMaximos?: number;
  /**
   * Rango inicial "checkIn/checkOut" cuando el usuario llegó desde el
   * buscador del catálogo con fechas elegidas. Si NO viene, el cotizador
   * arranca vacío esperando input — NO precarga un default sintético.
   */
  initialRange?: string;
  /**
   * Huéspedes inicial (total) cuando vienen del buscador. Si NO viene, el
   * selector arranca vacío.
   */
  initialGuests?: number;
  /**
   * Se invoca cada vez que cambia la cotización: con un `QuoteResult` cuando
   * el cálculo es exitoso (incluso parcial con `errores`), o con `null` cuando
   * faltan datos / hay error fatal. Permite al padre sincronizar el header del
   * precio con la cotización actual.
   */
  onQuoteChange?: (quote: QuoteResult | null) => void;
}

/* ── Helpers ──────────────────────────────────────────────────── */

function fmtCurrency(n: number, currency = 'COP'): string {
  return n.toLocaleString('es-CO', { style: 'currency', currency, maximumFractionDigits: 0 });
}

function fmtDateLabel(iso: string): string {
  return new Intl.DateTimeFormat('es-CO', { day: 'numeric', month: 'short' })
    .format(new Date(`${iso}T00:00:00`));
}

function parseRange(range: string): { checkIn: string; checkOut: string } | null {
  if (!range?.includes('/')) return null;
  const [a, b] = range.split('/');
  if (!a?.trim() || !b?.trim()) return null;
  return { checkIn: a.trim(), checkOut: b.trim() };
}

/**
 * Parsea "2 adultos en total" en el shape de Guests que AvailabilityBar
 * espera. Como solo recibimos un total agregado en los query params, lo
 * volcamos todo a `adultos` (es la convención del buscador del catálogo).
 */
function expandGuests(total: number | undefined): Partial<{
  adultos: number; ninos: number; bebes: number; mascotas: number
}> | undefined {
  if (!total || total < 1) return undefined;
  return { adultos: total, ninos: 0, bebes: 0, mascotas: 0 };
}

/* ── Componente ───────────────────────────────────────────────── */

export default function Cotizador({
  apiSlug,
  apartamentoNombre,
  nochesMinimas = 2,
  huespedesMaximos = 4,
  initialRange,
  initialGuests,
  onQuoteChange,
}: CotizadorProps) {
  const [showSolicitudModal, setShowSolicitudModal] = useState(false);
  // Initial range/guests: solo si vienen del buscador del catálogo. Si NO
  // hay contexto previo, el cotizador arranca VACÍO (sin fechas preselectas
  // ni huéspedes precargados) y espera input del usuario. Esto evita mostrar
  // una "estadía hardcodeada" en el detalle cuando el usuario clickeó una
  // card sin filtrar antes.
  const startRange = useMemo(() => initialRange ?? '', [initialRange]);
  const startGuests = useMemo(() => expandGuests(initialGuests), [initialGuests]);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [huespedes, setHuespedes] = useState(0);
  const [quote, setQuote] = useState<QuoteResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ¿La cotización vino sin tarifa para alguna noche? Distinguimos el caso
  // "no se pudo cotizar nada" (subtotal=0) del caso "cotización parcial"
  // (subtotal>0 con un warning), porque la UX es distinta.
  const sinTarifaTotal = Boolean(quote && quote.subtotal === 0 && (quote.errores?.length ?? 0) > 0);
  const sinTarifaParcial = Boolean(
    quote && quote.subtotal > 0 && (quote.errores?.length ?? 0) > 0,
  );

  const onSelectionChange = useCallback((range: string, totalGuests: number) => {
    const parsed = parseRange(range);
    if (parsed) {
      setCheckIn(parsed.checkIn);
      setCheckOut(parsed.checkOut);
    } else {
      setCheckIn('');
      setCheckOut('');
    }
    setHuespedes(totalGuests);
  }, []);

  const noches = useMemo(() => {
    if (!checkIn || !checkOut) return 0;
    const ms = new Date(`${checkOut}T00:00:00Z`).getTime() - new Date(`${checkIn}T00:00:00Z`).getTime();
    return Math.max(0, Math.round(ms / 86_400_000));
  }, [checkIn, checkOut]);

  const fechasValidas = Boolean(checkIn && checkOut && checkIn < checkOut);
  const huespedesValidos = huespedes >= 1;
  const cumpleMinimo = noches >= nochesMinimas;
  const puedeCotizar = fechasValidas && cumpleMinimo && huespedesValidos;

  async function handleCotizar() {
    if (!puedeCotizar) return;
    setLoading(true);
    setError(null);
    try {
      const r = await fetchQuote(apiSlug, { checkIn, checkOut, huespedes });
      setQuote(r);
      onQuoteChange?.(r);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cotizar.');
      setQuote(null);
      onQuoteChange?.(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!puedeCotizar) {
      setQuote(null);
      onQuoteChange?.(null);
      return;
    }
    const t = setTimeout(handleCotizar, 350);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkIn, checkOut, huespedes, apiSlug]);

  return (
    <section className='bg-white border border-gray-100 rounded-3xl p-5 md:p-6'>
      {/* Encabezado */}
      <header className='mb-5'>
        <h2 className='text-base font-semibold text-gray-900 tracking-tight'>Cotiza tu estadía</h2>
        <p className='text-xs text-gray-400 mt-1 leading-relaxed'>
          Tarifas vigentes con descuento por estadía larga.
        </p>
      </header>

      {/* Selectores de fechas y huéspedes — sin defaults sintéticos cuando
          el usuario no llegó con filtros del buscador. */}
      <AvailabilityBar
        defaultRange={startRange}
        defaultGuests={startGuests}
        hideSearchButton
        maxTotalGuests={huespedesMaximos}
        onSelectionChange={onSelectionChange}
      />

      {/* Estados de validación */}
      {fechasValidas && !huespedesValidos && (
        <p className='flex items-center gap-2 text-xs text-amber-700 mb-4'>
          <AlertTriangle className='w-3.5 h-3.5 flex-shrink-0' />
          Indica cuántas personas viajan.
        </p>
      )}
      {!cumpleMinimo && fechasValidas && (
        <p className='flex items-center gap-2 text-xs text-amber-700 mb-4'>
          <AlertTriangle className='w-3.5 h-3.5 flex-shrink-0' />
          Mínimo {nochesMinimas} noches.
        </p>
      )}

      {/* Loading */}
      {loading && (
        <div className='flex items-center gap-2 text-xs text-gray-400 mb-4'>
          <div className='w-3 h-3 border-2 border-gray-200 border-t-livic-pink rounded-full animate-spin' />
          Calculando…
        </div>
      )}

      {/* Error */}
      {error && (
        <p className='flex items-start gap-2 text-xs text-red-600 mb-4'>
          <AlertTriangle className='w-3.5 h-3.5 mt-0.5 flex-shrink-0' />
          {error}
        </p>
      )}

      {/* Sin tarifa total — no se pudo calcular nada para el rango pedido.
          Reemplaza al breakdown numérico (que mostraría todos $0 sin sentido)
          por un mensaje claro y CTA implícito (el calendario sigue arriba). */}
      {sinTarifaTotal && !loading && (
        <div className='mt-5 pt-5 border-t border-gray-100'>
          <div className='flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-2xl'>
            <CalendarOff className='w-5 h-5 mt-0.5 flex-shrink-0 text-amber-600' />
            <div className='text-xs'>
              <p className='font-semibold text-amber-900 mb-1'>Sin tarifas para estas fechas</p>
              <p className='text-amber-700 leading-relaxed'>
                Aún no se ha configurado el precio para el rango seleccionado.
                Probá con otras fechas o consultanos por disponibilidad.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Resultado normal — incluye el caso "parcial" donde algunas noches
          tienen tarifa y otras no (subtotal>0 con warning). */}
      {quote && cumpleMinimo && !loading && !sinTarifaTotal && (
        <div className='mt-5 pt-5 border-t border-gray-100 space-y-3'>
          {sinTarifaParcial && quote.errores && (
            <p className='flex items-start gap-2 text-xs text-amber-700'>
              <AlertTriangle className='w-3.5 h-3.5 mt-0.5 flex-shrink-0' />
              {quote.errores.join('; ')}
            </p>
          )}

          <div className='flex items-baseline justify-between text-sm'>
            <span className='text-gray-500'>
              {fmtDateLabel(quote.checkIn)} → {fmtDateLabel(quote.checkOut)}
            </span>
            <span className='text-gray-400 text-xs'>
              {quote.noches} noche{quote.noches !== 1 ? 's' : ''}
            </span>
          </div>

          <div className='flex items-baseline justify-between text-sm'>
            <span className='text-gray-500'>
              {quote.nochesEntreSemana} entre semana + {quote.nochesFinDeSemana} fin de semana
            </span>
            <span className='text-gray-700 tabular-nums'>{fmtCurrency(quote.subtotal, quote.moneda)}</span>
          </div>

          {quote.descuentoPct > 0 && (
            <div className='flex items-baseline justify-between text-sm'>
              <span className='text-emerald-700'>
                Descuento {quote.descuentoTipo} ({quote.descuentoPct.toFixed(0)}%)
              </span>
              <span className='text-emerald-700 tabular-nums'>
                − {fmtCurrency(quote.descuentoMonto, quote.moneda)}
              </span>
            </div>
          )}

          {quote.descuentoHuespedesMonto > 0 && quote.descuentoHuespedesAplicadoA != null && (
            <div className='flex items-baseline justify-between text-sm'>
              <span className='text-emerald-700'>
                Descuento por {quote.descuentoHuespedesAplicadoA} huésped{quote.descuentoHuespedesAplicadoA !== 1 ? 'es' : ''}
              </span>
              <span className='text-emerald-700 tabular-nums'>
                − {fmtCurrency(quote.descuentoHuespedesMonto, quote.moneda)}
              </span>
            </div>
          )}

          {quote.tarifaLimpieza > 0 && (
            <div className='flex items-baseline justify-between text-sm'>
              <span className='text-gray-500'>Tarifa de limpieza</span>
              <span className='text-gray-700 tabular-nums'>
                {fmtCurrency(quote.tarifaLimpieza, quote.moneda)}
              </span>
            </div>
          )}

          <div className='flex items-end justify-between pt-4 border-t border-gray-100'>
            <div>
              <p className='text-[10px] text-gray-400 uppercase tracking-[0.12em]'>Total</p>
              {quote.pricingVigenciaDesde && (
                <p className='text-[10px] text-gray-300 mt-0.5'>
                  tarifa vigente desde {quote.pricingVigenciaDesde}
                </p>
              )}
            </div>
            <p className='text-2xl font-semibold text-gray-900 tabular-nums tracking-tight'>
              {fmtCurrency(quote.total, quote.moneda)}
            </p>
          </div>
        </div>
      )}

      {/* Acciones */}
      <div className='mt-6 space-y-2'>
        <button
          type='button'
          onClick={() => setShowSolicitudModal(true)}
          disabled={loading || !puedeCotizar || sinTarifaTotal || !quote}
          className='w-full bg-livic-black hover:bg-gray-900 disabled:opacity-30 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-2xl text-sm transition-colors'
        >
          Solicitar reserva
        </button>

        <button
          type='button'
          onClick={handleCotizar}
          disabled={loading || !puedeCotizar}
          className='w-full text-xs text-gray-500 hover:text-livic-pink disabled:opacity-30 disabled:cursor-not-allowed py-2 transition-colors flex items-center justify-center gap-1.5'
        >
          <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
          {loading ? 'Calculando…' : 'Recalcular'}
        </button>
      </div>

      {/* Modal de solicitud — sólo renderiza cuando hay un quote válido
          y el usuario clickeó "Solicitar reserva". */}
      {quote && !sinTarifaTotal && (
        <SolicitudReservaModal
          open={showSolicitudModal}
          onClose={() => setShowSolicitudModal(false)}
          apiSlug={apiSlug}
          apartamentoNombre={apartamentoNombre}
          quote={quote}
        />
      )}
    </section>
  );
}
