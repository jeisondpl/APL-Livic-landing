# Prompt — Implementación "Detrás de Livic"

> Brief técnico-creativo estructurado para implementar la sección `#detras` en
> `APL-Livic-landing`. Diseñado bajo el framework PromptEngineeringLab: Role →
> Context → Task → Constraints → CoT → Output Spec → Acceptance.

---

## 1. Role

Sos un **Senior Frontend Engineer + Brand-aware Designer** especializado en:
- Next.js 16 (App Router, Server Components, Turbopack)
- Tailwind CSS v4 con `@theme inline` y tokens semánticos
- Sistemas de diseño consistentes, accesibilidad AA, performance mobile-first
- Composición de secciones marketing storytelling-driven

Tu trabajo es **traducir un brief de marca en componentes React production-grade** que respeten el sistema de diseño existente, sin re-inventar tokens.

---

## 2. Context (artefactos reales del proyecto)

### Stack
- Next.js **16.1.6** App Router · React 19 · TypeScript · Tailwind v4
- Build: `pnpm build` (Turbopack)
- pnpm package manager

### Tokens disponibles (`src/app/globals.css`, vía `@theme inline`)

| Token | Hex |
|---|---|
| `livic-pink` | `#E288AE` |
| `livic-purple` | `#AD80B4` |
| `livic-green` | `#6AB895` |
| `livic-yellow` | `#FBCA00` |
| `livic-black` | `#0C0A0B` |
| `livic-white` | `#FFFFFF` |
| `surface-100/200/300` | `#F5F5F5 / #F0F0F0 / #E0E0E0` |
| `text-muted` | `#6B7280` |

Tipografía: `--font-geist-sans` (var), `--font-geist-mono`.

### Utilidades disponibles
- `.card-hover` — efecto hover de cards (definido en globals.css)
- `.gradient-text` — texto con gradiente pink→purple
- `.bubble-drift-{1..6}` + `.hue-rotate-slow` — keyframes de blobs decorativos
- `.delay-{100..800}`, `.animate-fill-both` — utilities de animation-delay

### Componentes reutilizables (NO reimplementar)

| Componente | Ruta | Propósito |
|---|---|---|
| `Section` | `src/components/shared/Section.tsx` | Wrapper con `titulo`, `subtitulo`, `etiqueta`, `acento` (pink/green/purple/yellow), `id`, `centrado` |
| `Button` | `src/components/ui/Button.tsx` | Botones con variantes |
| `Nav` | `src/components/layout/Nav.tsx` | Top nav con `handleScrollTo(e, '#id')` para anchor links |

### Patrón de Section existente
Mirar `src/components/landing/ServiciosSection.tsx` para referencia: cada sección landing es un Server Component en `src/components/landing/`, usa `<Section id="..." titulo="..." acento="..." centrado>`, y se compone en `src/app/page.tsx`.

### Nav anchor links existentes
`#servicios`, `#valor`, `#beneficios`. Tu nuevo anchor: **`#detras`**.

### Asset disponible
`public/operadora.jpeg` — foto de Lina Villalba (creadora LIVIC), retrato medio cuerpo en balcón sobre el mar de Santa Marta, vestido zigzag colorido. **No alterar, no recortar destructivamente**. Usar con `<Image>` de Next.js.

---

## 3. Task

Implementar la sección **"Detrás de Livic"** accesible vía Nav `#detras`. La sección agrupa **4 bloques temáticos** que cuentan la historia humana detrás de la operación. Cada bloque es un sub-componente independiente; el componente raíz los compone.

### Anchor y posición en page
- Anchor: `#detras`
- Posición en `src/app/page.tsx`: **entre `BeneficiosSection` y `FAQSection`** (es el storytelling/cierre humano antes del CTA final).
- Link en Nav: agregar "Detrás de Livic" entre "Beneficios" y CTA WhatsApp.

---

## 4. Constraints

