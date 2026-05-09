'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import AvailabilityBar from '@/components/catalogo/AvailabilityBar';
import { fetchQuote, type QuoteResult } from '@/lib/api';

interface CotizadorProps {
  /** Slug del apartamento en la API LIVIC (puede diferir del slug del catálogo). */
  apiSlug: string;
  /** Mínimo de noches del apartamento (informativo). */
  nochesMinimas?: number;
  /** Capacidad máxima de huéspedes. */
  huespedesMaximos?: number;
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

const DEFAULT_RANGE = '2026-05-12/2026-05-19';

/* ── Componente ───────────────────────────────────────────────── */

export default function Cotizador({ apiSlug, nochesMinimas = 2, huespedesMaximos = 4 }: CotizadorProps) {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [huespedes, setHuespedes] = useState(0);
  const [quote, setQuote] = useState<QuoteResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cotizar.');
      setQuote(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!puedeCotizar) {
      setQuote(null);
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

      {/* Selectores de fechas y huéspedes */}
      <AvailabilityBar
        defaultRange={DEFAULT_RANGE}
        defaultGuests={{ adultos: 2, ninos: 0, bebes: 0, mascotas: 0 }}
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

      {/* Resultado */}
      {quote && cumpleMinimo && !loading && (
        <div className='mt-5 pt-5 border-t border-gray-100 space-y-3'>
          {quote.errores && quote.errores.length > 0 && (
            <p className='flex items-start gap-2 text-xs text-amber-700'>
              <AlertTriangle className='w-3.5 h-3.5 mt-0.5 flex-shrink-0' />
              Cotización parcial: {quote.errores.join('; ')}
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

          <div className='flex items-end justify-between pt-4 border-t border-gray-100'>
            <div>
              <p className='text-[10px] text-gray-400 uppercase tracking-[0.12em]'>Total</p>
              <p className='text-[10px] text-gray-300 mt-0.5'>desde {quote.pricingVigenciaDesde}</p>
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
          disabled={loading || !puedeCotizar}
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
    </section>
  );
}
