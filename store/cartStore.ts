import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import type { CartItem, CartState, ComboGroup } from '@/types/cart';
import { evaluateCombos, getComboTier } from '@/lib/combos';

interface CartActions {
  addItem: (item: Omit<CartItem, 'cartItemId'>) => void;
  removeItem: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  _recompute: () => void;
  openCartDrawer: () => void;
  closeCartDrawer: () => void;
}

type CartStore = CartState &
  CartActions & {
    drawerOpen: boolean;
  };

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      combos: [],
      comboTier: 'none',
      subtotal: 0,
      totalSavings: 0,
      total: 0,
      itemCount: 0,
      drawerOpen: false,

      openCartDrawer: () => set({ drawerOpen: true }),
      closeCartDrawer: () => set({ drawerOpen: false }),

      addItem: (newItem) => {
        set((state) => {
          const existing = state.items.find(
            (item) =>
              item.productId === newItem.productId &&
              item.selectedSize?.id === newItem.selectedSize?.id
          );

          const updatedItems = existing
            ? state.items.map((item) =>
                item.cartItemId === existing.cartItemId
                  ? { ...item, quantity: item.quantity + (newItem.quantity ?? 1) }
                  : item
              )
            : [...state.items, { ...newItem, cartItemId: uuidv4() }];

          return { items: updatedItems };
        });

        get()._recompute();
      },

      removeItem: (cartItemId) => {
        set((state) => ({
          items: state.items.filter((item) => item.cartItemId !== cartItemId),
        }));

        get()._recompute();
      },

      updateQuantity: (cartItemId, quantity) => {
        if (quantity < 1) {
          get().removeItem(cartItemId);
          return;
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.cartItemId === cartItemId ? { ...item, quantity } : item
          ),
        }));

        get()._recompute();
      },

      clearCart: () => {
        set({
          items: [],
          combos: [],
          comboTier: 'none',
          subtotal: 0,
          totalSavings: 0,
          total: 0,
          itemCount: 0,
        });
      },

      _recompute: () => {
        const { items } = get();

        const tier = getComboTier(items);
        const combos: ComboGroup[] = tier === 'tier2' ? evaluateCombos(items) : [];
        const bonifiedIds = new Set(combos.map((combo) => combo.bonifiedItemCartId));

        const subtotal = items.reduce(
          (acc, item) => acc + item.unitPrice * item.quantity,
          0
        );
        const totalSavings = combos.reduce((acc, combo) => acc + combo.savings, 0);

        set({
          combos,
          comboTier: tier,
          items: items.map((item) => ({
            ...item,
            isBonified: tier === 'tier2' && bonifiedIds.has(item.cartItemId),
          })),
          subtotal,
          totalSavings,
          total: subtotal - totalSavings,
          itemCount: items.reduce((acc, item) => acc + item.quantity, 0),
        });
      },
    }),
    {
      name: 'perfumes-cart',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
      onRehydrateStorage: () => (state) => {
        state?._recompute();
      },
    }
  )
);
