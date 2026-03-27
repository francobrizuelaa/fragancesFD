import { useCartStore } from '@/store/cartStore';

export function useCart() {
  const store = useCartStore();

  return {
    items: store.items,
    combos: store.combos,
    comboTier: store.comboTier,
    subtotal: store.subtotal,
    totalSavings: store.totalSavings,
    total: store.total,
    itemCount: store.itemCount,
    addItem: store.addItem,
    removeItem: store.removeItem,
    updateQuantity: store.updateQuantity,
    clearCart: store.clearCart,
  };
}