**Técnicos:**
- Server Components por default. Solo `'use client'` si un sub-bloque necesita state/interaction.
- Imports relativos via alias `@/`
- TypeScript strict, sin `any` ni `as unknown`
- Tailwind utilities, **no** CSS-in-JS, **no** inline `style={}` salvo dimensiones de imagen
- Responsive mobile-first: stack vertical en mobile (`< md`), grid 2-cols o asimétrico en `md/lg`
- Imágenes optimizadas: `<Image>` de `next/image` con `width`/`height` o `fill` + `sizes`

**Visuales (mantener consistencia LIVIC):**
- Usar `<Section>` para cada bloque cuando tenga sentido; los bloques internos pueden ser `<div>` o sub-componentes
- Acento principal de la sección: `purple` (no se ha usado en otras secciones aún, queda equilibrado)
- Blobs decorativos opcionales con `bubble-drift-*` y opacidad baja (`opacity-20`)
- Cards con `card-hover` + `rounded-2xl` + `border border-gray-100` + `bg-white`
- Espaciado vertical entre bloques: `py-20 md:py-24`

**Accesibilidad:**
- `<h2>` para título de sección, `<h3>` para sub-bloques, `<h4>` para items
- `alt` descriptivo en `<Image>` (no "foto" genérico)
- Contraste mínimo AA (texto sobre cards: `text-livic-black` o `text-gray-700`; sobre acentos: `text-white`)
- `aria-label` en CTA si solo tiene icono

**SEO:**
- Headings semánticos
- Texto literal escaneable, no encerrado en imágenes
- Opcional: `<meta>` adicional en `src/app/page.tsx` si Next 16 metadata API lo permite

**Performance:**
- Imagen de Lina: `priority` solo si entra en first viewport (verosímil que NO porque está en mitad de page); usar `loading="lazy"` por default
- No client-side libs adicionales

---

## 5. Chain-of-Thought obligatorio (think before coding)

Antes de escribir código, vas a producir un comentario `<!-- ANALYSIS -->` en tu primer mensaje justificando:

1. **Composición:** ¿Es una sola `<Section>` con 4 sub-bloques internos, o 4 `<Section>`s consecutivas? Defendé la decisión (impacta jerarquía visual, navegación, mantenibilidad).
2. **Acento del título:** confirmar que `purple` es el que toca, o proponer alternativa con razón.
3. **Tratamiento de la foto de Lina:** ¿`fill` cubriendo un contenedor con aspect-ratio, o `width/height` fijos? ¿En qué bloque(s) aparece — solo en bloque 1, o también en bloque 2 (historia)?
4. **Tabla de tarifas:** ¿Tabla HTML real (mejor accesibilidad), grid de cards, o ambas (tabla en `md+` y cards en mobile)?
5. **Animaciones:** qué `bubble-drift` o `delay-*` aplicar, y por qué (no abusar).

Luego de la sección `<!-- ANALYSIS -->`, generar el código.

---

## 6. Output Spec — Archivos a crear/modificar

```
APL-Livic-landing/
├── src/
│   ├── components/
│   │   └── landing/
│   │       └── DetrasDeLivicSection.tsx          ← NUEVO (root, Server Component)
│   │       └── detras/                            ← NUEVO (subfolder)
│   │           ├── HeroDetrasBlock.tsx            ← Bloque 1
│   │           ├── HistoriaLinaBlock.tsx          ← Bloque 2
│   │           ├── DetallesQueImportanBlock.tsx   ← Bloque 3
│   │           └── ModalidadesBlock.tsx           ← Bloque 4
│   ├── data/
│   │   └── detras-content.ts                      ← NUEVO (texto literal + tarifas tipados)
│   ├── app/
│   │   └── page.tsx                               ← MODIFICAR (insertar <DetrasDeLivicSection/> entre Beneficios y FAQ)
│   └── components/
│       └── layout/
│           └── Nav.tsx                            ← MODIFICAR (agregar link "Detrás de Livic" → #detras)
└── doc/
    └── prompt-detras-de-livic.md                  ← (este archivo, ya existe)
```

