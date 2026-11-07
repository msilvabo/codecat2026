"use client";

import React from "react";

interface PriceRangeFilterProps {
  minPrice: number;
  maxPrice: number;
  onChange: (min: number, max: number) => void;
}

export function PriceRangeFilter({ minPrice, maxPrice, onChange }: PriceRangeFilterProps) {
  const presets = [
    { label: "Cualquier precio", min: 0, max: 250 },
    { label: "Menos de $50", min: 0, max: 50 },
    { label: "$50 a $100", min: 50, max: 100 },
    { label: "Más de $100", min: 100, max: 250 },
  ];

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value) || 0;
    onChange(Math.max(0, val), Math.max(val, maxPrice));
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value) || 0;
    onChange(Math.min(minPrice, val), Math.max(0, val));
  };

  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-semibold text-white">Rango de precios por noche</h4>
        <p className="text-xs text-slate-400 mt-0.5">
          El precio promedio por noche es de $72 USD. Incluye tarifas e impuestos.
        </p>
      </div>

      {/* Preset Pills */}
      <div className="flex flex-wrap gap-2">
        {presets.map((preset, idx) => {
          const isActive = minPrice === preset.min && maxPrice === preset.max;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => onChange(preset.min, preset.max)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                isActive
                  ? "bg-[#FF385C] text-white shadow-sm"
                  : "bg-[#1E293B] hover:bg-[#28384E] text-slate-300 border border-[#233044]"
              }`}
            >
              {preset.label}
            </button>
          );
        })}
      </div>

      {/* Price Inputs Box */}
      <div className="grid grid-cols-2 gap-4 pt-2">
        {/* Min Price */}
        <div className="bg-[#151D2A] border border-[#233044] rounded-2xl p-3 focus-within:border-emerald-400 transition-colors">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Precio mínimo
          </label>
          <div className="flex items-center gap-1 mt-1">
            <span className="text-slate-400 text-sm">$</span>
            <input
              type="number"
              min={0}
              max={maxPrice}
              value={minPrice}
              onChange={handleMinChange}
              className="w-full bg-transparent border-0 p-0 text-base font-semibold text-white focus:outline-none focus:ring-0"
              placeholder="0"
            />
            <span className="text-[11px] text-slate-500 font-medium">USD</span>
          </div>
        </div>

        {/* Max Price */}
        <div className="bg-[#151D2A] border border-[#233044] rounded-2xl p-3 focus-within:border-emerald-400 transition-colors">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Precio máximo
          </label>
          <div className="flex items-center gap-1 mt-1">
            <span className="text-slate-400 text-sm">$</span>
            <input
              type="number"
              min={minPrice}
              max={1000}
              value={maxPrice}
              onChange={handleMaxChange}
              className="w-full bg-transparent border-0 p-0 text-base font-semibold text-white focus:outline-none focus:ring-0"
              placeholder="250"
            />
            <span className="text-[11px] text-slate-500 font-medium">USD</span>
          </div>
        </div>
      </div>

      {/* Range Sliders */}
      <div className="pt-2 px-1">
        <input
          type="range"
          min={0}
          max={250}
          step={5}
          value={maxPrice}
          onChange={(e) => onChange(minPrice, Number(e.target.value))}
          className="w-full h-1.5 bg-[#233044] rounded-lg appearance-none cursor-pointer accent-[#FF385C]"
        />
        <div className="flex justify-between text-[11px] text-slate-400 mt-1">
          <span>Min: ${minPrice} USD</span>
          <span>Max: ${maxPrice >= 250 ? "$250+ USD" : `$${maxPrice} USD`}</span>
        </div>
      </div>
    </div>
  );
}
