# Plan de Mejora SEO — Outrick
**Fecha:** 2026-05-07  
**Stack:** Next.js 16 App Router · Vercel · TypeScript  
**Páginas actuales:** `/` y `/score`

---

## Diagnóstico rápido

| Categoría | Estado |
|-----------|--------|
| Crawlability | ✅ SSR nativo Next.js |
| robots.txt | ✅ Correcto |
| Sitemap | ⚠️ Solo 2 URLs |
| Canonical | ✅ Implementado |
| hreflang | 🔴 ROTO — apunta a /en y /es que no existen |
| OG images | 🔴 og-home.png y og-score.png no existen en /public |
| Structured data | ⚠️ Schema incorrecto (LocalBusiness genérico) |
| Blog / contenido | 🔴 CERO páginas de contenido |
| Páginas de servicios | 🔴 No existen |
| score metadata | ⚠️ Solo en español, sin versión EN |

---

## Fase 1 — Bloqueos críticos (hacer YA antes de cualquier otra cosa)

### 1.1 Arreglar hreflang roto

**Problema:** El HTML generado tiene:
```html
<link rel="alternate" hrefLang="en" href="https://outrick.com/en"/>
<link rel="alternate" hrefLang="es" href="https://outrick.com/es"/>
```
Pero `/en` y `/es` devuelven 404. Esto le dice a Google que hay versiones en idiomas que no existen → Google ignora o penaliza el hreflang completo.

**Decisión (elegir una opción):**

**Opción A — Eliminar hreflang (más simple):**  
Si el sitio es solo en inglés y el `/score` es el único contenido en español, quitar los alternates completamente hasta tener rutas reales.

```tsx
// app/layout.tsx — borrar las alternates de idiomas, dejar solo canonical
export const metadata: Metadata = {
  alternates: {
    canonical: 'https://outrick.com',
    // sin languages
  },
}
```

**Opción B — Crear rutas reales (recomendada si quieren SEO bilingüe):**  
Crear `app/[lang]/page.tsx` con `generateStaticParams` para `en` y `es`, renderizando el mismo contenido con `translations[lang]`.

```
app/
  [lang]/
    page.tsx          ← usa translations[lang] para renderizar
    layout.tsx        ← metadata dinámica por idioma
  page.tsx            ← redirect a /en o detecta idioma
```

**Acción inmediata:** Si no van a crear las rutas esta semana → Opción A ahora, Opción B como tarea planificada.

---

### 1.2 Crear las imágenes OG

**Problema:** `layout.tsx` referencia `/og-home.png` y `score/layout.tsx` referencia `/og-score.png`, pero `/public/` solo tiene SVGs de Next.js por defecto.

Si Google/Twitter/LinkedIn no pueden cargar la imagen OG, las previews sociales no funcionan.

**Fix:** Crear las imágenes con Next.js Image Generation o subir PNGs a `/public/`:

```
public/
  og-home.png    (1200×630px)
  og-score.png   (1200×630px)
```

O usar `app/opengraph-image.tsx` con `ImageResponse`:

```tsx
// app/opengraph-image.tsx
import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }

export default async function OGImage() {
  return new ImageResponse(
    <div style={{ background: '#0D0D14', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px' }}>
      <h1 style={{ color: '#fff', fontSize: 72, fontWeight: 700 }}>
        Real Growth Backed by Data
      </h1>
    </div>
  )
}
```

---

### 1.3 Arreglar metadata de `/score` — idioma inconsistente

**Problema:** `score/layout.tsx` tiene `locale: 'es_ES'` y título/descripción en español, pero la URL es `/score` sin indicación de idioma. Google no puede determinar el idioma real de la página.

**Fix:**

```tsx
// app/score/layout.tsx
export const metadata: Metadata = {
  title: 'Free Digital Score | Outrick',           // EN primero
  description: 'Get a 0-100 score of your digital presence. Actionable recommendations in 15 minutes. 100% free.',
  openGraph: {
    locale: 'en_US',                               // corregir a en_US
    // ...
  },
}
```

Si la página es intencionalmente en español → crear `/es/score` y redirigir `/score` a `/es/score` con `redirect()`.

---

## Fase 2 — Schema.org y datos estructurados

### 2.1 Cambiar LocalBusiness → ProfessionalService

`LocalBusiness` es para restaurantes y tiendas físicas. Outrick es una consultoría digital.

```tsx
// components/JsonLd.tsx
{
  '@type': 'ProfessionalService',    // antes: 'LocalBusiness'
  '@id': 'https://outrick.com/#business',
  name: 'Outrick',
  url: 'https://outrick.com',
  description: 'Data-driven growth consulting for SMBs.',
  serviceType: 'Business Growth Consulting',
  areaServed: {
    '@type': 'Country',
    name: 'United States',
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Hollywood',
    addressRegion: 'FL',
    addressCountry: 'US',
  },
  // Agregar:
  sameAs: [
    'https://www.linkedin.com/company/outrick',   // si existe
  ],
}
```

### 2.2 Agregar WebSite schema con SearchAction

```tsx
{
  '@type': 'WebSite',
  '@id': 'https://outrick.com/#website',
  url: 'https://outrick.com',
  name: 'Outrick',
  publisher: { '@id': 'https://outrick.com/#business' },
}
```

### 2.3 Mover FAQPage al componente correcto

`FAQPage` en el root layout se aplica a todas las páginas. Moverlo solo al componente de la sección FAQ en el homepage:

```tsx
// components/FAQ.tsx (o donde esté la sección de FAQ)
<script type="application/ld+json" ... /> // solo el FAQPage aquí
```