**Convención de naming**: bloques en `src/components/landing/detras/<Nombre>Block.tsx` (no `Section`) para distinguirlos del wrapper `<Section>`.

---

## 7. Bloques temáticos — Contenido LITERAL (no parafrasear)

### Bloque 1 — Hero Detrás

**Layout sugerido:** grid 2 columnas `md`, foto a la izquierda (aspect-ratio 4:5 portrait), texto a la derecha. Foto con esquinas `rounded-3xl`, ligera sombra `shadow-xl`, decoración: un blob pink detrás de la foto.

**Etiqueta sobre título:** `DETRÁS DE LIVIC`
**Título:** `Conoce a quienes cuidan tu propiedad`
**Subtítulo (línea inferior con sparkle):** `Hospitalidad con atención real `

**Asset:** `public/operadora.jpeg`
**Alt:** `Lina Villalba, fundadora de LIVIC, frente al mar en Santa Marta`

---

### Bloque 2 — Historia (manifesto de Lina)

**Layout:** una columna centrada, max-width `prose` (`max-w-3xl mx-auto`), texto en `text-lg leading-relaxed`. Opcional: avatar circular pequeño de Lina junto a la firma `— Lina Villalba`.

**Título:** `Más que administrar apartamentos, cuidamos experiencias`

**Texto literal (en este orden, párrafos separados):**

> Hola, soy Lina Villalba, creadora de Livic 
>
> Livic nació desde mi pasión por la hospitalidad, los detalles y el deseo de brindar tranquilidad tanto a propietarios como a huéspedes. Después de años trabajando en el sector de rentas cortas y administración turística en Santa Marta, entendí que este negocio no solo se trata de reservas… sino de confianza, atención y acompañamiento real.
>
> Junto a mi equipo trabajamos día a día para que cada propiedad esté bien cuidada, cada huésped se sienta bien recibido y cada propietario tenga la tranquilidad de contar con personas responsables y comprometidas detrás de su inversión.
>
> Nos enfocamos en una atención cercana, humana y organizada, acompañando procesos como:

**Lista (badges o pills con tilde):**
-  Atención al huésped
-  Check in y check out
-  Supervisión y limpieza
-  Coordinación de mantenimientos
-  Gestión operativa y comercial
-  Acompañamiento legal y administrativo para rentas cortas

**Cierre (en bloque destacado o pull quote):**

> En Livic creemos que los espacios bien atendidos generan mejores experiencias, mejores comentarios y mayor tranquilidad para todos.
> Porque más que alojar personas… nos gusta hacerlas sentir bienvenidas.

---

### Bloque 3 — Detalles que hacen la diferencia

**Etiqueta:** `RECOMENDACIONES`
**Título:** `Detalles que hacen la diferencia`
**Subtítulo:** `Pequeños cambios, grandes resultados — recomendaciones para optimizar y cuidar su propiedad`

**Intro corto:**

> En Livic creemos que una buena experiencia no depende solo de la decoración, sino también de los detalles funcionales que ayudan a conservar el apartamento en excelente estado y facilitan la operación turística.

**Lista (11 items)** — preferentemente grid 2-cols en `md+`, cada item card con `bg-white card-hover rounded-2xl p-5 border border-gray-100`. Icono `` con `text-livic-yellow` o `text-livic-pink` al inicio.

