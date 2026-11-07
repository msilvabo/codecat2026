import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Codicats Airbnb — Alojamientos Exclusivos & Alquiler Vacacional Premium",
  description:
    "Réplica de Airbnb desarrollada para la comunidad de Codicats. Alojamientos de diseño, residencias de descanso y estancias extraordinarias con verificación premium.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark scroll-smooth">
      <body className="bg-[#0B0F17] text-slate-100 antialiased min-h-screen selection:bg-emerald-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
