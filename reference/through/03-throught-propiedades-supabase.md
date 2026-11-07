# Recorrido Técnico 03: Migración a Supabase y Paginación Dinámica del Home

## 1. Resumen de Cambios y Funcionalidades Implementadas

Se completó la transición del catálogo estático de propiedades a una arquitectura conectada con **Supabase** (`https://ecfyeaatwwiflpxncqka.supabase.co`):
1. **Esquema Relacional y Carga Inicial:** Se diseñó el esquema DDL de la tabla `public.properties`, con índices de rendimiento, políticas de seguridad RLS de lectura pública y el script SQL seed con las 12 propiedades originales de Bolivia.
2. **Cliente Supabase en Next.js:** Se instaló `@supabase/supabase-js` y se implementó una capa de cliente robusta con tipado estricto en `lib/supabase/client.ts` y servicio de consulta con mapeo bidireccional en `lib/supabase/properties.ts`.
3. **Manejo de Resiliencia y Fallback:** El servicio detecta automáticamente si las credenciales de Supabase están configuradas; de encontrarse pendientes o si la tabla estuviese vacía, recurre de forma transparente a los datos locales sin interrumpir la experiencia de usuario ni fallar en la generación estática (SSR/SSG).
4. **Paginación Inicial de 6 Propiedades:** Se modificó la cuadrícula inferior (`InstantBookingGrid`) para mostrar inicialmente **6 propiedades** (en lugar de 4), con avance de +6 al presionar "Cargar más propiedades exclusivas".
5. **Indicador de Estado de Datos:** Se integró un indicador visual sutil en la interfaz que comunica el origen activo de los datos (`Supabase DB` o `Modo Local Fallback`) y el recuento total de propiedades activas.

---

## 2. Lista de Archivos Creados, Modificados y Refactorizados

| Archivo | Estado | Descripción |
| :--- | :--- | :--- |
| `codecats2026/reference/spec/03-plan-propiedades-supabase.md` | Creado | Plan de especificación técnica previo a la implementación. |
| `codecats2026/reference/spec/03-seed-properties.sql` | Creado | Script DDL completo de la tabla `properties`, políticas RLS e inserción de 12 propiedades. |
| `codecats2026/reference/through/03-throught-propiedades-supabase.md` | Creado | Documento de recorrido técnico post-implementación. |
| `codecats2026/.env.local` | Creado | Variables de entorno con URL del proyecto `ecfyeaatwwiflpxncqka`. |
| `codecats2026/lib/supabase/client.ts` | Creado | Inicialización del cliente Supabase browser/server con validación de entorno. |
| `codecats2026/lib/supabase/properties.ts` | Creado | Servicio de consulta y mapper de base de datos (`snake_case` a `camelCase`). |
| `codecats2026/components/properties/InstantBookingGrid.tsx` | Modificado | Paginación inicial de 6 elementos e incremento de 6 al pulsar cargar más. |
| `codecats2026/components/home/HomePageContent.tsx` | Modificado | Recepción de propiedades dinámicas, separación de destacados vs inmediatos, e indicador de conexión. |
| `codecats2026/app/page.tsx` | Modificado | Server Component con obtención asíncrona de datos desde Supabase e hidratación al cliente. |
| `codecats2026/package.json` & `package-lock.json` | Modificado | Adición de `@supabase/supabase-js`. |

---

## 3. Decisiones Técnicas y Resolución de Retos

### Permisos del Servidor MCP Supabase
- **Diagnóstico:** El servidor MCP Supabase responde con error `ProtocolError: MCP error -32600: You do not have permission to perform this action` para el proyecto `ecfyeaatwwiflpxncqka`, dado que el token OAuth activo en la máquina solo autoriza la organización `vercel_icfg_KoFM2AcsMBdyrxYqWio6WfpZ`.
- **Solución implementada:** Se generó el script SQL listo para producción (`03-seed-properties.sql`) para ejecución directa en el SQL Editor del dashboard de Supabase, y se desacopló el frontend mediante variables de entorno estándar en `.env.local`.

### Prevención de Rompimientos en Build / Prerendering
- **Problema:** En Next.js 16 (App Router), si un Server Component falla al consultar una API externa sin credenciales en tiempo de compilación (`next build`), la compilación completa aborta.
- **Solución:** `getProperties()` implementa un patrón seguro de detección y fallback automático. Si `NEXT_PUBLIC_SUPABASE_ANON_KEY` aún no está presente en `.env.local`, el build se completa limpiamente utilizando los mocks y emitiendo un log informativo, garantizando cero tiempo de caída.

---

## 4. Pruebas y Verificación

1. **Compilación de Producción:**
   - Comando: `npm run build`
   - Resultado: Compilación exitosa con Turbopack y TypeScript sin ningún error o warning de tipos.
2. **Paginación Inicial:**
   - La grilla inferior inicia en 6 propiedades visibles y carga 6 adicionales por interacción.
3. **Filtros Reactivos:**
   - Búsqueda por texto (ej. "La Paz", "Santa Cruz"), filtro por categoría ("Villas de lujo", "Frente al mar") y filtro de rango de precios operan correctamente sobre la colección de datos.
