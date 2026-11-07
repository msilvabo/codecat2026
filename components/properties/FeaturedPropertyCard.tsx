import React from "react";
import { Property } from "@/types/property";
import { Badge } from "../ui/Badge";
import { FavoriteButton } from "../ui/FavoriteButton";
import { LocationPinIcon, CalendarIcon } from "../ui/Icons";

interface FeaturedPropertyCardProps {
  property: Property;
  onBook?: (property: Property) => void;
}

export function FeaturedPropertyCard({ property, onBook }: FeaturedPropertyCardProps) {
  const {
    title,
    location,
    pricePerNight,
    totalPrice,
    totalNights = 6,
    currency,
    rating,
    reviewsCount,
    images,
    totalPhotos = 8,
    badges = [],
    specs,
    amenities,
    availableDates,
  } = property;

  const mainImage = images[0] || "/placeholder.jpg";
  const locationString = `${location.neighborhood}, ${location.city}${
    location.zone ? ` · ${location.zone}` : ""
  }`;

  return (
    <article className="bg-[#151D2A] border border-[#233044] rounded-3xl overflow-hidden hover:border-emerald-500/50 transition-all duration-300 group flex flex-col shadow-xl shadow-black/40">
      {/* Property Main Visual */}
      <div className="relative h-72 sm:h-80 md:h-84 overflow-hidden">
        <img
          alt={title}
          src={mainImage}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#151D2A] via-transparent to-black/30" />

        {/* Badges overlay */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          {badges.map((badge, idx) => (
            <Badge
              key={idx}
              variant={idx === 0 ? "glass" : "card"}
            >
              {badge}
            </Badge>
          ))}
        </div>

        {/* Favorite Button */}
        <div className="absolute top-4 right-4">
          <FavoriteButton size="md" />
        </div>

        {/* Bottom overlay detail */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-slate-300">
          <span className="inline-flex items-center gap-1.5 bg-[#0B0F17]/80 backdrop-blur-sm px-2.5 py-1 rounded-md border border-[#233044]">
            <CalendarIcon className="w-3.5 h-3.5 text-emerald-400" />
            {availableDates}
          </span>
          <span className="bg-black/60 px-2 py-1 rounded text-slate-300 font-mono text-[11px]">
            1/{totalPhotos} fotos
          </span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Location & Rating Header */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-1">
              <LocationPinIcon className="w-3.5 h-3.5 text-slate-500" />
              {locationString}
            </p>
            <div className="flex items-center gap-1 text-sm font-semibold text-emerald-400">
              <span>★ {rating.toFixed(2)}</span>
              <span className="text-slate-400 font-normal text-xs">({reviewsCount} reseñas)</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors line-clamp-2">
            {title}
          </h3>

          {/* Feature pills */}
          <div className="flex flex-wrap items-center gap-2 mt-3 text-xs text-slate-300">
            <span className="bg-[#1F2B3D] px-2.5 py-1 rounded-md">
              {specs.guests} huéspedes
            </span>
            <span className="bg-[#1F2B3D] px-2.5 py-1 rounded-md">
              {specs.bedrooms} habitaciones · {specs.beds} camas
            </span>
            {amenities.slice(0, 2).map((amenity, idx) => (
              <span key={idx} className="bg-[#1F2B3D] px-2.5 py-1 rounded-md">
                {amenity}
              </span>
            ))}
          </div>
        </div>

        {/* Price & Action Footer */}
        <div className="mt-6 pt-4 border-t border-[#233044] flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-bold text-white">
                ${pricePerNight} {currency}
              </span>
              <span className="text-slate-400 text-xs font-medium">/ noche</span>
            </div>
            {totalPrice && (
              <p className="text-xs text-slate-400 mt-0.5">
                ${totalPrice} {currency} total por {totalNights} noches
              </p>
            )}
          </div>
          <button
            onClick={() => onBook && onBook(property)}
            className="px-6 py-2.5 bg-[#FF385C] hover:bg-[#E00B41] text-white font-medium text-xs tracking-wider uppercase rounded-xl transition-all shadow-md shadow-black/40 hover:scale-[1.02]"
          >
            Reservar
          </button>
        </div>
      </div>
    </article>
  );
}
