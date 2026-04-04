# APL-Landing-Page

Landing page institucional de LIVIC - Operación turística, acompañamiento y cuidado de inmuebles.

## Tecnologías

- Next.js 16.1.6 (App Router)
- React 19.2.3
- TypeScript 5
- Tailwind CSS v4
- Framer Motion 12.38.0
- Lucide React 0.563.0

## Desarrollo

```bash
# Instalar dependencias
pnpm install

# Servidor de desarrollo (puerto 3003)
pnpm dev

# Build para producción
pnpm build

# Servidor de producción
pnpm start
```

## Estructura del Proyecto

```
src/
├── app/              # Next.js App Router
├── components/
│   ├── layout/       # Nav, Footer
│   ├── landing/      # Secciones específicas landing
│   ├── shared/       # Componentes reutilizados de catalogos
│   └── ui/           # Componentes UI base
├── data/             # Contenido estático
└── lib/              # Utilidades
```

## Contenido

El contenido de la landing está basado en el archivo `mision-vision.md` ubicado en la raíz del monorepo.

## Deployment

Este proyecto está configurado para deployment en Vercel.

- **Puerto desarrollo**: 3003
- **Dominio sugerido**: livic.co
