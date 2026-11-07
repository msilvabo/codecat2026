"use client";

import React, { useState, useMemo, useEffect } from "react";
import { FilterState, Property } from "@/types/property";
import { getProperties } from "@/lib/supabase/properties";
import { HeroSearch } from "../search/HeroSearch";
import { CategoryFilters } from "../categories/CategoryFilters";
import { FeaturedCollections } from "../properties/FeaturedCollections";
import { InstantBookingGrid } from "../properties/InstantBookingGrid";
import { AdvancedFiltersModal } from "../filters/AdvancedFiltersModal";
import { FilterIcon } from "../ui/Icons";

const DEFAULT_FILTERS: FilterState = {
  category: "all",
  destination: "",
  priceRange: { min: 0, max: 250 },
  propertyType: undefined,
};

interface HomePageContentProps {
  initialProperties?: Property[];
  initialSource?: "supabase" | "fallback";
}

export function HomePageContent({
  initialProperties = [],
  initialSource = "fallback",
}: HomePageContentProps) {
  const [properties, setProperties] = useState<Property[]>(initialProperties);
  const [dataSource, setDataSource] = useState<"supabase" | "fallback">(initialSource);
  const [isLoading, setIsLoading] = useState<boolean>(initialProperties.length === 0);
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // If initialProperties wasn't provided or empty, load on mount
  useEffect(() => {
    if (initialProperties.length === 0) {
      let isMounted = true;
      setIsLoading(true);
      getProperties().then(({ properties: loaded, source }) => {
        if (isMounted) {
          setProperties(loaded);
          setDataSource(source);
          setIsLoading(false);
        }
      });
      return () => {
        isMounted = false;
      };
    }
  }, [initialProperties]);

  // Pure filtering logic
  const filterProperty = (item: Property, currentFilters: FilterState): boolean => {
    // 1. Category Filter
    if (currentFilters.category !== "all") {
      switch (currentFilters.category) {
        case "luxury_villas":
          if (item.propertyType !== "villa") return false;
          break;
        case "beachfront":
          if (!item.isBeachfront) return false;
          break;
        case "cabins":
          if (item.propertyType !== "cabin") return false;
          break;
        case "penthouses":
          if (item.propertyType !== "penthouse") return false;
          break;
        case "pet_friendly":
          if (!item.isPetFriendly) return false;
          break;
        default:
          break;
      }
    }

    // 2. Specific Property Type (from Advanced Filters)
    if (currentFilters.propertyType && item.propertyType !== currentFilters.propertyType) {
      return false;
    }

    // 3. Price Range Filter (Min & Max per night)
    const { min, max } = currentFilters.priceRange;
    if (item.pricePerNight < min) return false;
    if (max < 250 && item.pricePerNight > max) return false;

    // 4. Destination Search
    if (currentFilters.destination.trim()) {
      const term = currentFilters.destination.toLowerCase().trim();
      const cityMatch = item.location.city.toLowerCase().includes(term);
      const neighborhoodMatch = item.location.neighborhood.toLowerCase().includes(term);
      const countryMatch = item.location.country.toLowerCase().includes(term);
      const titleMatch = item.title.toLowerCase().includes(term);
      if (!cityMatch && !neighborhoodMatch && !countryMatch && !titleMatch) {
        return false;
      }
    }

    return true;
  };

  // Divide properties into Featured (Signature) and Instant Booking
  const featuredList = useMemo(
    () => properties.filter((p) => p.isFeatured),
    [properties]
  );

  const instantList = useMemo(
    () => properties.filter((p) => !p.isFeatured),
    [properties]
  );

  // Filtered property lists
  const filteredFeatured = useMemo(
    () => featuredList.filter((p) => filterProperty(p, filters)),
    [featuredList, filters]
  );

  const filteredInstant = useMemo(
    () => instantList.filter((p) => filterProperty(p, filters)),
    [instantList, filters]
  );

  const totalResults = filteredFeatured.length + filteredInstant.length;

  const hasActivePriceFilter = filters.priceRange.min > 0 || filters.priceRange.max < 250;
  const hasActiveFilters =
    filters.category !== "all" ||
    Boolean(filters.destination.trim()) ||
    Boolean(filters.propertyType) ||
    hasActivePriceFilter;

  const priceRangeLabel = hasActivePriceFilter
    ? `$${filters.priceRange.min} - $${filters.priceRange.max >= 250 ? "250+" : filters.priceRange.max}`
    : undefined;

  // Handlers
  const handleSelectCategory = (categoryId: string) => {
    setFilters((prev) => ({
      ...prev,
      category: categoryId,
    }));
  };

  const handleSearch = ({ destination }: { destination: string }) => {
    setFilters((prev) => ({
      ...prev,
      destination,
    }));
  };

  const handleResetFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  return (
    <>
      {/* Hero Section & Search Pill */}
      <HeroSearch onSearch={handleSearch} />

      {/* Quick Category Filters */}
      <CategoryFilters
        activeCategory={filters.category}
        onSelectCategory={handleSelectCategory}
        onOpenAdvancedFilters={() => setIsModalOpen(true)}
        hasActivePriceFilter={hasActivePriceFilter}
        priceRangeLabel={priceRangeLabel}
      />

      {/* Database Connection State Notification */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 mb-4 flex items-center justify-between text-xs">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#151D2A] border border-[#233044] text-slate-300">
          <span
            className={`w-2 h-2 rounded-full ${
              dataSource === "supabase" ? "bg-emerald-400 animate-pulse" : "bg-amber-400"
            }`}
          />
          <span>
            Fuente:{" "}
            <strong className="text-white">
              {dataSource === "supabase"
                ? "Supabase DB (ecfyeaatwwiflpxncqka)"
                : "Modo Local Fallback (Esperando sincronización de Supabase)"}
            </strong>
          </span>
          <span className="text-slate-400">({properties.length} propiedades activas)</span>
        </div>
      </div>

      {/* Active Filters Summary Bar */}
      {hasActiveFilters && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="flex flex-wrap items-center justify-between gap-3 bg-[#151D2A]/60 border border-[#233044] rounded-2xl px-5 py-3 text-xs text-slate-300">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-semibold text-white flex items-center gap-1.5">
                <FilterIcon className="w-3.5 h-3.5 text-[#FF385C]" />
                Filtros activos:
              </span>

              {filters.category !== "all" && (
                <span className="bg-[#1E293B] border border-[#233044] px-2.5 py-1 rounded-full text-slate-200">
                  Categoría:{" "}
                  <strong className="text-white capitalize">
                    {filters.category.replace("_", " ")}
                  </strong>
                </span>
              )}

              {hasActivePriceFilter && (
                <span className="bg-[#1E293B] border border-[#233044] px-2.5 py-1 rounded-full text-slate-200">
                  Precio/noche: <strong className="text-emerald-400">{priceRangeLabel} USD</strong>
                </span>
              )}

              {filters.propertyType && (
                <span className="bg-[#1E293B] border border-[#233044] px-2.5 py-1 rounded-full text-slate-200">
                  Tipo: <strong className="text-white capitalize">{filters.propertyType}</strong>
                </span>
              )}

              {filters.destination.trim() && (
                <span className="bg-[#1E293B] border border-[#233044] px-2.5 py-1 rounded-full text-slate-200">
                  Destino: <strong className="text-white">{filters.destination}</strong>
                </span>
              )}

              <span className="text-slate-400 ml-1">
                ({totalResults} alojamiento{totalResults === 1 ? "" : "s"} encontrado
                {totalResults === 1 ? "" : "s"})
              </span>
            </div>

            <button
              onClick={handleResetFilters}
              className="text-[#FF385C] hover:text-[#E00B41] font-semibold underline underline-offset-2 transition-colors cursor-pointer"
            >
              Restablecer todo
            </button>
          </div>
        </section>
      )}

      {/* Loading state indicator */}
      {isLoading ? (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-16 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-[#151D2A] border border-[#233044] text-slate-300 text-sm">
            <span className="w-4 h-4 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
            Cargando catálogo desde Supabase...
          </div>
        </section>
      ) : totalResults === 0 ? (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-16 text-center">
          <div className="max-w-md mx-auto bg-[#151D2A] border border-[#233044] rounded-3xl p-10 shadow-2xl space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#1E293B] border border-[#233044] flex items-center justify-center mx-auto text-slate-400">
              <FilterIcon className="w-7 h-7 text-[#FF385C]" />
            </div>
            <h3 className="text-xl font-bold text-white">
              No encontramos alojamientos con estos filtros
            </h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Prueba cambiando o ampliando el rango de precios por noche, seleccionando otra categoría
              o quitando las restricciones aplicadas.
            </p>
            <div className="pt-2">
              <button
                onClick={handleResetFilters}
                className="px-6 py-2.5 bg-[#FF385C] hover:bg-[#E00B41] text-white text-xs font-semibold rounded-xl transition-all shadow-md shadow-black/40"
              >
                Limpiar todos los filtros
              </button>
            </div>
          </div>
        </section>
      ) : (
        <>
          {/* Featured Showcase ("Colección Signature") */}
          {filteredFeatured.length > 0 && (
            <FeaturedCollections properties={filteredFeatured} />
          )}

          {/* Instant Booking 4-Column Grid with initial 6 items pagination */}
          <InstantBookingGrid properties={filteredInstant} />
        </>
      )}

      {/* Advanced Filters Modal Dialog */}
      <AdvancedFiltersModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        filters={filters}
        onChangeFilters={setFilters}
        onResetFilters={handleResetFilters}
        matchingResultsCount={totalResults}
      />
    </>
  );
}
