# Plan de Especificación 01: Página Principal (Home) - Codicats Airbnb Replica

## 1. Objetivo y Alcance de la Funcionalidad

Construir la página de inicio (`/`) de la aplicación **Codicats Airbnb Replica** basada fielmente en el diseño de referencia ubicado en `codecats2026/reference/pages/home/screen.png` y la maqueta `codecats2026/reference/pages/home/code.html`.

La página principal ofrecerá una experiencia visual oscura (*dark mode luxury*) fluida, responsiva y moderna para explorar alquileres vacacionales y temporales, con datos ficticios realistas (propiedades en La Paz, Cochabamba, Santa Cruz, etc.) e interfaces tipadas en TypeScript, preparando el terreno para la futura integración con Supabase.

### Alcance
- **Navegación Superior (`Navbar`):** Logotipo Codicats/Airbnb, selector de tipo de experiencia/alojamiento, botón para publicar espacio, selectores de idioma/moneda y avatar de perfil de usuario.
- **Hero & Buscador Flotante (`HeroSearch`):** Encabezado con tipografía de alto impacto y píldora flotante de búsqueda multidestino (Dónde, Fechas, Huéspedes) con botón de búsqueda.
- **Selector de Categorías Rápidas (`CategoryFilters`):** Carrusel horizontal con categorías de alojamiento ("Todo", "Villas de lujo", "Frente al mar", "Cabañas en el bosque", "Áticos con piscina", "Pet friendly") y botón de filtros avanzados.
- **Colección Signature (`FeaturedCollections`):** Sección destacada de 2 columnas para propiedades premium ("Alojamientos destacados para tus fechas"), con detalles completos de capacidad, precio por noche, precio total, insignias y botón "Reservar".
- **Grilla de Reserva Inmediata (`InstantBookingGrid`):** Grilla responsiva de 4 columnas para propiedades con reserva express, tabs de filtrado rápido y botón "Cargar más propiedades exclusivas".
- **Pie de Página (`Footer`):** Distribución de 4 columnas (Soporte, Comunidad, Anfitriones, Acerca de) y barra inferior con selector de localización y enlaces legales.
- **Interactividad en Cliente:** Toggle interactivo de favoritos (corazón con estado guardado/no guardado), tabs activos de categorías y microinteracciones fluidas.
- **Manejo de Datos Ficticios (Mocks):** Estructura completa de tipos TypeScript (`Property`, `Host`, `ReviewSummary`, etc.) y archivo de datos enriquecido con imágenes de alta resolución.

---

## 2. Componentes y Rutas Involucradas en Next.js

### Rutas
- `codecats2026/app/layout.tsx`: Configuración global de metadatos, tema oscuro por defecto y tipografía SF Pro Display.
- `codecats2026/app/globals.css`: Integración de la tipografía **SF Pro Display**, variables de color temáticas y estilos para scrollbars personalizados.
- `codecats2026/app/page.tsx`: Composición principal de Server Component integrando las diferentes secciones modulares.

### Jerarquía de Componentes Modulares
```
codecats2026/
├── types/
│   └── property.ts                     # Definiciones de TypeScript para propiedades y filtros
├── data/
│   └── mock-properties.ts              # Catálogo de datos ficticios enriquecidos
├── components/
│   ├── ui/
│   │   ├── Badge.tsx                   # Badges reutilizables (Favorito, Superanfitrión, etc.)
│   │   ├── FavoriteButton.tsx          # Botón interactivo de corazón (Client Component)
│   │   └── Icons.tsx                   # Iconografía SVG optimizada y tipada
│   ├── layout/
│   │   ├── Navbar.tsx                  # Barra de navegación principal
│   │   └── Footer.tsx                  # Pie de página institucional
│   ├── search/
│   │   └── HeroSearch.tsx              # Sección Hero y buscador interactivo
│   ├── categories/
│   │   └── CategoryFilters.tsx         # Carrusel de categorías con selección activa
│   └── properties/
│       ├── FeaturedPropertyCard.tsx    # Tarjeta de gran formato para Colección Signature
│       ├── PropertyCard.tsx            # Tarjeta de 4 columnas para reservas inmediatas
│       ├── FeaturedCollections.tsx     # Contenedor de la Colección Signature
│       └── InstantBookingGrid.tsx      # Grilla de reservas inmediatas con tabs
```

---

## 3. Estructuras de Datos / Modelo Futuro para Supabase

