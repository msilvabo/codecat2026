"use client";

import React, { useState } from "react";
import { SearchIcon } from "../ui/Icons";

interface HeroSearchProps {
  onSearch?: (searchData: { destination: string; dates: string; guests: string }) => void;
}

export function HeroSearch({ onSearch }: HeroSearchProps) {
  const [destination, setDestination] = useState("Calacoto, La Paz");
  const [dates, setDates] = useState("14 nov. — 20 nov. (6 noches)");
  const [guests, setGuests] = useState("2 huéspedes · 1 habitación");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch({ destination, dates, guests });
    }
  };

  return (
    <section className="relative pt-12 pb-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
      {/* Title & Subtitle */}
      <div className="max-w-3xl mx-auto space-y-4">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-white leading-tight">
          Encuentra tu{" "}
          <span className="font-serif italic font-normal text-emerald-400 underline decoration-emerald-500/40 underline-offset-8">
            mejor estadía
          </span>
          .
        </h1>
        <p className="text-slate-400 text-base sm:text-lg max-w-xl mx-auto">
          Alojamientos de diseño, residencias de descanso y estancias extraordinarias con verificación
          premium.
        </p>
      </div>

      {/* Floating Modern Dark Search Pill */}
      <form onSubmit={handleSubmit} className="mt-9 max-w-4xl mx-auto">
        <div className="bg-[#151D2A] border border-[#233044] rounded-3xl sm:rounded-full p-2.5 shadow-2xl shadow-black/60 flex flex-col md:flex-row items-center divide-y md:divide-y-0 md:divide-x divide-[#233044]">
          {/* Search Block: Dónde */}
          <div className="flex-1 w-full text-left px-5 py-2.5 hover:bg-[#1B2637] rounded-2xl md:rounded-full transition-colors cursor-pointer group">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#FF385C]">
              Dónde
            </label>
            <input
              className="w-full bg-transparent border-0 p-0 text-sm font-medium text-white placeholder-slate-500 focus:outline-none focus:ring-0 truncate"
              placeholder="Explora destinos (ej. La Paz, Santa Cruz)"
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>

          {/* Search Block: Fechas */}
          <div className="flex-1 w-full text-left px-5 py-2.5 hover:bg-[#1B2637] rounded-2xl md:rounded-full transition-colors cursor-pointer group">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#FF385C]">
              Fechas
            </label>
            <input
              className="w-full bg-transparent border-0 p-0 text-sm font-medium text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-0 truncate"
              placeholder="Agregar fechas"
              type="text"
              value={dates}
              onChange={(e) => setDates(e.target.value)}
            />
          </div>

          {/* Search Block: Quién / Huéspedes */}
          <div className="flex-1 w-full text-left px-5 py-2.5 hover:bg-[#1B2637] rounded-2xl md:rounded-full transition-colors cursor-pointer group">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#FF385C]">
              Quién
            </label>
            <input
              className="w-full bg-transparent border-0 p-0 text-sm font-medium text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-0 truncate"
              placeholder="¿Cuántos huéspedes?"
              type="text"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
            />
          </div>

          {/* Search Submit Button */}
          <div className="w-full md:w-auto p-1.5 flex justify-end">
            <button
              type="submit"
              className="w-full md:w-auto px-6 py-3.5 bg-[#FF385C] hover:bg-[#E00B41] text-white font-semibold rounded-2xl md:rounded-full flex items-center justify-center gap-2 shadow-lg shadow-black/40 transition-all duration-200 hover:scale-[1.02]"
            >
              <SearchIcon className="w-4 h-4 text-white stroke-[2.5]" />
              <span className="text-sm">Buscar</span>
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
