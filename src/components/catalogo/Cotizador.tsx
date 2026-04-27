'use client';

import { useEffect, useMemo, useState } from 'react';
import { CalendarDays, Users, Receipt, AlertTriangle, TrendingDown, Tag } from 'lucide-react';
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

function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

function addDaysISO(iso: string, n: number): string {
  const d = new Date(`${iso}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

function fmtCurrency(n: number, currency = 'COP'): string {
  return n.toLocaleString('es-CO', { style: 'currency', currency, maximumFractionDigits: 0 });
}

function fmtDateLabel(iso: string): string {
  return new Intl.DateTimeFormat('es-CO', { day: 'numeric', month: 'short', year: 'numeric' })
    .format(new Date(`${iso}T00:00:00`));
}

/* ── Componente ───────────────────────────────────────────────── */

export default function Cotizador({ apiSlug, nochesMinimas = 2, huespedesMaximos = 4 }: CotizadorProps) {
  const [checkIn, setCheckIn] = useState(addDaysISO(todayISO(), 14));
  const [checkOut, setCheckOut] = useState(addDaysISO(todayISO(), 21));
  const [huespedes, setHuespedes] = useState(2);
  const [quote, setQuote] = useState<QuoteResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const noches = useMemo(() => {
    const ms = new Date(`${checkOut}T00:00:00Z`).getTime() - new Date(`${checkIn}T00:00:00Z`).getTime();
    return Math.max(0, Math.round(ms / 86_400_000));
  }, [checkIn, checkOut]);

  const fechasValidas = checkIn && checkOut && checkIn < checkOut;
  const cumpleMinimo = noches >= nochesMinimas;

  async function handleCotizar() {
    if (!fechasValidas || !cumpleMinimo) return;
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

  // Cotiza automáticamente al cambiar fechas válidas y huéspedes (debounce simple)
  useEffect(() => {
    if (!fechasValidas || !cumpleMinimo) {
      setQuote(null);
      return;
    }
    const t = setTimeout(handleCotizar, 350);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkIn, checkOut, huespedes, apiSlug]);

  return (
    <section className='bg-white border border-gray-200 rounded-3xl shadow-sm p-6 md:p-8'>
      <div className='flex items-center gap-3 mb-5'>
        <div className='w-10 h-10 rounded-full bg-livic-pink/10 flex items-center justify-center'>
          <Receipt className='w-5 h-5 text-livic-pink' />
        </div>
        <div>
          <h2 className='text-lg md:text-xl font-bold text-gray-900'>Cotiza tu estadía</h2>
          <p className='text-xs text-gray-400'>Precios calculados con tarifas vigentes y descuentos por estadía larga.</p>
        </div>
      </div>

      {/* Inputs */}
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5'>
        <div>
          <label className='block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1'>Check-in</label>
          <div className='relative'>
            <CalendarDays className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none' />
            <input
              type='date'
              value={checkIn}
              min={todayISO()}
              onChange={(e) => {
                const nuevo = e.target.value;
                setCheckIn(nuevo);
                if (nuevo >= checkOut) setCheckOut(addDaysISO(nuevo, nochesMinimas));
              }}
              className='w-full h-11 rounded-xl border border-gray-200 bg-gray-50 pl-9 pr-3 text-sm focus:border-livic-pink focus:ring-2 focus:ring-livic-pink/20 focus:outline-none'
            />
          </div>
        </div>
        <div>
          <label className='block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1'>Check-out</label>
          <div className='relative'>
            <CalendarDays className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none' />
            <input
              type='date'
              value={checkOut}
              min={addDaysISO(checkIn, 1)}
              onChange={(e) => setCheckOut(e.target.value)}
              className='w-full h-11 rounded-xl border border-gray-200 bg-gray-50 pl-9 pr-3 text-sm focus:border-livic-pink focus:ring-2 focus:ring-livic-pink/20 focus:outline-none'
            />
          </div>
        </div>
        <div>
          <label className='block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1'>Huéspedes</label>
          <div className='relative'>
            <Users className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none' />
            <select
              value={huespedes}
              onChange={(e) => setHuespedes(parseInt(e.target.value, 10))}
              className='w-full h-11 rounded-xl border border-gray-200 bg-gray-50 pl-9 pr-3 text-sm appearance-none focus:border-livic-pink focus:ring-2 focus:ring-livic-pink/20 focus:outline-none'
            >
              {Array.from({ length: huespedesMaximos }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n}>{n} huésped{n !== 1 ? 'es' : ''}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Estado: mínimo de noches no cumplido */}
      {!cumpleMinimo && fechasValidas && (
        <div className='flex items-start gap-2 text-sm text-amber-800 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-4'>
          <AlertTriangle className='w-4 h-4 mt-0.5 flex-shrink-0' />
          <p>Mínimo {nochesMinimas} noches. Selecciona un rango más amplio.</p>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className='flex items-center gap-2 text-sm text-gray-500 mb-4'>
          <div className='w-4 h-4 border-2 border-gray-300 border-t-livic-pink rounded-full animate-spin' />
          Calculando…
        </div>
      )}

      {/* Error */}
      {error && (
        <div className='flex items-start gap-2 text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-4'>
          <AlertTriangle className='w-4 h-4 mt-0.5 flex-shrink-0' />
          {error}
        </div>
      )}

      {/* Resultado */}
      {quote && cumpleMinimo && !loading && (
        <div className='space-y-3 border-t border-gray-100 pt-4'>
          {quote.errores && quote.errores.length > 0 && (
            <div className='flex items-start gap-2 text-sm text-amber-800 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3'>
              <AlertTriangle className='w-4 h-4 mt-0.5 flex-shrink-0' />
              <div>
                <p className='font-semibold mb-1'>Cotización parcial</p>
                <ul className='list-disc list-inside text-xs space-y-0.5'>
                  {quote.errores.map((err) => <li key={err}>{err}</li>)}
                </ul>
              </div>
            </div>
          )}

          <div className='space-y-2'>
            <div className='flex items-center justify-between text-sm'>
              <span className='text-gray-600'>{fmtDateLabel(quote.checkIn)} → {fmtDateLabel(quote.checkOut)}</span>
              <span className='text-gray-500 font-medium'>{quote.noches} noche{quote.noches !== 1 ? 's' : ''}</span>
            </div>

            <div className='flex items-center justify-between text-sm'>
              <span className='text-gray-600'>{quote.nochesEntreSemana} entre semana + {quote.nochesFinDeSemana} fin de semana</span>
              <span className='text-gray-900 font-medium'>{fmtCurrency(quote.subtotal, quote.moneda)}</span>
            </div>

            {quote.descuentoPct > 0 && (
              <div className='flex items-center justify-between text-sm'>
                <span className='inline-flex items-center gap-1.5 text-emerald-700'>
                  <TrendingDown className='w-3.5 h-3.5' />
                  Descuento {quote.descuentoTipo} ({quote.descuentoPct.toFixed(0)}%)
                </span>
                <span className='text-emerald-700 font-medium'>− {fmtCurrency(quote.descuentoMonto, quote.moneda)}</span>
              </div>
            )}
          </div>

          <div className='flex items-center justify-between pt-3 border-t border-gray-100'>
            <div>
              <p className='text-xs text-gray-400 uppercase tracking-wider'>Total estimado</p>
              <p className='text-[10px] text-gray-400'>Tarifas vigentes desde {quote.pricingVigenciaDesde}</p>
            </div>
            <p className='text-2xl font-bold text-gray-900'>{fmtCurrency(quote.total, quote.moneda)}</p>
          </div>

          {quote.comisionAirbnbMonto > 0 && (
            <p className='text-[11px] text-gray-400 flex items-center gap-1'>
              <Tag className='w-3 h-3' />
              Incluye ~{fmtCurrency(quote.comisionAirbnbMonto, quote.moneda)} de comisión Airbnb estimada ({quote.comisionAirbnbPct.toFixed(0)}%).
            </p>
          )}
        </div>
      )}

      <button
        onClick={handleCotizar}
        disabled={loading || !cumpleMinimo}
        className='mt-5 w-full bg-livic-pink hover:bg-livic-pink/90 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl text-sm transition-colors flex items-center justify-center gap-2'
      >
        <Receipt className='w-4 h-4' />
        {loading ? 'Calculando…' : 'Recalcular cotización'}
      </button>
    </section>
  );
}
