/**
 * /tarjeta/[codigo] — Tarjeta de bienvenida PERSONALIZADA por apartamento.
 *
 * Convención del código: <prefijo-edificio><numero>
 *   /tarjeta/rdmll630  → Reserva del Mar II — Apto 630
 *   /tarjeta/rdm1221   → Reserva del Mar    — Apto 1221
 *   /tarjeta/ss1008    → Salguero Suite     — Apto 1008
 *
 * Si el código no matchea ningún prefijo conocido, devuelve 404.
 *
 * Server Component. QR generado a build time con `qrcode`.
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import TarjetaCard from "@/components/tarjeta/TarjetaCard";
import { MessageCircle, Mail, Home } from "lucide-react";
import Link from "next/link";
import QRCode from "qrcode";
import { CONFIG } from "@/data/config";
import { getWhatsAppLink } from "@/lib/utils";
import { parseCodigoTarjeta } from "@/lib/tarjeta-codigo";

interface PageProps {
  params: Promise<{ codigo: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { codigo } = await params;
  const apartamento = parseCodigoTarjeta(codigo);
  if (!apartamento) {
    return {
      title: "Tarjeta — Livic",
    };
  }
  return {
    title: `Bienvenidos al ${apartamento.edificio} ${apartamento.numero} — Livic`,
    description: `Tarjeta de bienvenida del apartamento ${apartamento.edificio} ${apartamento.numero} en Santa Marta. Hospitalidad con atención real.`,
  };
}

async function generateQrSvg(text: string): Promise<string> {
  return QRCode.toString(text, {
    type: "svg",
    errorCorrectionLevel: "M",
    margin: 1,
    color: { dark: "#7B4A88", light: "#FFFFFF" },
    width: 160,
  });
}

export default async function TarjetaCodigoPage({ params }: PageProps) {
  const { codigo } = await params;
  const apartamento = parseCodigoTarjeta(codigo);

  // Si el código no matchea, 404 (Next renderiza la página /_not-found)
  if (!apartamento) {
    notFound();
  }

  // El QR incluye el código del apto para tracking básico de "qué tarjeta se escaneó"
  const qrUrl = `https://alojateconlivic.com/tarjeta/${apartamento.codigo}`;
  const qrSvg = await generateQrSvg(qrUrl);

  const whatsappUrl = getWhatsAppLink(
    CONFIG.contact.whatsapp.number,
    `Hola Livic, estoy hospedado en el apartamento ${apartamento.edificio} ${apartamento.numero} y necesito asistencia.`,
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

          {/* Hint impresión + breadcrumb */}
          <div className="flex items-center justify-center gap-3 mb-5 print:hidden">
            <Link
              href="/tarjeta"
              className="inline-flex items-center gap-1.5 text-xs text-text-muted hover:text-livic-pink transition-colors"
            >
              <Home className="w-3 h-3" />
              <span>Tarjeta genérica</span>
            </Link>
            <span className="text-text-muted text-xs">·</span>
            <p className="text-xs text-text-muted">
              🖨️{" "}
              <kbd className="px-1.5 py-0.5 rounded bg-gray-100 text-livic-black font-mono text-[10px]">
                Ctrl/Cmd + P
              </kbd>
            </p>
          </div>

          {/* Tarjeta personalizada con apartamento */}
          <TarjetaCard qrSvg={qrSvg} apartamento={apartamento} />

          {/* CTAs fuera de la tarjeta */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 print:hidden">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-livic-green hover:bg-livic-green/90 text-white px-5 py-3 rounded-xl text-sm font-bold transition-colors shadow-md shadow-livic-green/20"
            >
              <MessageCircle className="w-4 h-4" />
              Soporte WhatsApp · {apartamento.edificio} {apartamento.numero}
            </a>
            <a
              href={`mailto:${CONFIG.contact.email}?subject=${encodeURIComponent(`Consulta sobre ${apartamento.edificio} ${apartamento.numero}`)}`}
              className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-livic-purple border-2 border-livic-purple/30 hover:border-livic-purple/50 px-5 py-3 rounded-xl text-sm font-bold transition-colors"
            >
              <Mail className="w-4 h-4" />
              Escribir un correo
            </a>
          </div>

          <p className="mt-6 text-center text-xs text-text-muted print:hidden">
            URL de esta tarjeta:{" "}
            <code className="px-1.5 py-0.5 rounded bg-gray-100 text-livic-pink font-mono text-[11px]">
              /tarjeta/{apartamento.codigo}
            </code>
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
}