---

## Fase 3 — Expansión de contenido (impacto mayor a 3 meses)

Esta es la mayor oportunidad de crecimiento orgánico. Con solo 2 URLs el sitio no puede rankear para nada más allá de branded searches.

### 3.1 Blog (prioridad alta)

Crear `app/blog/` con artículos targeting long-tail keywords del nicho de consultoría para SMBs:

**URLs objetivo:**
```
/blog/how-to-measure-smb-growth-metrics
/blog/ai-automation-for-small-business
/blog/ux-optimization-increase-conversions
/blog/data-driven-marketing-vs-gut-feeling
/blog/google-analytics-4-setup-small-business
```

**Arquitectura de rutas:**
```
app/
  blog/
    page.tsx              ← índice del blog
    [slug]/
      page.tsx            ← artículo individual con generateStaticParams
      layout.tsx          ← metadata dinámica por artículo
  lib/
    posts.ts              ← array de posts (sin CMS, simple y rápido)
```

**Schema por artículo:**
```json
{
  "@type": "BlogPosting",
  "headline": "...",
  "author": { "@type": "Organization", "name": "Outrick" },
  "publisher": { "@id": "https://outrick.com/#business" },
  "datePublished": "...",
  "dateModified": "..."
}
```

### 3.2 Páginas de servicios

Cada servicio en una URL propia con keyword primario:

```
/services/ai-automation          ← "AI automation for small business"
/services/ux-optimization        ← "UX optimization consulting"
/services/performance-metrics    ← "business performance metrics setup"
/services/growth-consulting      ← "data-driven growth consulting"
```

Cada página con:
- Metadata única (title 50-60 chars, description 120-160 chars)
- H1 con keyword primario
- Schema `Service` con `provider`, `serviceType`, `description`

---

## Fase 4 — Sitemap y robots

### 4.1 Expandir sitemap

Cuando se creen nuevas páginas, el sitemap las debe incluir automáticamente:

```tsx
// app/sitemap.ts — versión expandida
import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/posts'   // cuando exista el blog

export default async function sitemap(): MetadataRoute.Sitemap {
  const url = process.env.NEXT_PUBLIC_SITE_URL || 'https://outrick.com'
  const posts = await getAllPosts()

  const blogUrls = posts.map((post) => ({
    url: `${url}/blog/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [
    { url, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${url}/score`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${url}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    ...blogUrls,
  ]
}
```

### 4.2 robots.ts — agregar Disallow para paths de utilidad

```tsx
// app/robots.ts
return {
  rules: [
    {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/_next/'],   // bloquear paths internos
    },
  ],
  sitemap: `${url}/sitemap.xml`,
}
```

---

## Fase 5 — Performance y Core Web Vitals

Next.js App Router ya da SSR gratis, pero hay trabajo pendiente:

### 5.1 Preloads y fonts
- Verificar que Inter Tight se preload correctamente (Next.js `next/font` lo hace automático ✅)
- Eliminar pesos de fuente no usados (actualmente carga 300/400/500 de Inter Tight — verificar si el 300 se usa)

### 5.2 GSAP y Framer Motion
- Ambas librerías están en `dependencies` pero deberían lazy-load en secciones específicas
- Framer Motion + GSAP juntos = ~100KB extra en el bundle

```tsx
// Importar dinámicamente en componentes de animación
const MotionDiv = dynamic(() => import('framer-motion').then(m => m.motion.div))
```

### 5.3 Headers de cache en next.config.ts

```ts
// next.config.ts
const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ]
  },
}
```

---

## Resumen priorizado

| # | Tarea | Impacto | Esfuerzo | Plazo |
|---|-------|---------|----------|-------|
| 1 | Arreglar hreflang roto | 🔴 Alto | Bajo (1h) | Esta semana |
| 2 | Crear og-home.png y og-score.png | 🔴 Alto | Bajo (2h) | Esta semana |
| 3 | Corregir locale de /score (es_ES → en_US) | 🟡 Medio | Bajo (15min) | Esta semana |
| 4 | Cambiar schema LocalBusiness → ProfessionalService | 🟡 Medio | Bajo (30min) | Esta semana |
| 5 | Mover FAQPage al componente correcto | 🟡 Medio | Bajo (30min) | Esta semana |
| 6 | Crear blog con 3-5 artículos iniciales | 🔴 Alto | Alto (1-2 semanas) | Mes 1 |
| 7 | Crear páginas de servicios individuales | 🔴 Alto | Medio (3-5 días) | Mes 1 |
| 8 | Expandir sitemap con blog y servicios | 🟡 Medio | Bajo (1h) | Cuando existan las páginas |
| 9 | robots.ts — agregar Disallow | 🟢 Bajo | Bajo (15min) | Mes 1 |
| 10 | Lazy-load GSAP + Framer Motion | 🟡 Medio | Medio (1 día) | Mes 2 |
| 11 | Headers de seguridad en next.config.ts | 🟢 Bajo | Bajo (30min) | Mes 2 |
| 12 | Rutas bilingüe /en y /es reales | 🟡 Medio | Alto (1 semana) | Mes 2 |

---

## Próximos pasos inmediatos

Ejecutar en este orden:
1. `app/layout.tsx` → eliminar hreflang o crear rutas `/en` y `/es`
2. `public/` → agregar og-home.png (1200×630) o crear `app/opengraph-image.tsx`
3. `app/score/layout.tsx` → cambiar locale a `en_US` y título a inglés
4. `components/JsonLd.tsx` → cambiar a `ProfessionalService`, mover FAQPage
5. Planificar sprint de contenido: blog + páginas de servicios
