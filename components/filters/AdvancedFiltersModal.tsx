"use client";

import React, { useEffect } from "react";
import { FilterState } from "@/types/property";
import { PriceRangeFilter } from "./PriceRangeFilter";

interface AdvancedFiltersModalProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onChangeFilters: (filters: FilterState) => void;
  onResetFilters: () => void;
  matchingResultsCount: number;
}

export function AdvancedFiltersModal({
  isOpen,
  onClose,
  filters,
  onChangeFilters,
  onResetFilters,
  matchingResultsCount,
}: AdvancedFiltersModalProps) {
  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const propertyTypes = [
    { id: "all", label: "Cualquier tipo" },
    { id: "villa", label: "Villas" },
    { id: "apartment", label: "Departamentos" },
    { id: "cabin", label: "Cabañas" },
    { id: "penthouse", label: "Áticos / Penthouses" },
  ];

  const handlePriceChange = (min: number, max: number) => {
    onChangeFilters({
      ...filters,
      priceRange: { min, max },
    });
  };

  const handlePropertyTypeChange = (typeId: string) => {
    onChangeFilters({
      ...filters,
      propertyType: typeId === "all" ? undefined : typeId,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-xl bg-[#0F1622] border border-[#233044] rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#233044] flex items-center justify-between">
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#151D2A] hover:bg-[#1E293B] flex items-center justify-center text-slate-400 hover:text-white transition-colors"
            aria-label="Cerrar modal"
          >
            ✕
          </button>
          <h3 className="text-base font-semibold text-white">Filtros de alojamiento</h3>
          <div className="w-8" />
        </div>

        {/* Body (Scrollable) */}
        <div className="p-6 space-y-6 overflow-y-auto">
          {/* Price Range Section */}
          <PriceRangeFilter
            minPrice={filters.priceRange.min}
            maxPrice={filters.priceRange.max}
            onChange={handlePriceChange}
          />

          <hr className="border-[#233044]" />

          {/* Property Type Section */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Tipo de propiedad</h4>
            <div className="flex flex-wrap gap-2">
              {propertyTypes.map((type) => {
                const isSelected =
                  (!filters.propertyType && type.id === "all") ||
                  filters.propertyType === type.id;
                return (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => handlePropertyTypeChange(type.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                      isSelected
                        ? "bg-[#FF385C] text-white shadow-sm"
                        : "bg-[#151D2A] hover:bg-[#1E293B] text-slate-300 border border-[#233044]"
                    }`}
                  >
                    {type.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#233044] bg-[#0B0F17] flex items-center justify-between">
          <button
            type="button"
            onClick={onResetFilters}
            className="text-xs font-semibold text-slate-400 hover:text-white underline underline-offset-4 transition-colors"
          >
            Borrar todo
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 bg-[#FF385C] hover:bg-[#E00B41] text-white font-semibold text-xs rounded-xl shadow-lg shadow-black/40 transition-all hover:scale-[1.02]"
          >
            Mostrar {matchingResultsCount} alojamiento{matchingResultsCount === 1 ? "" : "s"}
          </button>
        </div>
      </div>
    </div>
  );
}
