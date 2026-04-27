import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AnimatedBackground from "@/components/shared/AnimatedBackground";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LIVIC – Operación turística y cuidado de inmuebles",
  description:
    "Operamos y acompañamos inmuebles en renta turística con presencia real, control operativo y atención constante. Tranquilidad para ti, cuidado total para tu inmueble.",
  keywords: ["operación turística", "gestión inmuebles", "renta turística", "Santa Marta", "cuidado inmuebles", "anfitrión profesional"],
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background text-foreground antialiased transition-colors duration-300`}
      >
        <AnimatedBackground />
        {children}
      </body>
    </html>
  );
}
