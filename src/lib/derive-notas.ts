/**
 * derive-notas.ts
 *
 * Genera la lista de "Información importante" del detalle del catálogo a
 * partir de campos ESTRUCTURADOS del apartamento. Antes esto eran strings
 * hardcoded en el array `notas` que no se actualizaban al cambiar el campo
 * (ej. cambiar `costoManillaPersona` no actualizaba el texto "Manilla $X").
 *
 * Cada nota generada se etiqueta con un `key` único para evitar duplicados
 * con notas custom que el operador escriba a mano.
 *
 * Estrategia:
 *   1. Auto-derivar las notas comunes (manilla, silencio).
 *   2. Mergear con `notas` libres del operador, evitando duplicados por
 *      similaridad textual básica (si el operador escribió "Manilla $..."
 *      manualmente, se filtra para no duplicar).
 */

import type { Apartment } from '@/data/apartments'

/** Una nota a renderizar. */
export interface DerivedNota {
  text: string
  /** Para tracking interno y futuros íconos por categoría. */
  source: 'manilla' | 'silencio' | 'custom'
}

/** Formatea un valor COP string a "$57.500 COP" (sin decimales). */
function fmtCop(value: string | null | undefined): string | null {
  if (!value) return null
  const n = parseFloat(value)
  if (!Number.isFinite(n) || n <= 0) return null
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(n)
}

/** Pasa "22:00" → "10:00 PM". Si ya viene en formato AM/PM o no parsea, devuelve as-is. */
function to12h(time: string | null | undefined): string | null {
  if (!time) return null
  const trimmed = time.trim()
  if (!trimmed) return null
  // Si ya tiene am/pm, no tocar
  if (/[ap]\.?\s?m\.?/i.test(trimmed)) return trimmed
  const match = trimmed.match(/^(\d{1,2}):(\d{2})$/)
  if (!match) return trimmed
  const h = parseInt(match[1], 10)
  const m = match[2]
  if (h === 0) return `12:${m} AM`
  if (h < 12) return `${h}:${m} AM`
  if (h === 12) return `12:${m} PM`
  return `${h - 12}:${m} PM`
}

/**
 * Genera las notas auto-derivadas desde campos estructurados del apto.
 * Si un campo no aplica (ej. !requiereManilla), no genera la nota.
 */
function generateDerivedNotas(apt: Apartment): DerivedNota[] {
  const out: DerivedNota[] = []

  // ── Manilla / pulsera ───────────────────────────────────────
  if (apt.requiereManilla) {
    const costo = fmtCop(apt.costoManillaPersona)
    let text = costo
      ? `Manilla de acceso al conjunto: ${costo} por persona`
      : 'El conjunto requiere manilla de acceso (consultar valor)'
    // Detalles extra
    const detalles: string[] = []
    detalles.push('a partir de 9 años')
    if (apt.manillaSoloTarjeta) detalles.push('SOLO TARJETA')
    text += ` (${detalles.join(', ')}).`
    out.push({ text, source: 'manilla' })
  }

  // ── Silencio nocturno ──────────────────────────────────────
  if (apt.silencioDesde) {
    const desde = to12h(apt.silencioDesde)
    out.push({
      text: `Silencio del conjunto desde las ${desde}.`,
      source: 'silencio',
    })
  }

  return out
}

/**
 * Detecta si un string custom es muy similar a una nota auto-derivada.
 * Usa keywords clave de cada source para evitar duplicados.
 */
function isLikelyDuplicate(custom: string, derived: DerivedNota): boolean {
  const lower = custom.toLowerCase()
  if (derived.source === 'manilla' && /manilla|pulsera|acceso al conjunto/.test(lower)) {
    return true
  }
  if (derived.source === 'silencio' && /silencio/.test(lower)) {
    return true
  }
  return false
}

/**
 * API principal. Devuelve la lista combinada que el detalle del catálogo
 * debería renderizar en "Información importante":
 *   - Notas auto-derivadas de campos estructurados (manilla, silencio)
 *   - Notas custom del operador (sin duplicar las auto-derivadas)
 */
export function deriveAllNotas(apt: Apartment): DerivedNota[] {
  const derived = generateDerivedNotas(apt)

  const customFiltered: DerivedNota[] = (apt.notas ?? [])
    .map((s) => s.trim())
    .filter((s) => s.length > 0)
    .filter((custom) => !derived.some((d) => isLikelyDuplicate(custom, d)))
    .map((text) => ({ text, source: 'custom' as const }))

  return [...derived, ...customFiltered]
}