1. Instalar protectores o esquineros en paredes y columnas para evitar marcas y desgaste ocasionado por equipaje rodante.
2. Contar con cajones, closets o gabinetes con llave para almacenar lencería, productos de aseo y elementos operativos de uso exclusivo del equipo administrativo.
3. Utilizar protectores de colchón y almohadas impermeables para prolongar la vida útil y mantener mejores estándares de higiene.
4. Tener un inventario organizado y actualizado del apartamento para facilitar controles y reposiciones.
5. Implementar cerraduras electrónicas para mayor seguridad, control y facilidad en los ingresos.
6. Elegir mobiliario resistente y de fácil mantenimiento, especialmente en zonas costeras donde el salitre y la humedad aceleran el desgaste.
7. Disponer de utensilios básicos de cocina en buen estado y suficientes para la capacidad del apartamento.
8. Realizar mantenimientos preventivos periódicos en aires acondicionados, cerraduras, griferías y electrodomésticos para evitar emergencias durante las reservas.
9. Mantener una iluminación cálida y funcional que haga sentir el espacio más acogedor y agradable para los huéspedes.
10. Tener puntos estratégicos para carga de celulares, ganchos, espejos y pequeños detalles que mejoran significativamente la experiencia del huésped.
11. Contar con un espacio destinado para elementos de limpieza y operación facilita el orden y mejora los tiempos de atención entre reservas.

**Cierre (pull quote o nota destacada con borde left pink):**

> En nuestra experiencia, los apartamentos mejor preparados no solo generan mejores comentarios y calificaciones, sino también mayor tranquilidad para sus propietarios y una operación mucho más eficiente.
>
> "En Livic no solo pensamos en cómo se ve un apartamento, sino en cómo funciona y se conserva con el tiempo."

---

### Bloque 4 — Modalidades de Administración y Comercialización

**Etiqueta:** `SERVICIOS`
**Título:** `Modalidades de Administración y Comercialización`
**Subtítulo:** `Cada propietario es distinto. Estas son las formas en que trabajamos contigo.`

**Intro corto:**

> En Livic entendemos que cada propietario tiene necesidades diferentes, por eso contamos con distintas modalidades de trabajo que permiten adaptar la administración, comercialización y operación del inmueble de manera flexible, organizada y transparente.

#### Sub-bloque 4.1 — Creación y Configuración del Anuncio

**Título sub:** `1. Creación y configuración del anuncio`

**Incluye (lista compacta):**
-  Configuración inicial en plataformas digitales
-  Redacción y optimización del anuncio
-  Configuración de tarifas y disponibilidad
-  Parametrización de huéspedes, normas y reservas
-  Organización inicial para salida al mercado

**Dos cards comparativas lado a lado** (`grid md:grid-cols-2 gap-6`):

| | **Modalidad A — Cuenta del propietario** | **Modalidad B — Cuenta Livic** |
|---|---|---|
| Ideal para | Propietarios que desean mantener el anuncio a su nombre | Propietarios que prefieren delegar todo el manejo comercial |
| Creación y configuración | **Desde $200.000 COP** | **Sin costo inicial** |
| Propiedad del anuncio | Propietario | Livic |
| Comisión sobre reservas | 10 % | 10 % |
| Gestión operativa y comercial | Incluida | Incluida |
| Nota | En esta modalidad el anuncio queda como activo digital del propietario. | Livic asume directamente el manejo estratégico y comercial del anuncio. |

> **Visual:** cards con `bg-white rounded-2xl p-8 border-2`. La de Modalidad B con `border-livic-pink` (resaltada como "recomendada"), la A con `border-gray-200`. Incluir un badge "Recomendada" en B con `bg-livic-pink text-white text-xs px-3 py-1 rounded-full`.

#### Sub-bloque 4.2 — Fotografía Profesional

**Título sub:** `2. Fotografía profesional y material visual`

**Intro:**
> La presentación visual del inmueble es uno de los factores más importantes para aumentar reservas y mejorar el posicionamiento en plataformas digitales.

**Lista:**
-  Fotografías profesionales
-  Preparación visual y ambientación básica
-  Organización estratégica del espacio
-  Edición y optimización de imágenes
-  Videos o material audiovisual complementario

**Tarifa:**

| Servicio | Valor |
|---|---|
| Fotografía profesional | Según cotización |
| Video o material audiovisual | Según cotización |

