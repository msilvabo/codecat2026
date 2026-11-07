import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "glass" | "card" | "amber" | "emerald" | "compact";
  className?: string;
}

export function Badge({ children, variant = "glass", className = "" }: BadgeProps) {
  const baseClasses = "inline-flex items-center font-bold tracking-wider uppercase";

  const variantClasses = {
    glass: "px-3 py-1 rounded-full text-xs bg-black/60 backdrop-blur-md text-white border border-white/20",
    card: "px-3 py-1 rounded-full text-xs font-semibold bg-[#151D2A] border border-[#233044] text-slate-200",
    amber: "px-2 py-0.5 rounded-full text-[10px] bg-slate-950/80 backdrop-blur-sm text-amber-400 border border-amber-500/30",
    emerald: "px-2 py-0.5 rounded-full text-[10px] bg-slate-950/80 backdrop-blur-sm text-emerald-400 border border-emerald-500/30",
    compact: "px-2 py-0.5 rounded-full text-[10px] bg-slate-950/80 backdrop-blur-sm text-slate-200 border border-white/20",
  }[variant];

  return <span className={`${baseClasses} ${variantClasses} ${className}`}>{children}</span>;
}
