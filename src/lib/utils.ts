/**
 * Funciones utilitarias
 */

/**
 * Generar link de WhatsApp con mensaje predefinido
 */
export function getWhatsAppLink(number: string, message: string): string {
  const cleanNumber = number.replace(/\D/g, '');
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${cleanNumber}?text=${encodedMessage}`;
}

/**
 * Merge classNames condicionales (útil para componentes con variantes)
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}
