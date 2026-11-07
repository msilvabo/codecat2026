import React from "react";
import Link from "next/link";
import { GlobeIcon } from "../ui/Icons";

export function Footer() {
  const footerSections = [
    {
      title: "Soporte y Asistencia",
      links: [
        { label: "Centro de ayuda", href: "#" },
        { label: "AirCover para huéspedes", href: "#" },
        { label: "Cancelaciones flexibles", href: "#" },
        { label: "Opciones de accesibilidad", href: "#" },
        { label: "Protocolos de limpieza", href: "#" },
      ],
    },
    {
      title: "Comunidad",
      links: [
        { label: "Airbnb Diversidad", href: "#" },
        { label: "Estancias para emergencias", href: "#" },
        { label: "Reseñas de la comunidad", href: "#" },
        { label: "Invitaciones y recompensas", href: "#" },
      ],
    },
    {
      title: "Anfitriones",
      links: [
        { label: "Pon tu alojamiento", href: "#" },
        { label: "AirCover para anfitriones", href: "#" },
        { label: "Recursos de hospedaje", href: "#" },
        { label: "Foro de la comunidad", href: "#" },
        { label: "Hospedar con responsabilidad", href: "#" },
      ],
    },
    {
      title: "Airbnb & Codicats",
      links: [
        { label: "Sala de prensa", href: "#" },
        { label: "Nuevas funciones", href: "#" },
        { label: "Carreras e inversionistas", href: "#" },
        { label: "Airbnb Plus Exclusive", href: "#" },
      ],
    },
  ];

  return (
    <footer className="bg-[#080C12] border-t border-[#233044]/80 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 4 Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {footerSections.map((section, idx) => (
            <div key={idx}>
              <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-4">
                {section.title}
              </h4>
              <ul className="space-y-2.5 text-xs">
                {section.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <Link
                      href={link.href}
                      className="hover:text-emerald-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#1C2636] flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex flex-wrap items-center gap-4 text-slate-400">
            <span>© 2026 Airbnb, Inc. / Codicats Replica. Todos los derechos reservados.</span>
            <span className="hidden sm:inline">·</span>
            <Link href="#" className="hover:text-emerald-400 transition-colors">
              Privacidad
            </Link>
            <span className="hidden sm:inline">·</span>
            <Link href="#" className="hover:text-emerald-400 transition-colors">
              Términos y condiciones
            </Link>
            <span className="hidden sm:inline">·</span>
            <Link href="#" className="hover:text-emerald-400 transition-colors">
              Mapa del sitio
            </Link>
          </div>

          <div className="flex items-center gap-5">
            <div className="flex items-center gap-1.5 text-white font-medium cursor-pointer hover:text-emerald-400 transition-colors">
              <GlobeIcon className="w-4 h-4 text-emerald-400" />
              <span>Español (BO)</span>
            </div>
            <span className="text-white font-medium cursor-pointer hover:text-emerald-400 transition-colors">
              $ USD
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
