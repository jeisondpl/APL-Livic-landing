# Ficha Técnica — Portal APL-Livic-landing

> **LIVIC** — Operación turística, acompañamiento y cuidado de inmuebles en Santa Marta
> *"Tranquilidad para ti, cuidado total para tu inmueble"*

**Fecha de emisión:** Abril 2026
**Contexto temporal del negocio:** Temporada 2026 — Catálogo levantado con sesiones fotográficas del 22 de enero de 2026; anfitrión LIVIC con 3 años de experiencia operando inmuebles en Santa Marta.

---

## 1. Identificación del proyecto

| Campo | Valor |
|---|---|
| **Nombre del paquete** | `apl-livic-landing` |
| **Versión** | `1.0.0` |
| **Tipo** | Landing institucional + catálogo de alojamientos (SSG) |
| **Repositorio** | `C:\LIVIC\APL-proyectos-livic\APL-Livic-landing` |
| **URL productiva** | `https://livic.co` |
| **Puerto local (dev)** | `3003` |
| **Gestor de paquetes** | `pnpm@9.15.0` |
| **Deployment target** | Vercel |
| **Fecha del documento** | 2026-04-11 |
| **Temporada operativa** | 2026 |

---

## 2. Stack tecnológico

### Framework y runtime
- **Next.js** `16.1.6` (App Router, React Server Components)
- **React** `19.2.3` / **React DOM** `19.2.3`
- **TypeScript** `^5`
- **Node.js** `^20`

### UI y estilos
- **Tailwind CSS** `^4` (con `@tailwindcss/postcss`)
- **tailwindcss-animate** `^1.0.7`
- **Framer Motion** `^12.38.0` — animaciones de entrada y transiciones
- **Lucide React** `^0.563.0` — set de iconos

### Catálogo y módulos interactivos
- **Cally** `^0.9.2` — web component para selector de fechas (range picker)
- **Embla Carousel React** `^8.6.0` — carruseles de fotos en cards y detalle
- **Leaflet** `^1.9.4` + **React Leaflet** `^5.0.0` — mapas interactivos (carga diferida sin SSR)

### Fuentes
- **Geist Sans** y **Geist Mono** (via `next/font/google`)

### Linting
- **ESLint** `^9` con `eslint-config-next@16.1.6`

---

## 3. Arquitectura de rutas

El proyecto utiliza el **App Router de Next.js 16** con generación estática (SSG).

```
src/app/
├── layout.tsx             → Root layout (fonts, metadata, AnimatedBackground)
├── page.tsx               → "/" — Landing institucional
├── not-found.tsx          → 404
├── globals.css            → Tokens de tema + estilos cally/leaflet
└── catalogo/
    ├── page.tsx           → "/catalogo" — SearchFlow (buscador + resultados)
    └── [slug]/
        └── page.tsx       → "/catalogo/[slug]" — Detalle (SSG con generateStaticParams)
```

### Rutas generadas
| Ruta | Tipo | Descripción |
|---|---|---|
| `/` | Static | Landing principal |
| `/_not-found` | Static | Página 404 |
| `/catalogo` | Static | Buscador y grid de resultados |
| `/catalogo/[slug]` | SSG dinámico | Detalle de apartamento |

Slugs estáticos generados actualmente:
- `salguero-suite-1008`
- `reserva-del-mar-915`
- `estudio-moderno-519`
- `estudio-luminoso-rdm2-419`
- `loft-vista-rdm2-620`
- `loft-premium-rdm2-621`
- `suite-balcon-playa-ss615`
- `on-the-beach-rdm-931`

---

## 4. Estructura del código fuente

