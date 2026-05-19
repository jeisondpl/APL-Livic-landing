/**
 * tarjeta-codigo.ts
 *
 * Parser de códigos de apartamento usados en `/tarjeta/[codigo]`.
 *
 * Convención: `<prefijo-edificio><numero>` (todo lowercase).
 *
 *   rdmll630 → Reserva del Mar II — Apto 630
 *   rdm1221  → Reserva del Mar    — Apto 1221
 *   ss1008   → Salguero Suite     — Apto 1008
 *
 * Para agregar un edificio nuevo, sumá su entrada al mapping EDIFICIOS y
 * elegí un prefijo único.
 */

export interface ApartamentoTarjeta {
  /** Nombre del edificio (display) — ej: "Reserva del Mar II" */
  edificio: string
  /** Número del apartamento (string para preservar leading zeros) */
  numero: string
  /** Código original tal cual vino en la URL — ej: "rmdll630" */
  codigo: string
  /** Prefijo de edificio matcheado — ej: "rmdll" */
  prefijo: string
}

/**
 * Mapping `prefijo → nombre del edificio`.
 *
 * IMPORTANTE: los prefijos se evalúan de más largo a más corto para evitar
 * ambigüedades (ej: "rdmll" gana sobre "rdm" cuando viene "rdmll630").
 */
const EDIFICIOS: Record<string, string> = {
  rdm: "Reserva del Mar",
  rdmll: "Reserva del Mar II",
  rdm2: "Reserva del Mar II",
  rdmii: "Reserva del Mar II",
  ss: "Salguero Suite",
  ar: "Ambar Roca",
  scp: "Samaria Club de Playa",
}

/**
 * Parsea el código de la URL a un objeto ApartamentoTarjeta.
 *
 * @returns null si el código no matchea ningún prefijo conocido o si la
 *          parte numérica no es válida (debe ser solo dígitos, ≥ 1 char).
 */
export function parseCodigoTarjeta(codigo: string): ApartamentoTarjeta | null {
  if (!codigo) return null
  const lowered = codigo.toLowerCase().trim()

  // Ordenar prefijos por largo descendente para que "rmdll" gane sobre "rmd"
  const prefijos = Object.keys(EDIFICIOS).sort((a, b) => b.length - a.length)

  for (const prefijo of prefijos) {
    if (lowered.startsWith(prefijo)) {
      const numero = lowered.slice(prefijo.length)
      if (numero && /^\d+$/.test(numero)) {
        return {
          edificio: EDIFICIOS[prefijo],
          numero,
          codigo: lowered,
          prefijo,
        }
      }
    }
  }
  return null
}

/** Lista de prefijos válidos (útil para docs / test). */
export function listarPrefijosEdificio(): { prefijo: string; edificio: string }[] {
  return Object.entries(EDIFICIOS).map(([prefijo, edificio]) => ({ prefijo, edificio }))
}