> **Nota destacada:** El valor dependerá del tamaño del inmueble, cantidad de espacios, requerimientos visuales y tipo de contenido solicitado.

#### Sub-bloque 4.3 — Administración y Operación del Inmueble

**Título sub:** `3. Administración y operación del inmueble`

**Lista:**
-  Atención al huésped
-  Check in y check out
-  Coordinación de limpieza
-  Supervisión del inmueble
-  Coordinación de mantenimientos
-  Manejo de calendarios y reservas
-  Acompañamiento administrativo y operativo

**Tarifa (Fee administrativo mensual):**

| Tipo de inmueble | Fee mensual |
|---|---|
| Apartaestudios y apartamentos pequeños | **Desde $200.000 COP** |
| Apartamentos medianos o familiares | **Desde $300.000 COP** |
| Propiedades amplias, premium o de alta operación | Según evaluación |

> **Notas (mostrar como tarjetas pequeñas o lista bullets):**
> - Este valor contempla el acompañamiento operativo y administrativo del apartamento, seguimiento de reservas, coordinación operativa y supervisión general del inmueble.
> - Durante la etapa inicial de posicionamiento y maduración del anuncio, Livic podrá otorgar un período sin cobro de fee administrativo mensual, permitiendo enfocar los esfuerzos en fortalecer la ocupación, reputación y estabilidad comercial del inmueble.

#### Sub-bloque 4.4 — Comisión por Comercialización

**Título sub:** `4. Comisión por comercialización`

**Cuerpo destacado:**

> Livic manejará una **comisión del 10 %** sobre las reservas efectivas generadas, correspondiente a:

-  Gestión comercial
-  Atención de reservas
-  Manejo de plataformas
-  Estrategia de posicionamiento
-  Comunicación con huéspedes
-  Seguimiento operativo de la reserva

> **Nota:** La comisión será aplicada sobre el valor neto de las reservas efectivamente confirmadas.

**Visual:** card destacada full-width con `bg-livic-purple/10 border-l-4 border-livic-purple` y el "10%" gigante en `text-6xl font-black text-livic-purple` a la izquierda.

---

## 8. Few-shot — Ejemplo de un bloque ya implementado

Para que entiendas el código-pattern esperado, así se ve un bloque idiomático del proyecto (extracto, **NO copiar literal**, solo modelo):

```tsx
// src/components/landing/detras/HeroDetrasBlock.tsx
import Image from "next/image";

export default function HeroDetrasBlock() {
  return (
    <div className="grid md:grid-cols-2 gap-12 items-center">
      {/* Foto Lina + blob decorativo */}
      <div className="relative">
        <div
          aria-hidden
          className="absolute -inset-6 rounded-[2rem] bg-livic-pink/20 blur-2xl bubble-drift-2"
        />
        <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-xl">
          <Image
            src="/operadora.jpeg"
            alt="Lina Villalba, fundadora de LIVIC, frente al mar en Santa Marta"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>

      {/* Copy */}
      <div className="space-y-5">
        <span className="inline-flex items-center gap-2 px-3 py-1 text-[11px] font-semibold tracking-[0.2em] uppercase text-livic-purple bg-livic-purple/10 rounded-full">
          Detrás de Livic
        </span>
        <h2 className="text-4xl md:text-5xl font-black leading-tight text-livic-black">
          Conoce a quienes cuidan{" "}
          <span className="gradient-text">tu propiedad</span>
        </h2>
        <p className="text-lg text-text-muted">
          Hospitalidad con atención real 
        </p>
      </div>
    </div>
  );
}
```

**Notas del patrón:**
- Imports relativos vía `@/` cuando salgan del subfolder
- Solo Server Component (no `'use client'`)
- Mobile-first: `grid md:grid-cols-2` (default 1-col)
- Decoración con blob + `bubble-drift-*` + `blur-2xl`
- Etiqueta como `<span>` con `inline-flex` y rounded-full
- Gradient text en una palabra clave del título

