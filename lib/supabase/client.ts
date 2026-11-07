import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://ecfyeaatwwiflpxncqka.supabase.co";

// Acepta tanto NEXT_PUBLIC_SUPABASE_ANON_KEY como NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY (nomenclatura moderna de Supabase)
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  "";

// Inicializa el cliente Supabase. Si la clave no está asignada aún, usa un placeholder para evitar caídas en SSR.
export const supabase = createClient(
  supabaseUrl,
  supabaseKey || "placeholder-anon-key"
);

export const isSupabaseConfigured = Boolean(
  supabaseUrl && supabaseKey.trim().length > 0
);
