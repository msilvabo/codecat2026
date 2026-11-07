"use client";

import React, { useState } from "react";
import { Property } from "@/types/property";
import { PropertyCard } from "./PropertyCard";

interface InstantBookingGridProps {
  properties: Property[];
  onSelectProperty?: (property: Property) => void;
}

export function InstantBookingGrid({ properties, onSelectProperty }: InstantBookingGridProps) {
  const [activeFilterTab, setActiveFilterTab] = useState<"all" | "under50" | "suites">("all");
  const [visibleCount, setVisibleCount] = useState(6);

  // Filter properties based on tab
  const filteredProperties = properties.filter((item) => {
    if (activeFilterTab === "under50") {
      return item.pricePerNight < 50;
    }
    if (activeFilterTab === "suites") {
      return (
        item.propertyType === "apartment" ||
        item.propertyType === "loft" ||
        item.propertyType === "penthouse"
      );
    }
    return true;
  });

  const displayedProperties = filteredProperties.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProperties.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
      {/* Header and Filter Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">
            Nuevos en el mercado con reserva inmediata
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Alojamientos recién auditados, listos para confirmar sin esperas de anfitrión.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1 bg-[#151D2A] p-1 rounded-xl border border-[#233044] text-xs">
          <button
            onClick={() => {
              setActiveFilterTab("all");
              setVisibleCount(6);
            }}
            className={`px-3.5 py-1.5 rounded-lg font-semibold transition-all ${
              activeFilterTab === "all"
                ? "bg-[#FF385C] text-white"
                : "text-slate-300 hover:text-white hover:bg-slate-800"
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => {
              setActiveFilterTab("under50");
              setVisibleCount(6);
            }}
            className={`px-3.5 py-1.5 rounded-lg font-medium transition-all ${
              activeFilterTab === "under50"
                ? "bg-[#FF385C] text-white"
                : "text-slate-300 hover:text-white hover:bg-slate-800"
            }`}
          >
            Menos de $50/noche
          </button>
          <button
            onClick={() => {
              setActiveFilterTab("suites");
              setVisibleCount(6);
            }}
            className={`px-3.5 py-1.5 rounded-lg font-medium transition-all ${
              activeFilterTab === "suites"
                ? "bg-[#FF385C] text-white"
                : "text-slate-300 hover:text-white hover:bg-slate-800"
            }`}
          >
            Suites y Condos
          </button>
        </div>
      </div>

      {/* 4-Column Responsive Grid */}
      {displayedProperties.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onClick={onSelectProperty}
            />
          ))}
        </div>
      ) : (
        <div className="bg-[#151D2A] border border-[#233044] rounded-2xl p-8 text-center">
          <p className="text-slate-300 text-sm font-medium">
            No hay alojamientos de reserva inmediata con esta combinación de filtros.
          </p>
          <p className="text-slate-500 text-xs mt-1">
            Intenta ampliar el rango de precios o seleccionar otra categoría.
          </p>
        </div>
      )}

      {/* Load More Button */}
      {hasMore && (
        <div className="mt-12 text-center">
          <button
            onClick={handleLoadMore}
            className="px-8 py-3.5 rounded-full bg-[#151D2A] hover:bg-[#1F2B3D] border border-[#233044] hover:border-white/40 text-white text-sm font-medium transition-all shadow-lg shadow-black/60 hover:scale-[1.02]"
          >
            Cargar más propiedades exclusivas
          </button>
        </div>
      )}
    </section>
  );
}