```
src/
├── app/                   → Rutas y layouts (App Router)
├── components/
│   ├── landing/           → Secciones exclusivas de la home
│   │   ├── HeroLanding.tsx
│   │   ├── ServiciosSection.tsx
│   │   ├── ServicioCard.tsx
│   │   ├── ValorDiferencialSection.tsx
│   │   ├── BeneficiosSection.tsx
│   │   ├── FAQSection.tsx
│   │   └── CTASection.tsx
│   ├── catalogo/          → Módulo de alojamientos (fusionado desde APL-Livic-catalogos)
│   │   ├── SearchFlow.tsx
│   │   ├── AvailabilityBar.tsx
│   │   ├── Card.tsx
│   │   ├── ApartmentDetailClient.tsx
│   │   ├── Hero.tsx / ParallaxHero.tsx
│   │   ├── Amenities.tsx
│   │   ├── HostCard.tsx
│   │   ├── LocationCard.tsx
│   │   ├── InteractiveMap.tsx
│   │   ├── LeafletMapContent.tsx
│   │   └── CTA.tsx
│   ├── layout/            → Nav, Footer globales
│   ├── shared/            → Reusables: AnimatedBackground, Badge, Section
│   └── ui/                → Primitivos: Button, ProximamenteModal
├── data/
│   ├── config.ts          → Contacto, redes, URLs globales
│   ├── landing-content.ts → Copys de todas las secciones de la home
│   └── apartments.ts      → Data source estática del catálogo
├── lib/
│   ├── catalog.ts         → API del catálogo (getAllApartments, getBySlug, getAllSlugs)
│   └── utils.ts           → Helpers (getWhatsAppLink, cn, etc.)
└── types/
    └── cally.d.ts         → Type declarations del web component Cally
```

---

## 5. Secciones de la landing (`/`)

| Orden | Sección | Componente | Propósito |
|---|---|---|---|
| 1 | **Hero** | `HeroLanding` | Tagline, imagen de portada, CTA primario/secundario |
| 2 | **Servicios** | `ServiciosSection` | 2 servicios principales + botón *"Cotiza tu alojamiento"* → `/catalogo` |
| 3 | **Valor diferencial** | `ValorDiferencialSection` | 8 tarjetas con iconos Lucide |
| 4 | **Beneficios** | `BeneficiosSection` | Lista de 7 beneficios clave |
| 5 | **FAQ** | `FAQSection` | Preguntas frecuentes + formulario |
| 6 | **CTA final** | `CTASection` | Conversión a WhatsApp |
| — | **Footer** | `Footer` | Redes sociales, contacto, copyright |

### Servicios configurados
1. **Operación de Renta Turística** — 9 características (reservas, check-in/out, limpieza, mantenimientos, reportes)
2. **Acompañamiento y Cuidado del Inmueble** — 7 características (visitas, supervisión, mantenimientos, preparación)

---

## 6. Módulo Catálogo (`/catalogo`)

### Flujo de búsqueda (`SearchFlow`)
Máquina de estados `idle → searching → results` con:
- **Mobile**: scroll vertical
- **Desktop**: track horizontal 200vw con `translateX` animado (Framer Motion)

### AvailabilityBar
Barra de búsqueda con selector de fechas (Cally) + conteo de huéspedes.

### Card de apartamento
- Carrusel Embla con flechas de navegación
- Precio, ubicación, amenidades destacadas
- Link → `/catalogo/[slug]`

### Página de detalle (`ApartmentDetailClient`)
- **DetailGallery**: grid + lightbox
- **Layout 2 columnas**: contenido + `AvailabilityBar` sticky en la derecha (desktop)
- Secciones: `Hero`, `Amenities`, `HostCard`, `LocationCard` (con `InteractiveMap` Leaflet)
- Link de retorno → `/catalogo`

---

## 7. Sistema de diseño (Tailwind v4)

Tokens definidos en `src/app/globals.css` mediante `@theme inline`:

### Paleta LIVIC
| Token | Hex | Uso |
|---|---|---|
| `--color-livic-pink` | `#E288AE` | Color de acento primario |
| `--color-livic-black` | `#0C0A0B` | Texto / foreground |
| `--color-livic-green` | `#6AB895` | CTA WhatsApp |
| `--color-livic-purple` | `#AD80B4` | Acentos secundarios |
| `--color-livic-yellow` | `#FBCA00` | Destacados |
| `--color-livic-white` | `#FFFFFF` | Backgrounds |

