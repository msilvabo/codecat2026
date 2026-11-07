import React from "react";
import { Property } from "@/types/property";
import { Badge } from "../ui/Badge";
import { FavoriteButton } from "../ui/FavoriteButton";

interface PropertyCardProps {
  property: Property;
  onClick?: (property: Property) => void;
}

export function PropertyCard({ property, onClick }: PropertyCardProps) {
  const {
    title,
    location,
    pricePerNight,
    currency,
    rating,
    images,
    badges = [],
    specs,
    amenities,
    availableDates,
  } = property;

  const mainImage = images[0] || "/placeholder.jpg";
  const locationString = `${location.neighborhood}, ${location.city}`;

  // Summary of specs (e.g. "2 camas · 1 baño · Calefacción")
  const specsParts: string[] = [];
  if (specs.beds) specsParts.push(`${specs.beds} camas`);
  if (specs.bathrooms) specsParts.push(`${specs.bathrooms} baño${specs.bathrooms > 1 ? "s" : ""}`);
  if (amenities && amenities[0]) specsParts.push(amenities[0]);
  const specsSummary = specsParts.join(" · ");

  // Decide badge styling
  const getBadgeVariant = (badge: string) => {
    if (badge.includes("Diseño")) return "amber";
    if (badge.includes("Pet")) return "emerald";
    return "compact";
  };

  return (
    <article
      onClick={() => onClick && onClick(property)}
      className="bg-[#151D2A] border border-[#233044] rounded-2xl overflow-hidden hover:border-emerald-500/40 hover:-translate-y-1 transition-all duration-300 group flex flex-col cursor-pointer"
    >
      {/* Visual with 4:3 Aspect */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          alt={title}
          src={mainImage}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Badge Overlay */}
        {badges[0] && (
          <div className="absolute top-3 left-3">
            <Badge variant={getBadgeVariant(badges[0])}>{badges[0]}</Badge>
          </div>
        )}

        {/* Favorite Button */}
        <div className="absolute top-3 right-3">
          <FavoriteButton size="sm" />
        </div>
      </div>

      {/* Card Info Body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-slate-400 font-medium truncate mr-2">{locationString}</span>
            <span className="text-emerald-400 font-semibold shrink-0">★ {rating.toFixed(2)}</span>
          </div>

          <h4 className="text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors line-clamp-1">
            {title}
          </h4>

          <p className="text-xs text-slate-400 mt-1 line-clamp-1">{specsSummary}</p>
        </div>

        {/* Footer with Price and Dates */}
        <div className="mt-4 pt-3 border-t border-[#233044] flex items-center justify-between">
          <div>
            <span className="text-base font-bold text-white">
              ${pricePerNight} {currency}
            </span>
            <span className="text-[11px] text-slate-400 ml-1">/ noche</span>
          </div>
          <span className="text-[11px] text-slate-400 font-medium">{availableDates}</span>
        </div>
      </div>
    </article>
  );
}
