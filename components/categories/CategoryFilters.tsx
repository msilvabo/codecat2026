"use client";

import React from "react";
import { CATEGORIES } from "@/data/mock-properties";
import {
  CategoryAllIcon,
  CategoryVillaIcon,
  CategoryBeachIcon,
  CategoryCabinIcon,
  CategoryPenthouseIcon,
  CategoryPetIcon,
  FilterIcon,
} from "../ui/Icons";

interface CategoryFiltersProps {
  activeCategory?: string;
  onSelectCategory?: (categoryId: string) => void;
  onOpenAdvancedFilters?: () => void;
  hasActivePriceFilter?: boolean;
  priceRangeLabel?: string;
}

export function CategoryFilters({
  activeCategory = "all",
  onSelectCategory,
  onOpenAdvancedFilters,
  hasActivePriceFilter = false,
  priceRangeLabel,
}: CategoryFiltersProps) {
  const handleCategoryClick = (id: string) => {
    if (onSelectCategory) {
      onSelectCategory(id);
    }
  };

  const renderIcon = (icon: string, isActive: boolean) => {
    const iconClass = `w-4 h-4 ${isActive ? "text-[#FF385C]" : "text-slate-400 group-hover:text-white"}`;

    switch (icon) {
      case "luxury_villas":
        return <CategoryVillaIcon className={iconClass} />;
      case "beachfront":
        return <CategoryBeachIcon className={iconClass} />;
      case "cabins":
        return <CategoryCabinIcon className={iconClass} />;
      case "penthouses":
        return <CategoryPenthouseIcon className={iconClass} />;
      case "pet_friendly":
        return <CategoryPetIcon className={iconClass} />;
      case "all":
      default:
        return <CategoryAllIcon className={iconClass} />;
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
      <div className="flex items-center justify-between gap-4 border-b border-[#233044]/80 pb-4">
        {/* Category Buttons Horizontal Scroll */}
        <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar py-1">
          {CATEGORIES.map((category) => {
            const isActive = activeCategory === category.id;
            return (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className={`group flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold shrink-0 transition-all ${
                  isActive
                    ? "bg-[#FF385C]/10 border border-[#FF385C] text-[#FF385C]"
                    : "bg-[#151D2A] hover:bg-[#1B2637] border border-[#233044] text-slate-300 hover:text-white"
                }`}
              >
                {renderIcon(category.icon, isActive)}
                <span>{category.name}</span>
              </button>
            );
          })}
        </div>

        {/* Filter Action Trigger */}
        <button
          onClick={onOpenAdvancedFilters}
          className={`shrink-0 flex items-center gap-2.5 px-4 py-2.5 rounded-full text-xs font-semibold transition-all ${
            hasActivePriceFilter
              ? "bg-[#FF385C]/15 border border-[#FF385C] text-white"
              : "bg-[#151D2A] hover:bg-[#1B2637] border border-[#233044] text-slate-200 hover:text-white"
          }`}
        >
          <FilterIcon className={`w-4 h-4 ${hasActivePriceFilter ? "text-[#FF385C]" : "text-slate-300"}`} />
          <span className="hidden sm:inline">
            {hasActivePriceFilter && priceRangeLabel ? priceRangeLabel : "Filtros avanzados"}
          </span>
          {hasActivePriceFilter && (
            <span className="w-2 h-2 rounded-full bg-[#FF385C] animate-pulse" />
          )}
        </button>
      </div>
    </section>
  );
}
