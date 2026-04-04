/**
 * not-found.tsx
 * Página 404 personalizada
 */

import Link from "next/link";
import { Home } from "lucide-react";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-livic-pink/10 via-livic-purple/10 to-livic-green/10">
      <div className="max-w-md mx-auto px-6 text-center">
        <h1 className="text-8xl font-bold text-livic-pink mb-4">404</h1>
        <h2 className="text-3xl font-bold text-foreground mb-4">
          Página no encontrada
        </h2>
        <p className="text-text-muted mb-8">
          La página que buscas no existe o ha sido movida.
        </p>
        <Button href="/" variant="primary" size="lg">
          <Home className="w-5 h-5" />
          Volver al inicio
        </Button>
      </div>
    </div>
  );
}
