import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Forzar el workspace root al directorio del landing. Next 16 Turbopack
  // detecta automáticamente el root buscando lockfiles hacia arriba, y como
  // existe un pnpm-lock.yaml en el directorio padre del monorepo, elegía mal
  // el root y no encontraba tailwindcss ni el resto de node_modules.
  turbopack: {
    root: path.resolve(__dirname),
  },

  images: {
    // Cloudinary CDN — usado para servir las fotos de apartamentos.
    // El dominio queda fijo (`res.cloudinary.com`) independiente del cloud name.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
    // El componente Cards usa quality={80}; sumamos 75 (default Next/Image)
    // para evitar warnings.
    qualities: [75, 80, 90],
  },
};

export default nextConfig;