### Superficies y utilidades
- `--background`, `--foreground`, `--surface-100/200/300`, `--text-muted`
- Animaciones custom: `bubble-drift-1..6`, `hue-rotate-slow` (fondo animado tornasol)
- Clases utilitarias: `.card-hover`, `.animate-fill-both`, `.delay-100..800`
- Scroll-margin global de `80px` para navbar fija

### Fuentes
- `--font-sans` → Geist Sans
- `--font-mono` → Geist Mono

### Cally theming
`calendar-range` y `calendar-month::part(...)` personalizados con color de acento `#E288AE`.

---

## 8. Configuración global (`src/data/config.ts`)

```ts
CONFIG = {
  contact: {
    whatsapp: { number: "573126263634", message: "..." },
    email: "apartamentos.livic@gmail.com",
  },
  social: {
    instagram: "https://www.instagram.com/livic.aptos",
    "tik-tok": "https://www.tiktok.com/@livic.aptos",
  },
  site: {
    name: "LIVIC",
    tagline: "Tranquilidad para ti, cuidado total para tu inmueble",
    description: "Operación turística, acompañamiento y cuidado de inmuebles en Santa Marta",
    url: "https://livic.co",
    catalogoUrl: "/catalogo",
  }
}
```

---

## 9. SEO y metadata

- **Title**: *"LIVIC – Operación turística y cuidado de inmuebles"*
- **Description**: Operamos y acompañamos inmuebles en renta turística con presencia real, control operativo y atención constante.
- **Keywords**: `operación turística`, `gestión inmuebles`, `renta turística`, `Santa Marta`, `cuidado inmuebles`, `anfitrión profesional`
- **Robots**: `index, follow`
- **Idioma**: `es`
- **Metadata dinámica**: Cada detalle de apartamento genera `<title>` y `<description>` propios vía `generateMetadata()`

---

## 10. Scripts disponibles

```bash
pnpm dev      # Servidor de desarrollo en http://localhost:3003
pnpm build    # Build de producción (SSG)
pnpm start    # Servidor de producción en puerto 3003
pnpm lint     # ESLint
```

---

## 11. Despliegue

- **Plataforma**: Vercel
- **Archivo**: `vercel.json`
- **Lockfile**: `pnpm-lock.yaml` (requerido para builds reproducibles)
- **Requisito**: `"packageManager": "pnpm@9.15.0"` en `package.json` para evitar `ERR_INVALID_THIS` en Vercel

---

## 12. Dependencias críticas

| Dependencia | Versión | Rol |
|---|---|---|
| `next` | 16.1.6 | Framework |
| `react` / `react-dom` | 19.2.3 | UI runtime |
| `tailwindcss` | ^4 | Estilos |
| `framer-motion` | ^12.38.0 | Animaciones |
| `cally` | ^0.9.2 | Calendario de reservas |
| `embla-carousel-react` | ^8.6.0 | Carruseles |
| `leaflet` + `react-leaflet` | 1.9.4 / 5.0.0 | Mapas |
| `lucide-react` | ^0.563.0 | Iconografía |

---

## 13. Características clave

- **SSG completo**: todas las rutas (landing + catálogo) se pre-renderizan en build
- **Arquitectura híbrida**: proyecto institucional (landing) + vertical de reservas (catálogo) fusionados bajo una sola base
- **Carga diferida de mapas**: `InteractiveMap` usa `dynamic({ ssr: false })` para evitar errores de SSR con Leaflet
- **Web components integrados**: Cally se declara en `src/types/cally.d.ts` y se estiliza vía `::part()` en `globals.css`
- **Fondo animado**: `AnimatedBackground` con burbujas tornasol global a todas las rutas
- **Responsive dual-layout**: SearchFlow cambia entre scroll vertical (mobile) y horizontal (desktop)
- **WhatsApp-first CTA**: todos los CTAs de conversión dirigen a WhatsApp vía `getWhatsAppLink()`

---

## 14. Historial del proyecto

- **Versión inicial**: Landing institucional standalone
- **Fusión 2026-Q1**: Integración de `APL-Livic-catalogos` como subpágina `/catalogo` (eliminando el proyecto separado en `localhost:3002`)
- **Estado actual**: Proyecto único que unifica landing + catálogo + detalles de apartamentos
