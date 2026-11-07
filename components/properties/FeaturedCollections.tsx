"use client";

import React, { useState } from "react";
import { Property } from "@/types/property";
import { FeaturedPropertyCard } from "./FeaturedPropertyCard";
import { ChevronLeftIcon, ChevronRightIcon } from "../ui/Icons";

interface FeaturedCollectionsProps {
  properties: Property[];
  onBookProperty?: (property: Property) => void;
}

export function FeaturedCollections({ properties, onBookProperty }: FeaturedCollectionsProps) {
  const [currentPage, setCurrentPage] = useState(0);

  if (properties.length === 0) {
    return null;
  }

  const handlePrev = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev < properties.length - 2 ? prev + 1 : prev));
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold">
              Colección Signature
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold text-white mt-1">
            Alojamientos destacados para tus fechas
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Propiedades seleccionadas meticulosamente por confort, diseño y amenidades premium.
          </p>
        </div>

        {/* Carousel / Navigation Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            className="w-9 h-9 rounded-full bg-[#151D2A] border border-[#233044] flex items-center justify-center text-slate-300 hover:text-white hover:border-slate-500 transition-colors"
            title="Anterior"
            aria-label="Anterior"
          >
            <ChevronLeftIcon className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            className="w-9 h-9 rounded-full bg-[#151D2A] border border-[#233044] flex items-center justify-center text-slate-300 hover:text-white hover:border-slate-500 transition-colors"
            title="Siguiente"
            aria-label="Siguiente"
          >
            <ChevronRightIcon className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Featured Two-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {properties.slice(0, 2).map((property) => (
          <FeaturedPropertyCard
            key={property.id}
            property={property}
            onBook={onBookProperty}
          />
        ))}
      </div>
    </section>
  );
}
