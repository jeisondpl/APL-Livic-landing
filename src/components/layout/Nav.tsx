'use client'

/**
 * Nav.tsx
 * Barra de navegación superior para landing institucional
 */

import Link from "next/link";
import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { getWhatsAppLink } from "@/lib/utils";
import { CONFIG } from "@/data/config";

export default function Nav() {
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

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 md:px-10 py-3 bg-white/95 backdrop-blur-sm border-b border-gray-100">

      {/* Logo */}
      <Link
        href="/"
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
          className="text-sm text-gray-600 font-medium hover:text-livic-pink transition-colors duration-200"
        >
          Inicio
        </Link>
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
          Valor
        </a>
        <a
          href="#beneficios"
          onClick={(e) => handleScrollTo(e, '#beneficios')}
          className="text-sm text-gray-600 font-medium hover:text-livic-pink transition-colors duration-200"
        >
          Beneficios
        </a>
        <Link
          href={CONFIG.site.catalogoUrl}
          className="text-sm text-gray-600 font-medium hover:text-livic-green transition-colors duration-200"
        >
          Catálogo
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
