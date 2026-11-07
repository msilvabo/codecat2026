# Plan de Especificación 03: Conexión a Supabase y Catálogo Dinámico de Propiedades

## 1. Objetivo y Alcance de la Funcionalidad

Migrar la fuente de datos fija (mock data en `codecats2026/data/mock-properties.ts`) hacia una base de datos relacional en **Supabase** (proyecto `ecfyeaatwwiflpxncqka`), consumiendo las propiedades en tiempo real desde la página principal (`HomePageContent`) y ajustando la paginación inicial inferior a **6 propiedades**.

### Alcance
1. **Verificación de Conectividad Supabase y MCP:**
   - Diagnóstico del acceso al proyecto `ecfyeaatwwiflpxncqka`.
   - Resolución de permisos MCP y/o provisión de credenciales (`NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY`).
2. **Definición del Esquema Relacional (`properties`):**
   - Creación de la tabla `properties` en PostgreSQL con todos los atributos necesarios (ubicación, precios, specs, imágenes, amenities, flags de filtrado).
   - Activación de Row Level Security (RLS) con política de lectura pública (`SELECT` para anónimos).
3. **Migración y Carga de Datos Iniciales (Seed Data):**
   - Inserción completa de las 12 propiedades existentes en los mocks (2 en Colección Signature y 10 en Reserva Inmediata).
4. **Capa de Conexión en Next.js (App Router):**
   - Autorización e instalación de `@supabase/supabase-js`.
   - Creación del cliente Supabase (`lib/supabase/client.ts` y `lib/supabase/server.ts`).
   - Servicio tipado de mapeo y consulta (`lib/supabase/properties.ts`).
5. **Actualización de la Interfaz del Home:**
   - Lectura dinámica de propiedades desde Supabase en la página principal.
   - Ajuste de la paginación inicial en la grilla inferior (`InstantBookingGrid`) de 4 a **6 propiedades** iniciales con incremento de 6 al cargar más.
   - Mantenimiento integral del filtrado reactivo por categorías, buscador de destinos y rango de precios.

---

## 2. Diagnóstico de Conexión y MCP (Proyecto: `ecfyeaatwwiflpxncqka`)

### Estado Actual del Diagnóstico
- **Dominio Supabase:** `https://ecfyeaatwwiflpxncqka.supabase.co/rest/v1/` está activo y respondiendo correctamente (`HTTP 401 Unauthorized - UNAUTHORIZED_MISSING_API_KEY`).
- **Servidor MCP Supabase:** El token OAuth actual del MCP tiene acceso a la organización `vercel_icfg_KoFM2AcsMBdyrxYqWio6WfpZ` (proyectos: `bdfsovykxgaulxfzsduc`, `tvevzamaaorchovkcqlm`, `itzhqwamsllmjuhevvux`, `mdgvrevferodwmufmtpz`).
- **Incidencia Detectada:** Al consultar el proyecto `ecfyeaatwwiflpxncqka` vía MCP, Supabase retorna:
  ```json
  ProtocolError: MCP error -32600: You do not have permission to perform this action
  ```
  Esto ocurre porque `ecfyeaatwwiflpxncqka` pertenece a otra organización o no fue seleccionado en la pantalla de consentimiento OAuth al conectar el servidor MCP.

### Vías de Resolución para Ejecución
- **Opción A (Recomendada vía MCP):** Re-autorizar el MCP de Supabase o vincular la organización/proyecto `ecfyeaatwwiflpxncqka` a la sesión OAuth para que el agente ejecute los DDL y Seeds directamente vía `execute_sql`.
- **Opción B (Directa con script SQL):** Ejecutar el script SQL DDL + SEED provisto a continuación directamente en el **SQL Editor** del dashboard de Supabase de `ecfyeaatwwiflpxncqka`, y suministrar las claves en `codecats2026/.env.local`.

---

## 3. Estructuras de Datos / Esquema Supabase

### Tabla `properties`

