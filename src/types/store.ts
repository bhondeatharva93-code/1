export type CategoryType =
  | 'Laptops'
  | 'Desktop Computers'
  | 'Gaming PCs'
  | 'Processors'
  | 'Graphics Cards'
  | 'Motherboards'
  | 'Monitors'
  | 'Keyboards & Mouse'
  | 'Printers'
  | 'Computer Accessories';

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: CategoryType;
  price: number;
  oldPrice: number;
  discountPercentage: number;
  rating: number;
  reviewCount: number;
  image: string;
  inStock: boolean;
  featured?: boolean;
  isDiwaliDeal?: boolean;
  tag?: string;
  specs: string[];
  description: string;
  warranty: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface PCPart {
  id: string;
  type: 'cpu' | 'gpu' | 'motherboard' | 'ram' | 'storage' | 'psu' | 'case' | 'cooler';
  name: string;
  brand: string;
  price: number;
  wattage: number;
  performanceTier: 'Entry' | 'Mid' | 'High-End' | 'Enthusiast';
  keySpec: string;
}

export interface CustomPCBuild {
  cpu?: PCPart;
  gpu?: PCPart;
  motherboard?: PCPart;
  ram?: PCPart;
  storage?: PCPart;
  psu?: PCPart;
  case?: PCPart;
  cooler?: PCPart;
}

export interface CustomerOrder {
  orderId: string;
  customerName: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
  paymentMethod: 'cod' | 'upi' | 'store_pickup';
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  timestamp: string;
}
