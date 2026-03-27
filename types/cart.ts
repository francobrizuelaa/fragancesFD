export interface CartItemSize {
  id: string;
  label: string;
  volume_ml?: number;
  price: number;
}

export interface CartItem {
  cartItemId: string;
  productId: string;
  productName: string;
  brandName: string;
  slug: string;
  coverImageUrl: string;
  selectedSize: CartItemSize | null;
  quantity: number;
  unitPrice: number;
  isDecant: boolean;
  comboId?: string;
  isBonified?: boolean;
}

export type ComboTier = 'none' | 'tier1' | 'tier2';

export interface ComboGroup {
  comboId: string;
  items: CartItem[];
  bonifiedItemCartId: string;
  savings: number;
}

export interface CartState {
  items: CartItem[];
  combos: ComboGroup[];
  comboTier: ComboTier;
  subtotal: number;
  totalSavings: number;
  total: number;
  itemCount: number;
}
