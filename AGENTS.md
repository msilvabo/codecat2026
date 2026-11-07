# 🐱 Codicats - Lineamientos Generales del Proyecto (Airbnb Replica)

Bienvenido a las directrices oficiales para agentes de IA y desarrolladores del proyecto **Codicats Airbnb Replica**. Este archivo establece el contexto general, arquitectura técnica, directrices de diseño, reglas de desarrollo y flujo de documentación obligatorios.

---

## 📌 1. Visión y Alcance del Proyecto

- **Propósito:** Proyecto demostrativo desarrollado para la comunidad de **Codicats**.
- **Concepto:** Réplica moderna y personalizada (no exacta) de **Airbnb**, orientada a ofrecer una experiencia visual y funcional fluida y atractiva.
- **Modelos de Propiedades:**
  - **Alquiler:** Renta vacacional y temporal de departamentos y casas en diferentes ciudades.
  - **Compra / Venta:** Venta de inmuebles (departamentos y casas) en diferentes ciudades.
- **Funcionalidades Clave:**
  - Exploración y filtrado dinámico de propiedades por ciudad, tipo de operación (alquiler vs. compra) y tipo de alojamiento (casas, departamentos, villas).
  - Páginas de detalle completas con información del inmueble, galería fotográfica, amenidades, anfitrión y ubicación.
  - Sistema de reserva de fechas para alquileres y solicitud de contacto/visita para propiedades en venta.
  - Cálculo de precios, tarifas de servicio y confirmación de reserva.

---

## 🛠️ 2. Arquitectura y Stack Tecnológico

### Frontend (Web)
- **Framework:** [Next.js](https://nextjs.org/) (App Router, React 19, TypeScript).
- **Estilos:** Tailwind CSS v4.
- **Tipografía Obligatoria:** **SF Pro Display** en toda la aplicación.

### Backend y Base de Datos
- **Plataforma:** [Supabase](https://supabase.com/) (PostgreSQL, Autenticación, Storage, Row Level Security).
- **Conexión mediante MCP:** La gestión, creación del esquema de datos, tablas y migraciones se realiza a través de una conexión mediante un servidor **MCP (Model Context Protocol)** conectado a Supabase. Toda operación estructural en la base de datos debe gestionarse por esta vía.

---

## 🎨 3. Referencias Visuales y Diseño (Gliss)

- **Carpeta de Referencias:** Los diseños y pantallas se encuentran en la carpeta `reference/pages/` (diseños rescatados de Gliss para las distintas vistas del sitio, junto a recursos de diseño como maquetas y capturas).
- **Directriz de Uso:**
  - Antes de maquetar cualquier vista o componente, el agente debe revisar la carpeta de referencias para replicar con precisión la distribución, estilos, modos visuales (como dark mode) y jerarquía de la información.

---

## 📐 4. Lineamientos de Diseño y Desarrollo (Guidelines)

Basado estrictamente en las directrices de `.agents/guidelines.md`:

### 🔤 Tipografía
- **Uso obligatorio de SF Pro Display:** No sustituir por otras fuentes sin autorización.

### 🧩 Modularidad y Componentes Reutilizables
- **Reutilización ante todo:** Trabajar siempre pensando en la reutilización de componentes y estilos consistentes.
- **Componentes para elementos repetitivos:** Crear componentes dedicados para las tarjetas de propiedades (`PropertyCard`), badges de estado, selectores de fecha, carruseles y cualquier elemento de interfaz repetido.
- **Organización de Carpetas:** Manejar carpetas y subcarpetas ordenadas acorde a las páginas y dominios que se estén trabajando (ej. `components/properties/`, `components/booking/`, `components/ui/`, etc.).

### ⚠️ Reglas Críticas para el Agente
- **Cero instalaciones no autorizadas:** **NO** realizar configuraciones ni instalaciones de librerías sin consultar primero al usuario.
- **Código limpio y tipado:** Mantener TypeScript estricto, interfaces claras para los modelos de datos (propiedad, reserva, usuario, ciudad) y seguir las mejores prácticas de Next.js App Router (separación adecuada de Server Components y Client Components).

---

## 📑 5. Manejo de Documentación y Ciclo de Trabajo (Planeación e Implementación)

Para garantizar trazabilidad, orden y calidad en cada funcionalidad o tarea que se desarrolle, se debe seguir estrictamente este flujo de documentación:

### 📝 Fase 1: Modo Planeación (Especificación)
- Al entrar en modo de planeación para cualquier tarea o funcionalidad, se debe redactar y guardar un archivo de especificación/plan.
- **Carpeta destino:** `reference/spec/` (o ruta relativa `codecats2026/reference/spec/`)
- **Nomenclatura obligatoria:**
  ```text
  [correlativo]-plan-[descripcioncorta].md
  ```
  *Ejemplo:* `01-plan-autenticacion-supabase.md`, `02-plan-catalogo-propiedades.md`
- **Contenido mínimo de la especificación:**
  - Objetivo y alcance de la funcionalidad.
  - Componentes y rutas involucradas en Next.js.
  - Estructuras de datos / tablas de Supabase requeridas.
  - Pasos detallados de implementación y criterios de aceptación.

### ✅ Fase 2: Post-Implementación (Through / Walkthrough)
- Una vez realizada y completada la implementación del plan, se debe generar el archivo de reporte y recorrido técnico (*through*).
- **Carpeta destino:** `reference/through/` (o ruta relativa `codecats2026/reference/through/`)
- **Nomenclatura obligatoria:**
  ```text
  [correlativo]-throught-[descripcioncorta].md
  ```
  *Ejemplo:* `01-throught-autenticacion-supabase.md`, `02-throught-catalogo-propiedades.md`
- **Contenido mínimo del through:**
  - Resumen de cambios y funcionalidades implementadas.
  - Lista de archivos creados, modificados o refactorizados.
  - Decisiones técnicas tomadas y resolución de retos encontrados.
  - Pasos de verificación o pruebas ejecutadas para validar el trabajo.

### 🔗 Regla de Correlativos Pareados
- Tanto el plan como el through deben compartir el **mismo número correlativo** de dos dígitos (`01`, `02`, `03`...) y la **misma descripción corta**, garantizando un vínculo 1:1 directo entre la planificación y su ejecución.

---

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
