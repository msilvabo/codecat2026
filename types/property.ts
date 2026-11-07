export interface PropertyLocation {
  city: string;
  neighborhood: string;
  zone?: string;
  country: string;
}

export interface PropertySpecs {
  guests: number;
  bedrooms: number;
  beds: number;
  bathrooms?: number;
}

export interface Host {
  name: string;
  isSuperhost: boolean;
  avatarUrl?: string;
}

export interface Property {
  id: string;
  title: string;
  slug: string;
  description?: string;
  location: PropertyLocation;
  pricePerNight: number;
  totalPrice?: number;
  totalNights?: number;
  currency: string;
  rating: number;
  reviewsCount: number;
  images: string[];
  totalPhotos?: number;
  badges?: string[];
  specs: PropertySpecs;
  amenities: string[];
  availableDates: string;
  host?: Host;
  isFeatured?: boolean;
  isInstantBook?: boolean;
  isSuperhost?: boolean;
  isGuestFavorite?: boolean;
  isBeachfront?: boolean;
  isPetFriendly?: boolean;
  operationType: 'RENT' | 'SALE';
  propertyType: 'villa' | 'apartment' | 'house' | 'loft' | 'cabin' | 'penthouse';
}

export interface CategoryItem {
  id: string;
  name: string;
  icon: 'all' | 'luxury_villas' | 'beachfront' | 'cabins' | 'penthouses' | 'pet_friendly';
}

export interface PriceRange {
  min: number;
  max: number;
}

export interface FilterState {
  category: string;
  destination: string;
  priceRange: PriceRange;
  propertyType?: string;
}
