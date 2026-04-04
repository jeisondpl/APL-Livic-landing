/**
 * Footer.tsx
 * Footer institucional con 4 columnas responsive
 */

import Link from "next/link";
import Image from "next/image";
import { Mail, MessageCircle, Instagram, Facebook } from "lucide-react";
import { getWhatsAppLink } from "@/lib/utils";
import { CONFIG } from "@/data/config";

export default function Footer() {
  const whatsappUrl = getWhatsAppLink(
    CONFIG.contact.whatsapp.number,
    CONFIG.contact.whatsapp.message
  );

  return (
    <footer className="w-full bg-livic-black text-white">
      <div className="max-w-6xl mx-auto px-6 md:px-12 xl:px-16 py-12 md:py-16">
        {/* Grid 4 columnas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">

          {/* Columna 1: Logo + Descripción */}
          <div className="lg:col-span-1">
            <Image
              src="/logo-livic-white.png"
              alt="LIVIC"
              width={110}
              height={37}
              className="h-8 w-auto mb-4"
            />
            <p className="text-sm text-gray-300 leading-relaxed mb-4">
              {CONFIG.site.tagline}
            </p>
            <p className="text-xs text-gray-400">
              {CONFIG.site.description}
            </p>
          </div>

          {/* Columna 2: Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-4">
              Enlaces
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-sm text-gray-300 hover:text-livic-pink transition-colors"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  href="#servicios"
                  className="text-sm text-gray-300 hover:text-livic-pink transition-colors"
                >
                  Servicios
                </Link>
              </li>
              <li>
                <Link
                  href="#valor"
                  className="text-sm text-gray-300 hover:text-livic-pink transition-colors"
                >
                  Valor Diferencial
                </Link>
              </li>
              <li>
                <Link
                  href={CONFIG.site.catalogoUrl}
                  className="text-sm text-gray-300 hover:text-livic-green transition-colors"
                >
                  Catálogo de Apartamentos
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Contacto */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-4">
              Contacto
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-gray-300 hover:text-livic-green transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONFIG.contact.email}`}
                  className="flex items-center gap-2 text-sm text-gray-300 hover:text-livic-pink transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  {CONFIG.contact.email}
                </a>
              </li>
            </ul>

            {/* Redes sociales */}
            <div className="flex items-center gap-4 mt-6">
              {CONFIG.social.instagram && (
                <a
                  href={CONFIG.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-livic-pink transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              )}
              {CONFIG.social.facebook && (
                <a
                  href={CONFIG.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-livic-pink transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>

          {/* Columna 4: Legal */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-4">
              Legal
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-300 hover:text-livic-pink transition-colors"
                >
                  Políticas de Privacidad
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-300 hover:text-livic-pink transition-colors"
                >
                  Términos y Condiciones
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mt-10 pt-6">
          <p className="text-center text-xs text-gray-400">
            © 2026 LIVIC. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
