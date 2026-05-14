'use client'

/**
 * Nav.tsx
 * Barra de navegación superior para landing institucional
 */

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { getWhatsAppLink } from "@/lib/utils";
import { CONFIG } from "@/data/config";

export default function Nav() {
  const pathname = usePathname();
  const whatsappUrl = getWhatsAppLink(
    CONFIG.contact.whatsapp.number,
    CONFIG.contact.whatsapp.message
  );

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  /**
   * Inicio: si ya estamos en "/", scroll suave al top (mismo comportamiento
   * que clickear anchors); si estamos en otra ruta (/pricing, /detras-de-livic,
   * /catalogo), Next navega a "/" normalmente.
   */
  const handleInicioClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Solo en homepage tiene sentido mostrar los anchors de scroll a secciones.
  // En /detras-de-livic, /pricing, /catalogo, etc., los anchors apuntarían a
  // ids que no existen en esa ruta y darían navegación rota.
  const isHomepage = pathname === "/";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 md:px-10 py-3 bg-white/95 backdrop-blur-sm border-b border-gray-100">

      {/* Logo */}
      <Link
        href="/"
        onClick={handleInicioClick}
        className="flex items-center hover:opacity-75 transition-opacity"
      >
        <Image
          src="/logo-livic.png"
          alt="LIVIC"
          width={110}
          height={37}
          className="h-8 w-auto"
          priority
        />
      </Link>

      {/* Links de navegación centrados (desktop) */}
      <div className="hidden md:flex items-center gap-8">
        <Link
          href="/"
          onClick={handleInicioClick}
          className="text-sm text-gray-600 font-medium hover:text-livic-pink transition-colors duration-200"
        >
          Inicio
        </Link>

        {/* Anchors al homepage — solo visibles cuando estamos en "/" */}
        {isHomepage && (
          <>
            <a
              href="#servicios"
              onClick={(e) => handleScrollTo(e, '#servicios')}
              className="text-sm text-gray-600 font-medium hover:text-livic-pink transition-colors duration-200"
            >
              Servicios
            </a>
            <a
              href="#valor"
              onClick={(e) => handleScrollTo(e, '#valor')}
              className="text-sm text-gray-600 font-medium hover:text-livic-pink transition-colors duration-200"
            >
              Por qué LIVIC
            </a>
            <a
              href="#beneficios"
              onClick={(e) => handleScrollTo(e, '#beneficios')}
              className="text-sm text-gray-600 font-medium hover:text-livic-pink transition-colors duration-200"
            >
              Beneficios
            </a>
          </>
        )}

        {/* Rutas independientes — siempre visibles */}
        <Link
          href="/detras-de-livic"
          className="text-sm text-gray-600 font-medium hover:text-livic-pink transition-colors duration-200"
        >
          Detrás de Livic
        </Link>
        <Link
          href="/pricing"
          className="text-sm text-gray-600 font-medium hover:text-livic-pink transition-colors duration-200"
        >
          Pricing &amp; Plan
        </Link>
      </div>

      {/* WhatsApp link */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-sm text-white bg-livic-green hover:bg-livic-green/90 px-4 py-2 rounded-lg font-medium transition-all duration-200"
      >
        <MessageCircle className="w-4 h-4" />
        <span className="hidden sm:inline">WhatsApp</span>
      </a>
    </nav>
  );
}
