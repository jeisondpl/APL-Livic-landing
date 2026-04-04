import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Manrope } from "next/font/google";
import "./globals.css";
import AnimatedBackground from "@/components/shared/AnimatedBackground";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
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
        className={`${plusJakartaSans.variable} ${manrope.variable} font-body min-h-screen bg-background text-foreground antialiased transition-colors duration-300`}
      >
        <AnimatedBackground />
        {children}
      </body>
    </html>
  );
}
