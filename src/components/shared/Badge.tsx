/**
 * Badge.tsx
 * Etiqueta pequeña informativa. Variantes por color para distintos tipos de dato.
 */

interface BadgeProps {
  children: React.ReactNode;
  /** Variante de color del badge */
  variant?: "pink" | "green" | "purple" | "yellow" | "neutral";
}

const VARIANT_CLASSES: Record<BadgeProps["variant"] & string, string> = {
  pink:    "bg-livic-pink/20 text-livic-pink border border-livic-pink/30",
  green:   "bg-livic-green/20 text-livic-green border border-livic-green/30",
  purple:  "bg-livic-purple/20 text-livic-purple border border-livic-purple/30",
  yellow:  "bg-livic-yellow/20 text-livic-yellow border border-livic-yellow/30",
  neutral: "bg-surface-200 text-text-muted border border-surface-300",
};

export default function Badge({ children, variant = "neutral" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${VARIANT_CLASSES[variant]}`}
    >
      {children}
    </span>
  );
}
