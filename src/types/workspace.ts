// TypeScript interfaces for Monis.rent Workspace Customizer

export type CategoryTab =
  | 'all'
  | 'computer'
  | 'monitors'
  | 'audio-video'
  | 'office-accessories'
  | 'health-fitness'
  | 'furniture'
  | 'smart-home'
  | 'gaming';

export interface Product {
  id: string;
  name: string;
  category: 'desk' | 'chair' | 'accessory'; // Canvas placement item type
  subCategories: CategoryTab[]; // Multi-category matching
  price: number; // price in IDR (Rp) per week
  image: string; // path to product image
  description?: string;
  badge?: string; // e.g. "Popular", "Best Value"
}

export interface BackgroundOption {
  id: string;
  name: string;
  thumbnail: string; // small preview image path or emoji
  imagePath: string; // full background image path
}

export interface WorkspaceSetup {
  selectedDeskId: string;
  selectedChairId: string;
  selectedAccessories: Record<string, number>; // productId -> quantity
  selectedBackgroundId: string;
  duration: number; // rental duration in weeks
}

export type Currency = 'IDR' | 'USD' | 'EUR';