---

## 9. Output Spec — Componente raíz esperado

```tsx
// src/components/landing/DetrasDeLivicSection.tsx
import Section from "@/components/shared/Section";
import HeroDetrasBlock from "./detras/HeroDetrasBlock";
import HistoriaLinaBlock from "./detras/HistoriaLinaBlock";
import DetallesQueImportanBlock from "./detras/DetallesQueImportanBlock";
import ModalidadesBlock from "./detras/ModalidadesBlock";

export default function DetrasDeLivicSection() {
  return (
    <Section
      id="detras"
      etiqueta="Equipo & Servicios"
      titulo="Detrás de Livic"
      subtitulo="La historia y las personas que cuidan tu propiedad como propia."
      acento="purple"
      centrado
      className="py-20 md:py-24"
    >
      <div className="space-y-24 mt-12">
        <HeroDetrasBlock />
        <HistoriaLinaBlock />
        <DetallesQueImportanBlock />
        <ModalidadesBlock />
      </div>
    </Section>
  );
}
```

> **Decisión sugerida (justificar en CoT):** una sola `<Section>` raíz con `id="detras"` agrupa los 4 bloques, así el anchor del Nav cae directo y la jerarquía semántica es clara (`<h2>` único de sección, sub-bloques con `<h3>`). Si en CoT decidís 4 secciones independientes, hay que ajustar el Nav link al primer anchor.

---

## 10. Modificación de Nav

Añadir un link entre `#beneficios` y el WhatsApp CTA:

```tsx
<a
  href="#detras"
  onClick={(e) => handleScrollTo(e, '#detras')}
  className="text-sm text-gray-600 font-medium hover:text-livic-pink transition-colors duration-200"
>
  Detrás de Livic
</a>
```

⚠ Mantener el mismo patrón visual del resto de los anchor links. En mobile (drawer/menu si existe), agregar también.

---

## 11. Modificación de page.tsx

```tsx
import DetrasDeLivicSection from "@/components/landing/DetrasDeLivicSection";

// ...
<BeneficiosSection />
<DetrasDeLivicSection />    {/* ← NUEVO, después de Beneficios */}
<FAQSection />
```

---

## 12. Tipado de contenido (`src/data/detras-content.ts`)

Sacar el texto literal (recomendaciones + tarifas) a un módulo tipado para mantenibilidad:

```ts
// src/data/detras-content.ts
export interface ModalidadAnuncio {
  nombre: string;
  ideal: string;
  creacionValor: string;
  propiedadAnuncio: string;
  comision: string;
  gestion: string;
  nota: string;
  recomendada?: boolean;
}

export interface FeeAdministrativo {
  tipo: string;
  fee: string;
  destacado?: boolean;
}

export const DETRAS_CONTENT = {
  hero: {
    etiqueta: "Detrás de Livic",
    titulo: "Conoce a quienes cuidan tu propiedad",
    subtitulo: "Hospitalidad con atención real ",
    foto: { src: "/operadora.jpeg", alt: "Lina Villalba, fundadora de LIVIC, frente al mar en Santa Marta" },
  },
  historia: {
    // texto literal, separado por párrafos
    parrafos: [/* ... ver bloque 2 ... */],
    procesos: [/* lista  ... */],
    cierre: [/* dos lineas finales ... */],
  },
  recomendaciones: {
    intro: "...",
    items: [/* 11 strings literales */],
    cierre: "...",
    quote: "En Livic no solo pensamos en cómo se ve un apartamento, sino en cómo funciona y se conserva con el tiempo.",
  },
  modalidades: {
    anuncio: {
      incluye: [/* 5 items */],
      modalidades: [
        { /* A */ },
        { /* B, recomendada: true */ },
      ] as ModalidadAnuncio[],
    },
    fotografia: { /* lista + tarifas */ },
    administracion: {
      lista: [/* 7 items */],
      fees: [/* 3 niveles */] as FeeAdministrativo[],
      notas: [/* 2 notas */],
    },
    comision: {
      porcentaje: "10%",
      incluye: [/* 6 items */],
      nota: "La comisión será aplicada sobre el valor neto de las reservas efectivamente confirmadas.",
    },
  },
} as const;
```

