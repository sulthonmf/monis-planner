import { Product, BackgroundOption } from '@/types/workspace';

export const products: Product[] = [
  // === DESKS ===
  {
    id: 'standing-desk-pro',
    name: 'Standing Desk Pro',
    category: 'desk',
    price: 62500,
    image: '/assets/desks/standing-desk-pro.svg',
    description: 'Electric height-adjustable standing desk with premium dark wood top.',
    badge: 'Popular',
  },
  {
    id: 'wooden-desk',
    name: 'Wooden Desk',
    category: 'desk',
    price: 50000,
    image: '/assets/desks/wooden-desk.svg',
    description: 'Classic solid oak wood desk with elegant natural finish.',
  },
  {
    id: 'bamboo-desk',
    name: 'Bamboo Eco Desk',
    category: 'desk',
    price: 55000,
    image: '/assets/desks/bamboo-desk.svg',
    description: 'Sustainable bamboo top desk with minimalist clean design.',
  },
  {
    id: 'white-desk',
    name: 'Minimalist White Desk',
    category: 'desk',
    price: 48000,
    image: '/assets/desks/white-desk.svg',
    description: 'Clean Nordic minimalist white top desk with natural birch wood legs.',
  },

  // === CHAIRS ===
  {
    id: 'ergonomic-chair',
    name: 'Ergonomic Pro Chair',
    category: 'chair',
    price: 45000,
    image: '/assets/chairs/ergonomic-chair.svg',
    description: 'Full-support mesh chair with adjustable headrest and lumbar support.',
    badge: 'Best Value',
  },
  {
    id: 'executive-chair',
    name: 'Executive Leather Chair',
    category: 'chair',
    price: 55000,
    image: '/assets/chairs/executive-chair.svg',
    description: 'Premium faux-leather high-back executive chair.',
  },
  {
    id: 'gaming-chair',
    name: 'Gaming Racing Chair',
    category: 'chair',
    price: 50000,
    image: '/assets/chairs/gaming-chair.svg',
    description: 'Ergonomic racing bucket seat with head pillow and lumbar cushion.',
    badge: 'Gaming',
  },
  {
    id: 'task-chair',
    name: 'Minimalist Task Chair',
    category: 'chair',
    price: 35000,
    image: '/assets/chairs/task-chair.svg',
    description: 'Compact mid-back task chair ideal for clean setups.',
  },

  // === ACCESSORIES ===
  {
    id: 'monitor-single',
    name: 'Single 24" Monitor',
    category: 'accessory',
    price: 40000,
    image: '/assets/accessories/monitor-24.svg',
    description: 'Full HD IPS 24" display with slim bezel.',
  },
  {
    id: 'monitor-dual',
    name: 'Dual 24" Monitors',
    category: 'accessory',
    price: 80000,
    image: '/assets/accessories/monitor-dual.svg',
    description: 'Dual side-by-side 24" IPS displays mounted on heavy-duty desk arm.',
    badge: 'Popular',
  },
  {
    id: 'monitor-ultrawide',
    name: '34" Ultrawide Curved',
    category: 'accessory',
    price: 70000,
    image: '/assets/accessories/monitor-ultrawide.svg',
    description: '34" WQHD Ultrawide curved display for immersive gaming and productivity.',
  },
  {
    id: 'pc-gaming',
    name: 'Gaming PC Tower',
    category: 'accessory',
    price: 75000,
    image: '/assets/accessories/pc-gaming.svg',
    description: 'High-performance RGB Gaming Rig with AIO liquid cooling and RTX graphics card.',
    badge: 'Gaming',
  },
  {
    id: 'lightbar',
    name: 'Cyber RGB Lightbar',
    category: 'accessory',
    price: 15000,
    image: '/assets/accessories/lightbar.svg',
    description: 'Monitor top lightbar with warm eye-care downlight and RGB ambient backglow.',
  },
  {
    id: 'lamp',
    name: 'Adjustable Lamp',
    category: 'accessory',
    price: 12000,
    image: '/assets/accessories/lamp.svg',
    description: 'Adjustable desk lamp with warm eye-care LED light.',
  },
  {
    id: 'plant',
    name: 'Monstera Plant',
    category: 'accessory',
    price: 7000,
    image: '/assets/accessories/plant.svg',
    description: 'Fresh indoor green Monstera potted plant to boost productivity.',
  },
  {
    id: 'bonsai-plant',
    name: 'Zen Bonsai Tree',
    category: 'accessory',
    price: 9000,
    image: '/assets/accessories/bonsai-plant.svg',
    description: 'Japanese Zen desk bonsai tree in ceramic dish.',
  },
  {
    id: 'keyboard',
    name: 'Mechanical Keyboard',
    category: 'accessory',
    price: 7000,
    image: '/assets/accessories/keyboard.svg',
    description: '75% mechanical keyboard with RGB underglow and satisfying switches.',
  },
  {
    id: 'mouse',
    name: 'Wireless Mouse',
    category: 'accessory',
    price: 5000,
    image: '/assets/accessories/mouse.svg',
    description: 'Precision wireless ergonomic mouse with DPI control.',
  },
  {
    id: 'laptop-stand',
    name: 'Laptop Riser Stand',
    category: 'accessory',
    price: 10000,
    image: '/assets/accessories/laptop-stand.svg',
    description: 'Aluminum notebook riser with Space Grey MacBook.',
  },
  {
    id: 'headset',
    name: 'Over-Ear Headset',
    category: 'accessory',
    price: 5000,
    image: '/assets/accessories/headset.svg',
    description: 'Over-ear noise-isolating headset with built-in mic.',
  },
];

export const backgrounds: BackgroundOption[] = [
  {
    id: 'gaming-room',
    name: 'Gaming Room',
    thumbnail: '/assets/backgrounds/gaming-room.svg',
    imagePath: '/assets/backgrounds/gaming-room.svg',
  },
  {
    id: 'streamer-room',
    name: 'Streamer Room',
    thumbnail: '/assets/backgrounds/streamer-room.svg',
    imagePath: '/assets/backgrounds/streamer-room.svg',
  },
  {
    id: 'cozy-bedroom',
    name: 'Cozy Bedroom',
    thumbnail: '/assets/backgrounds/cozy-bedroom.svg',
    imagePath: '/assets/backgrounds/cozy-bedroom.svg',
  },
  {
    id: 'modern-loft',
    name: 'Modern Loft',
    thumbnail: '/assets/backgrounds/modern-loft.svg',
    imagePath: '/assets/backgrounds/modern-loft.svg',
  },
];

export const durationOptions = [
  { weeks: 1, discount: 0, label: '1 Week' },
  { weeks: 2, discount: 5, label: '2 Weeks' },
  { weeks: 4, discount: 10, label: '4 Weeks' },
  { weeks: 8, discount: 15, label: '8 Weeks' },
] as const;

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(category: Product['category']): Product[] {
  return products.filter((p) => p.category === category);
}

export function formatPrice(price: number): string {
  return `Rp ${price.toLocaleString('id-ID')}`;
}
