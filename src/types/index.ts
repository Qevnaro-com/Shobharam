export interface Product {
  id: string;
  name: string;
  hindiName?: string;
  category: 'mithai' | 'namkeen' | 'ready-to-eat' | 'ghee-spices' | 'hampers' | 'pickles';
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  weight: string;
  description: string;
  ingredients?: string;
  shelfLife?: string;
  image: string;
  rating: number;
  reviewCount: number;
  isVeg: boolean;
  inStock: boolean;
  isBestseller?: boolean;
  isNewArrival?: boolean;
  badge?: string;
  options?: string[];
  deliveryZone: 'fresh-8km' | 'all-india'; // 8 KM for fresh sweets, All India for grocery/packaged
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedWeight?: string;
}

export interface StoreInfo {
  name: string;
  address: string;
  landmark: string;
  area: string;
  city: string;
  district: string;
  state: string;
  pincode: string;
  phone: string;
  email: string;
  radiusKm: number;
}
