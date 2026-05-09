import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
