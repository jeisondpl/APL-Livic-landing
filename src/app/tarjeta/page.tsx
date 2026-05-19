/**
 * /tarjeta — Tarjeta de bienvenida GENÉRICA para huéspedes en Livic.
 *
 * Para tarjeta personalizada por apartamento, usar /tarjeta/[codigo].
 * Ej: /tarjeta/rmdll630, /tarjeta/rmd1221, /tarjeta/ss1008
 *
 * Server Component. QR generado a build time con `qrcode`.
 */

import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import TarjetaCard from "@/components/tarjeta/TarjetaCard";
import { MessageCircle, Mail } from "lucide-react";
import QRCode from "qrcode";
import { CONFIG } from "@/data/config";
import { getWhatsAppLink } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Bienvenidos — Tarjeta de huésped Livic",
  description:
    "Bienvenidos a tu estancia en Santa Marta con Livic. Hospitalidad real, atención dedicada y todo lo que necesitas para una estadía perfecta.",
};

const QR_URL = "https://alojateconlivic.com";

async function generateQrSvg(text: string): Promise<string> {
  return QRCode.toString(text, {
    type: "svg",
    errorCorrectionLevel: "M",
    margin: 1,
    color: { dark: "#7B4A88", light: "#FFFFFF" },
    width: 160,
  });
}

export default async function TarjetaPage() {
  const qrSvg = await generateQrSvg(QR_URL);
  const whatsappUrl = getWhatsAppLink(
    CONFIG.contact.whatsapp.number,
    "Hola Livic, estoy hospedado en uno de sus apartamentos y necesito asistencia.",
  );

  return (
    <>
      <Nav />

      <main className="min-h-screen pt-20 md:pt-24 pb-16 bg-gradient-to-br from-livic-pink/5 via-white to-livic-purple/5 relative overflow-hidden">
        {/* Blobs decorativos del background */}
        <div aria-hidden className="pointer-events-none absolute top-20 -left-32 w-96 h-96 rounded-full bg-livic-pink/15 blur-3xl bubble-drift-2" />
        <div aria-hidden className="pointer-events-none absolute bottom-20 -right-32 w-96 h-96 rounded-full bg-livic-purple/15 blur-3xl bubble-drift-4" />
        <div aria-hidden className="pointer-events-none absolute top-1/2 right-10 w-32 h-32 rounded-full bg-livic-yellow/20 blur-2xl bubble-drift-3" />

        <div className="relative max-w-5xl mx-auto px-4 md:px-6 py-6 md:py-10">

          {/* Hint impresión */}
          <p className="text-xs text-text-muted text-center mb-5 print:hidden">
            🖨️ Optimizada para impresión horizontal —{" "}
            <kbd className="px-1.5 py-0.5 rounded bg-gray-100 text-livic-black font-mono text-[10px]">
              Ctrl/Cmd + P
            </kbd>{" "}
            · Orientación: Horizontal
          </p>

          {/* Tarjeta genérica (sin apartamento) */}
          <TarjetaCard qrSvg={qrSvg} />

          {/* CTAs fuera de la tarjeta — ocultos al imprimir */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 print:hidden">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-livic-green hover:bg-livic-green/90 text-white px-5 py-3 rounded-xl text-sm font-bold transition-colors shadow-md shadow-livic-green/20"
            >
              <MessageCircle className="w-4 h-4" />
              Soporte por WhatsApp
            </a>
            <a
              href={`mailto:${CONFIG.contact.email}`}
              className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-livic-purple border-2 border-livic-purple/30 hover:border-livic-purple/50 px-5 py-3 rounded-xl text-sm font-bold transition-colors"
            >
              <Mail className="w-4 h-4" />
              Escribir un correo
            </a>
          </div>

          <p className="mt-6 text-center text-xs text-text-muted print:hidden">
            ¿Tarjeta personalizada por apartamento? Usá{" "}
            <code className="px-1.5 py-0.5 rounded bg-gray-100 text-livic-pink font-mono text-[11px]">/tarjeta/rdmll630</code>{" "}
            o cualquier código (ej: <code className="px-1.5 py-0.5 rounded bg-gray-100 text-livic-pink font-mono text-[11px]">ss1008</code>).
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
}
