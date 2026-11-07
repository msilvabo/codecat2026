"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AirbnbLogo, GlobeIcon, BellIcon, MenuIcon } from "../ui/Icons";

export function Navbar() {
  const [activeTab, setActiveTab] = useState("alojamientos");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "alojamientos", label: "Alojamientos", href: "#" },
    { id: "experiencias", label: "Experiencias", href: "#" },
    { id: "villas", label: "Villas & Áticos", href: "#" },
    { id: "departamentos", label: "Departamentos", href: "#" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0B0F17]/95 backdrop-blur-md border-b border-[#233044]/60 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <AirbnbLogo className="h-8 w-8 text-[#FF385C] fill-current group-hover:scale-105 transition-transform" />
            <span className="text-xl font-bold tracking-tight text-white">airbnb</span>
          </Link>

          {/* Center Main Navigation Links (Desktop) */}
          <nav
            className="hidden md:flex items-center gap-1 bg-[#151D2A]/80 p-1.5 rounded-full border border-[#233044]"
            aria-label="Navegación principal"
          >
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-[#FF385C] text-white shadow-sm"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/60"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Side User Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="#"
              className="hidden lg:inline-block text-sm font-medium text-slate-200 hover:text-white px-3 py-2 rounded-full hover:bg-white/5 transition-all"
            >
              Pon tu espacio en Airbnb
            </Link>

            {/* Currency & Language */}
            <button
              className="p-2.5 rounded-full text-slate-300 hover:text-white hover:bg-[#151D2A] border border-transparent hover:border-[#233044] transition-colors"
              title="Idioma y Moneda: USD"
              aria-label="Idioma y moneda"
            >
              <GlobeIcon className="w-4 h-4" />
            </button>

            {/* Notifications */}
            <button
              className="relative p-2.5 rounded-full text-slate-300 hover:text-white hover:bg-[#151D2A] border border-transparent hover:border-[#233044] transition-colors"
              title="Notificaciones"
              aria-label="Notificaciones"
            >
              <span className="absolute top-2 right-2 w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <BellIcon className="w-4 h-4" />
            </button>

            {/* User Profile Pill */}
            <div
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex items-center gap-2 pl-2 pr-1.5 py-1.5 bg-[#151D2A] hover:bg-[#1E293B] border border-[#233044] rounded-full cursor-pointer transition-colors shadow-sm"
              role="button"
              tabIndex={0}
              aria-label="Menú de usuario"
            >
              <MenuIcon className="w-4 h-4 text-slate-400 ml-1" />
              <div className="w-7 h-7 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 flex items-center justify-center font-bold text-xs text-slate-900 overflow-hidden shadow-inner">
                <span className="font-semibold text-slate-950">JS</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#233044] space-y-2 animate-in fade-in duration-200">
            <div className="grid grid-cols-2 gap-2 mb-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium text-left ${
                    activeTab === item.id
                      ? "bg-[#FF385C] text-white"
                      : "bg-[#151D2A] text-slate-300 hover:text-white"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <Link
              href="#"
              className="block text-sm font-medium text-slate-200 hover:text-white px-4 py-2.5 rounded-xl bg-[#151D2A]"
            >
              Pon tu espacio en Airbnb
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