```sql
-- Habilitar extensión para UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Creación de la tabla properties
CREATE TABLE IF NOT EXISTS public.properties (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    city TEXT NOT NULL,
    neighborhood TEXT NOT NULL,
    zone TEXT,
    country TEXT NOT NULL DEFAULT 'Bolivia',
    price_per_night NUMERIC(10, 2) NOT NULL,
    total_price NUMERIC(10, 2),
    total_nights INTEGER,
    currency VARCHAR(10) NOT NULL DEFAULT 'USD',
    rating NUMERIC(3, 2) NOT NULL DEFAULT 5.0,
    reviews_count INTEGER NOT NULL DEFAULT 0,
    images TEXT[] NOT NULL DEFAULT '{}',
    total_photos INTEGER,
    badges TEXT[] DEFAULT '{}',
    specs JSONB NOT NULL DEFAULT '{"guests": 1, "bedrooms": 1, "beds": 1, "bathrooms": 1}'::jsonb,
    amenities TEXT[] NOT NULL DEFAULT '{}',
    available_dates TEXT,
    host JSONB,
    is_featured BOOLEAN NOT NULL DEFAULT false,
    is_instant_book BOOLEAN NOT NULL DEFAULT false,
    is_superhost BOOLEAN NOT NULL DEFAULT false,
    is_guest_favorite BOOLEAN NOT NULL DEFAULT false,
    is_beachfront BOOLEAN NOT NULL DEFAULT false,
    is_pet_friendly BOOLEAN NOT NULL DEFAULT false,
    operation_type VARCHAR(20) NOT NULL DEFAULT 'RENT',
    property_type VARCHAR(50) NOT NULL DEFAULT 'apartment',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Índices de optimización para búsquedas y filtros
CREATE INDEX IF NOT EXISTS idx_properties_is_featured ON public.properties(is_featured);
CREATE INDEX IF NOT EXISTS idx_properties_operation_type ON public.properties(operation_type);
CREATE INDEX IF NOT EXISTS idx_properties_property_type ON public.properties(property_type);
CREATE INDEX IF NOT EXISTS idx_properties_price ON public.properties(price_per_night);
CREATE INDEX IF NOT EXISTS idx_properties_city ON public.properties(city);

-- Configuración de Row Level Security (RLS)
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Lectura pública de propiedades"
    ON public.properties
    FOR SELECT
    TO anon, authenticated
    USING (true);
```

---

## 4. Componentes y Archivos Involucrados en Next.js

```
codecats2026/
├── .env.local                          # [NUEVO] Variables de entorno Supabase
├── lib/
│   └── supabase/
│       ├── client.ts                   # [NUEVO] Cliente Supabase browser-side
│       ├── server.ts                   # [NUEVO] Cliente Supabase para Server Components
│       └── properties.ts               # [NUEVO] Servicio de consulta y mapeo BD -> TypeScript
├── components/
│   ├── home/
│   │   └── HomePageContent.tsx         # [MODIFICAR] Recibir o cargar propiedades de Supabase
│   └── properties/
│       └── InstantBookingGrid.tsx      # [MODIFICAR] Paginación inicial de 6 elementos
├── types/
│   └── property.ts                     # [REVISIÓN] Tipo de fila de Supabase (PropertyRow)
└── app/
    └── page.tsx                        # [MODIFICAR] Carga inicial SSR/Server Component desde Supabase
```

---

## 5. Pasos Detallados de Implementación

### Paso 1: Autorización e Instalación de Dependencias
- Solicitar aprobación formal al usuario para instalar `@supabase/supabase-js`.
- Comando: `npm install @supabase/supabase-js` en `codecats2026/`.

### Paso 2: Creación de Esquema y Carga de Datos en Supabase
- Si el usuario habilita permisos en MCP: ejecutar script DDL y SEED mediante la herramienta MCP `execute_sql`.
- Si el usuario ejecuta el script manualmente: proveer el archivo SQL listo con los 12 registros de `mock-properties.ts`.

### Paso 3: Configuración de Variables de Entorno
- Crear `codecats2026/.env.local` con:
  ```env
  NEXT_PUBLIC_SUPABASE_URL=https://ecfyeaatwwiflpxncqka.supabase.co
  NEXT_PUBLIC_SUPABASE_ANON_KEY=[TU_SUPABASE_ANON_KEY]
  ```

### Paso 4: Capa de Acceso a Datos (`lib/supabase/`)
- Implementar `client.ts` con `createClient` de `@supabase/supabase-js`.
- Implementar `properties.ts` con funciones:
  - `getProperties()`: Consulta `properties` ordenado por relevancia/fecha.
  - Mapper `mapRowToProperty(row)`: Convierte columnas `snake_case` de Postgres a la interfaz `Property` en `camelCase`.

### Paso 5: Modificación de la Página Principal y Paginación
- Modificar `app/page.tsx` para obtener las propiedades desde Supabase (Server Component) o pasar datos hidratados a `HomePageContent`.
- En `InstantBookingGrid.tsx`:
  - Cambiar `visibleCount` inicial de 4 a **6**.
  - Ajustar el incremento del botón "Cargar más" a **+6**.

---

## 6. Criterios de Aceptación y Verificación

1. **Persistencia en Supabase:** La tabla `properties` cuenta con las 12 propiedades iniciales cargadas y verificadas.
2. **Lectura Dinámica:** Al cargar la página principal, los datos mostrados provienen de Supabase y no de constantes estáticas hardcodeadas.
3. **Paginación Inicial de 6:** La sección inferior muestra exactamente 6 propiedades al iniciar (si existen al menos 6), y el botón "Cargar más" amplía la lista de 6 en 6.
4. **Filtros Funcionales:** El buscador de destinos, las categorías superiores y el modal de rango de precios continúan filtrando la data obtenida de Supabase sin romper la interfaz.
5. **Cero regresiones visuales:** Se preserva el diseño *dark mode luxury*, la tipografía **SF Pro Display** y la responsividad.