Esto permite cambiar copy sin tocar JSX, y testear que las tarifas no se rompen con un type-check.

---

## 13. Criterios de aceptación (verificables)

El agente que ejecute este prompt debe cumplir:

| # | Criterio | Cómo verificar |
|---|---|---|
| 1 | Existe el anchor `#detras` y el Nav scrollea suave a él | Manual: click en el Nav link |
| 2 | La foto de Lina carga sin LCP penalty en móvil | DevTools → Lighthouse score ≥ 90 en performance del root page |
| 3 | El texto literal está completo, sin parafrasear | grep "creadora de Livic " debe encontrarlo |
| 4 | Tabla de modalidades A/B con tarifas exactas | `$200.000`, `Sin costo inicial`, `10%` aparecen literal |
| 5 | Las 11 recomendaciones aparecen completas | Contar items renderizados = 11 |
| 6 | Sin uso de `any` o `as unknown` | `pnpm lint` pasa sin warnings nuevos |
| 7 | Build de producción exitoso | `pnpm build` sin errores |
| 8 | Responsive: en mobile el grid colapsa a 1-col | DevTools mobile preview en 375px |
| 9 | Tokens del proyecto reutilizados (sin nuevos hex) | grep "#[0-9a-f]\{6\}" en archivos nuevos NO debe encontrar colores hardcoded fuera de tokens |
| 10 | Server Component salvo justificación | grep "'use client'" en archivos nuevos solo si hay interaction necesaria, con comentario explicando por qué |

---

## 14. Restricciones de no-hacer

- ❌ NO usar libs nuevas (framer-motion, swiper, etc.). Animaciones via CSS/Tailwind existentes.
- ❌ NO parafrasear el texto de Lina (es voz de marca).
- ❌ NO subir más imágenes; solo `operadora.jpeg` ya está disponible.
- ❌ NO tocar Nav mobile drawer si no existe ya; si existe, replicar el pattern.
- ❌ NO crear paginas nuevas (`/equipo`, `/sobre-nosotros`). Solo sección anclada en home.
- ❌ NO modificar `globals.css` salvo que JUSTIFICA en CoT por qué un token nuevo es necesario.

---

## 15. Flujo de ejecución (cómo invocar el prompt)

```
1. Agente lee este prompt completo.
2. Produce análisis <!-- ANALYSIS --> (CoT, sección 5).
3. Genera los 6 archivos (4 bloques + raíz + content) + 2 modificaciones (page.tsx, Nav.tsx).
4. Corre `pnpm build` y `pnpm lint` localmente, reporta resultados.
5. (Opcional) Smoke test visual: tomar screenshot del root scrolleado a #detras.
6. Reporta al usuario con lista de archivos cambiados + criterios de aceptación verificados.
```

---

## Apéndice — Meta-evaluación del prompt

Auto-críticas y mejoras posibles aplicadas:
- ✅ Includes Role + Context con artefactos REALES (paths, tokens hex, componente Section verificado)
- ✅ CoT explícito antes de coding (no es opcional)
- ✅ Few-shot con código idiomático del proyecto
- ✅ Output spec con paths exactos (no "crear los componentes apropiados")
- ✅ Texto literal sin riesgo de parafraseo
- ✅ Criterios verificables (no "se ve bien")
- ⚠ Asume foto `operadora.jpeg` está optimizada — si pesa >500KB sugerir conversión a WebP/AVIF
- ⚠ No incluye dark mode (el proyecto no lo soporta hoy según `globals.css` solo tiene `:root`)
