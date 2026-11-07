import { supabase, isSupabaseConfigured } from "./client";
import { Property } from "@/types/property";
import { FEATURED_PROPERTIES, INSTANT_BOOK_PROPERTIES } from "@/data/mock-properties";

export interface PropertyDbRow {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  city: string;
  neighborhood: string;
  zone: string | null;
  country: string;
  price_per_night: number;
  total_price: number | null;
  total_nights: number | null;
  currency: string;
  rating: number;
  reviews_count: number;
  images: string[];
  total_photos: number | null;
  badges: string[] | null;
  specs: {
    guests: number;
    bedrooms: number;
    beds: number;
    bathrooms?: number;
  };
  amenities: string[];
  available_dates: string | null;
  host: {
    name: string;
    isSuperhost: boolean;
    avatarUrl?: string;
  } | null;
  is_featured: boolean;
  is_instant_book: boolean;
  is_superhost: boolean;
  is_guest_favorite: boolean;
  is_beachfront: boolean;
  is_pet_friendly: boolean;
  operation_type: "RENT" | "SALE";
  property_type: "villa" | "apartment" | "house" | "loft" | "cabin" | "penthouse";
  created_at?: string;
}

/**
 * Maps a database row from Supabase (snake_case) to the client-facing Property model (camelCase).
 */
export function mapRowToProperty(row: PropertyDbRow): Property {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    description: row.description || undefined,
    location: {
      city: row.city,
      neighborhood: row.neighborhood,
      zone: row.zone || undefined,
      country: row.country || "Bolivia",
    },
    pricePerNight: Number(row.price_per_night),
    totalPrice: row.total_price ? Number(row.total_price) : undefined,
    totalNights: row.total_nights || undefined,
    currency: row.currency || "USD",
    rating: Number(row.rating),
    reviewsCount: row.reviews_count || 0,
    images: Array.isArray(row.images) && row.images.length > 0 ? row.images : [],
    totalPhotos: row.total_photos || (row.images ? row.images.length : 1),
    badges: Array.isArray(row.badges) ? row.badges : [],
    specs: row.specs || {
      guests: 1,
      bedrooms: 1,
      beds: 1,
      bathrooms: 1,
    },
    amenities: Array.isArray(row.amenities) ? row.amenities : [],
    availableDates: row.available_dates || "Consultar fechas",
    host: row.host || undefined,
    isFeatured: Boolean(row.is_featured),
    isInstantBook: Boolean(row.is_instant_book),
    isSuperhost: Boolean(row.is_superhost),
    isGuestFavorite: Boolean(row.is_guest_favorite),
    isBeachfront: Boolean(row.is_beachfront),
    isPetFriendly: Boolean(row.is_pet_friendly),
    operationType: row.operation_type || "RENT",
    propertyType: row.property_type || "apartment",
  };
}

/**
 * Fetches all properties from Supabase `properties` table.
 * If Supabase is not configured or an error occurs, falls back gracefully to local mock data.
 */
export async function getProperties(): Promise<{
  properties: Property[];
  source: "supabase" | "fallback";
}> {
  if (!isSupabaseConfigured) {
    console.info(
      "[Supabase] Ni NEXT_PUBLIC_SUPABASE_ANON_KEY ni NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY están configuradas en .env.local. Usando datos locales de respaldo."
    );
    return {
      properties: [...FEATURED_PROPERTIES, ...INSTANT_BOOK_PROPERTIES],
      source: "fallback",
    };
  }

  try {
    const { data, error } = await supabase
      .from("properties")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      console.warn("[Supabase] Error consultando properties:", error.message);
      return {
        properties: [...FEATURED_PROPERTIES, ...INSTANT_BOOK_PROPERTIES],
        source: "fallback",
      };
    }

    if (!data || data.length === 0) {
      console.info("[Supabase] La tabla properties está vacía. Mostrando datos locales de respaldo.");
      return {
        properties: [...FEATURED_PROPERTIES, ...INSTANT_BOOK_PROPERTIES],
        source: "fallback",
      };
    }

    return {
      properties: (data as PropertyDbRow[]).map(mapRowToProperty),
      source: "supabase",
    };
  } catch (err) {
    console.error("[Supabase] Error inesperado en getProperties:", err);
    return {
      properties: [...FEATURED_PROPERTIES, ...INSTANT_BOOK_PROPERTIES],
      source: "fallback",
    };
  }
}
