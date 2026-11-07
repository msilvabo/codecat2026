"use client";

import React, { useState } from "react";
import { HeartIcon } from "./Icons";

interface FavoriteButtonProps {
  initialFavorite?: boolean;
  size?: "sm" | "md";
  className?: string;
  onToggle?: (isFav: boolean) => void;
}

export function FavoriteButton({
  initialFavorite = false,
  size = "md",
  className = "",
  onToggle,
}: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(initialFavorite);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const nextState = !isFavorite;
    setIsFavorite(nextState);
    if (onToggle) {
      onToggle(nextState);
    }
  };

  const containerClasses =
    size === "md"
      ? "w-9 h-9 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center transition-colors"
      : "p-1.5 rounded-full bg-black/40 hover:bg-black/70 flex items-center justify-center transition-colors";

  const iconClasses =
    size === "md"
      ? isFavorite
        ? "w-5 h-5 text-rose-500 fill-rose-500"
        : "w-5 h-5 text-white hover:text-rose-400"
      : isFavorite
      ? "w-4 h-4 text-rose-500 fill-rose-500"
      : "w-4 h-4 text-white hover:text-rose-400";

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`${containerClasses} ${className}`}
      title={isFavorite ? "Quitar de favoritos" : "Guardar en favoritos"}
      aria-label="Guardar propiedad"
    >
      <HeartIcon className={iconClasses} filled={isFavorite} />
    </button>
  );
}