Aunque en esta fase se utilizarán mocks en TypeScript, la estructura se alinea anticipadamente con el esquema relacional que se creará posteriormente en Supabase vía MCP:

### Modelo `properties`
- `id`: UUID (Primary Key)
- `title`: `text` (ej. "Villa Sanctuary con Piscina Templada")
- `slug`: `text` (Unique)
- `description`: `text`
- `operation_type`: `enum('RENT', 'SALE')`
- `property_type`: `enum('villa', 'apartment', 'house', 'penthouse', 'cabin')`
- `city`: `text` (ej. "La Paz", "Cochabamba", "Santa Cruz")
- `neighborhood`: `text` (ej. "Calacoto", "Samaipata")
- `country`: `text` (ej. "Bolivia")
- `price_per_night`: `numeric`
- `total_price`: `numeric`
- `currency`: `text` (default: 'USD')
- `rating`: `numeric` (ej. 4.98)
- `reviews_count`: `integer`
- `images`: `text[]` (Array de URLs)
- `badges`: `text[]` (ej. `['FAVORITE', 'SUPERHOST', 'INSTANT_BOOK']`)
- `guests`: `integer`
- `bedrooms`: `integer`
- `beds`: `integer`
- `bathrooms`: `integer`
- `amenities`: `text[]` (ej. `['Jacuzzi privado', 'Wifi 500 Mbps', 'Calefacción']`)
- `available_dates`: `text` (ej. "14 al 20 nov.")
- `host`: `jsonb` (`{ name: string, is_superhost: boolean, avatar_url?: string }`)
- `is_featured`: `boolean`
- `is_instant_book`: `boolean`

---

## 4. Pasos Detallados de Implementación

1. **Tipografía y Estilos Base:**
   - Incorporar la fuente **SF Pro Display** en `app/globals.css` y `app/layout.tsx`.
   - Ajustar los colores del tema en `globals.css` (`#0B0F17`, `#151D2A`, `#233044`, `#FF385C`, `#10B981`).
2. **Definición de Tipos y Mock Data:**
   - Crear `types/property.ts` con interfaces TypeScript estrictas.
   - Crear `data/mock-properties.ts` con propiedades destacadas y regulares basadas en las referencias visuales.
3. **Componentes Base e Iconos (`components/ui`):**
   - Crear `Icons.tsx` con SVGs limpios (Airbnb logo, estrellas, pines de ubicación, categorías, filtros).
   - Crear `Badge.tsx` y `FavoriteButton.tsx` (con microinteracción de cambio de color al hacer click).
4. **Componentes de Layout (`components/layout`):**
   - Crear `Navbar.tsx` con navegación por pestañas y menú de usuario.
   - Crear `Footer.tsx` con enlaces organizados en 4 columnas y barra legal.
5. **Componentes de Búsqueda y Categorías (`components/search` y `components/categories`):**
   - Crear `HeroSearch.tsx` con inputs para Dónde, Fechas y Huéspedes.
   - Crear `CategoryFilters.tsx` con categorías interactivas y scroll horizontal.
6. **Componentes de Propiedades (`components/properties`):**
   - Crear `FeaturedPropertyCard.tsx` para las propiedades de la Colección Signature.
   - Crear `PropertyCard.tsx` para la cuadrícula de 4 columnas.
   - Crear `FeaturedCollections.tsx` y `InstantBookingGrid.tsx`.
7. **Página Principal (`app/page.tsx`):**
   - Ensamblar todas las secciones manteniendo la arquitectura de Next.js App Router.
8. **Verificación y Calidad:**
   - Ejecutar verificación de tipos (`npm run build`).
   - Validar responsividad (móvil, tablet, desktop).

---

## 5. Criterios de Aceptación

- [ ] **Fidelidad Visual:** La página replica de forma coherente el diseño oscuro, paleta de colores y distribución de `reference/pages/home/screen.png` y `code.html`.
- [ ] **Tipografía:** Se aplica **SF Pro Display** en todos los elementos de la interfaz.
- [ ] **Modularidad:** Todo componente repetido (tarjetas, botones, badges) está encapsulado en su respectivo componente reutilizable.
- [ ] **Cero Dependencias No Autorizadas:** No se instalan librerías adicionales en `package.json`.
- [ ] **Interactividad Básica:** El botón de favoritos responde al click de forma fluida, y los filtros/tabs permiten interacción.
- [ ] **Compilación limpia:** `npm run build` finaliza con código 0 y sin errores de TypeScript ni sintaxis.
