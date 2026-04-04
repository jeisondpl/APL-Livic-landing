import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonProps {
  children: React.ReactNode;
  /** Link href (usa Next Link) */
  href?: string;
  /** onClick handler (para botones sin href) */
  onClick?: () => void;
  /** Variante de estilo */
  variant?: "primary" | "secondary" | "outline";
  /** Tamaño */
  size?: "sm" | "md" | "lg";
  /** Clase CSS adicional */
  className?: string;
  /** Abrir en nueva pestaña (solo si href está definido) */
  target?: "_blank" | "_self";
  /** Rel attribute (para links externos) */
  rel?: string;
}

const VARIANT_CLASSES = {
  primary: "bg-livic-pink text-white hover:bg-livic-pink/90 border border-livic-pink",
  secondary: "bg-livic-green text-white hover:bg-livic-green/90 border border-livic-green",
  outline: "bg-transparent text-livic-pink hover:bg-livic-pink/10 border border-livic-pink",
};

const SIZE_CLASSES = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export default function Button({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  target,
  rel,
}: ButtonProps) {
  const baseClasses = cn(
    "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200",
    "focus:outline-none focus:ring-2 focus:ring-livic-pink focus:ring-offset-2",
    VARIANT_CLASSES[variant],
    SIZE_CLASSES[size],
    className
  );

  if (href) {
    // Link externo
    if (href.startsWith("http") || href.startsWith("https")) {
      return (
        <a
          href={href}
          target={target}
          rel={rel || (target === "_blank" ? "noopener noreferrer" : undefined)}
          className={baseClasses}
        >
          {children}
        </a>
      );
    }

    // Link interno
    return (
      <Link href={href} className={baseClasses}>
        {children}
      </Link>
    );
  }

  // Botón regular
  return (
    <button onClick={onClick} className={baseClasses}>
      {children}
    </button>
  );
}
