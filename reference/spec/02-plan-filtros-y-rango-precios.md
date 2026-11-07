# Plan de Especificación 02: Sistema de Filtros Interactivos y Rango de Precios por Noche

## 1. Objetivo y Alcance de la Funcionalidad

Resolver la falta de reactividad en los filtros de la página principal e incorporar un sistema completo de filtrado por rango de precios (precio mínimo y máximo por noche), permitiendo a los usuarios filtrar propiedades en tiempo real tanto en la Colección Signature como en la Grilla de Reservas Inmediatas.

### Alcance
- **Interactividad Global de Filtros:** Conectar los filtros de categorías ("Todo", "Villas de lujo", "Frente al mar", "Cabañas", "Áticos", "Pet friendly"), el buscador del Hero (destino) y las pestañas rápidas de reserva inmediata con el catálogo de propiedades.
- **Filtrado por Rango de Precios (Mínimo y Máximo):**
  - Implementar inputs numéricos y control de rango para precio mínimo (`minPrice`) y precio máximo (`maxPrice`) por noche en dólares USD.
  - Indicador visual en el botón de filtros cuando hay un rango de precio aplicado (ej. badge con rango "$40 - $100").
- **Modal de Filtros Avanzados (`AdvancedFiltersModal`):**
  - Modal accesible al hacer click en el botón "Filtros avanzados" en `CategoryFilters`.
  - Controles de rango de precios con botones de acceso rápido (ej. "< $50", "$50 - $100", "> $100", "Cualquier precio").
  - Filtro por tipo de propiedad (Villas, Departamentos, Cabañas, Áticos).
  - Botones de "Limpiar filtros" y "Mostrar X alojamientos" con contador de resultados dinámico.
- **Enriquecimiento del Dataset Mock (`mock-properties.ts`):**
  - Asegurar que existan propiedades que satisfagan cada categoría (incluyendo "Frente al mar / Laguna", "Pet friendly", "Cabañas", "Villas", "Áticos") y diferentes rangos de precio ($30 a $150+ USD).
- **Manejo de Estados Vacíos:**
  - Componente de retroalimentación cuando ningún inmueble coincide con la combinación de filtros aplicados, con llamada a la acción para resetear filtros.

---

## 2. Componentes y Rutas Involucradas en Next.js

```
codecats2026/
├── types/
│   └── property.ts                     # Agregar interfaz FilterState y opciones de filtro
├── data/
│   └── mock-properties.ts              # Dataset enriquecido con soporte para todas las categorías
├── components/
│   ├── filters/
│   │   ├── AdvancedFiltersModal.tsx    # Modal de filtros avanzados con selector de precio min/max
│   │   └── PriceRangeFilter.tsx        # Control dedicado de precio mínimo y máximo
│   ├── categories/
│   │   └── CategoryFilters.tsx         # Actualizado con badge de filtros activos y eventos
│   ├── search/
│   │   └── HeroSearch.tsx              # Conectado con evento de búsqueda por destino
│   ├── properties/
│   │   ├── FeaturedCollections.tsx     # Soporte para mostrar lista filtrada o mensaje si vacío
│   │   └── InstantBookingGrid.tsx      # Soporte para mostrar lista filtrada con tabs
│   └── home/
│       └── HomePageContent.tsx         # Contenedor orquestador del estado de filtros y reactividad
├── app/
│   └── page.tsx                        # Server Component que monta HomePageContent
```

---

## 3. Modelo de Datos y Estructura de Filtros

### Interfaz `FilterState`
```typescript
export interface FilterState {
  category: string;             // 'all' | 'luxury_villas' | 'beachfront' | 'cabins' | 'penthouses' | 'pet_friendly'
  destination: string;          // Búsqueda por texto (ciudad, barrio, país)
  priceRange: {
    min: number;                // Precio mínimo por noche (ej. 0 o 30)
    max: number;                // Precio máximo por noche (ej. 200 o más)
  };
  propertyType?: string;        // Opcional: filtro específico por tipo
  onlyInstantBook?: boolean;    // Solo propiedades con reserva inmediata
  onlySuperhost?: boolean;      // Solo superanfitriones
}
```

---

## 4. Pasos Detallados de Implementación

1. **Ampliación de Tipos (`types/property.ts`):**
   - Definir `FilterState` y `PriceRange`.
2. **Enriquecimiento de Mocks (`data/mock-properties.ts`):**
   - Añadir propiedades frente a laguna/lago (ej. Urubó Laguna, Isla del Sol) para "Frente al mar / Laguna".
   - Añadir etiquetas y propiedades pet friendly explícitas.
3. **Componente de Rango de Precios y Modal de Filtros (`components/filters`):**
   - Crear `PriceRangeFilter.tsx` con inputs numéricos para precio mínimo y máximo por noche, rangos rápidos y slider visual.
   - Crear `AdvancedFiltersModal.tsx` con overlay oscuro, animación de apertura, botón cerrar, resetear y aplicar.
4. **Actualización de `CategoryFilters.tsx`:**
   - Recibir `activeCategory`, `onSelectCategory`, `activeFilterCount` y `onOpenAdvancedFilters`.
   - Mostrar un badge con el conteo de filtros activos en el botón "Filtros avanzados".
5. **Creación de `HomePageContent.tsx`:**
   - Manejar el estado centralizado (`FilterState`).
   - Función pura de filtrado `applyFilters(properties, filters)` que filtra por categoría, precio mínimo/máximo, destino y tabs.
   - Pasar propiedades filtradas a `FeaturedCollections` y `InstantBookingGrid`.
   - Mostrar estado amigable de "Sin resultados" si el filtrado no arroja elementos.
6. **Actualización de `app/page.tsx`:**
   - Renderizar `HomePageContent` dentro del layout general.
7. **Verificación:**
   - Comprobar compilación con `npm run build`.
   - Probar filtrado por cada una de las 6 categorías.
   - Probar ajuste de precio mínimo y máximo (ej. $40 a $80) y verificar la actualización inmediata de las tarjetas.

---

## 5. Criterios de Aceptación

- [ ] Al seleccionar cualquiera de las categorías ("Villas de lujo", "Frente al mar", "Cabañas", "Áticos", "Pet friendly"), el listado de propiedades se actualiza automáticamente.
- [ ] El botón "Filtros avanzados" abre un modal interactivo con selección de precio mínimo y precio máximo por noche.
- [ ] Modificar los valores de precio mínimo y máximo filtra de forma exacta las propiedades cuyo `pricePerNight` se encuentre en dicho rango.
- [ ] La búsqueda por destino en el Hero filtra las propiedades por ciudad o barrio.
- [ ] Existe la posibilidad de "Limpiar filtros" para volver al estado inicial completo.
- [ ] La compilación con `npm run build` es 100% exitosa sin errores de TypeScript.
