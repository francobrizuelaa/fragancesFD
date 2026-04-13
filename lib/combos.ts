import { v4 as uuidv4 } from 'uuid';
import type { CartItem, ComboGroup, ComboTier } from '@/types/cart';

const TIER1_MIN = 3;
const TIER2_MIN = 5;
const GROUP_SIZE = 5;

export function getComboTier(items: CartItem[]): ComboTier {
  const totalUnits = items.reduce((acc, item) => acc + item.quantity, 0);

  if (totalUnits >= TIER2_MIN) return 'tier2';
  if (totalUnits >= TIER1_MIN) return 'tier1';
  return 'none';
}

export function evaluateCombos(items: CartItem[]): ComboGroup[] {
  const units: { cartItemId: string; price: number }[] = [];

  // 1. Desarmamos todo el carrito en unidades individuales
  for (const item of items) {
    for (let i = 0; i < item.quantity; i += 1) {
      units.push({ cartItemId: item.cartItemId, price: item.unitPrice });
    }
  }

  // 2. LA MAGIA: Ordenamos de MENOR a MAYOR precio absoluto (los más baratos primero)
  units.sort((a, b) => a.price - b.price);

  const comboGroups: ComboGroup[] = [];
  
  // 3. Calculamos matemáticamente cuántos perfumes gratis tocan
  const freeItemsCount = Math.floor(units.length / GROUP_SIZE);

  // 4. Regalamos exactamente esa cantidad, agarrando los primeros de la lista (los más baratos)
  for (let i = 0; i < freeItemsCount; i++) {
    const bonified = units[i];

    comboGroups.push({
      comboId: uuidv4(),
      items: items.filter(item => item.cartItemId === bonified.cartItemId),
      bonifiedItemCartId: bonified.cartItemId,
      savings: bonified.price,
    });
  }

  return comboGroups;
}

export function getEffectivePrice(
  item: CartItem,
  combos: ComboGroup[],
  tier: ComboTier
): number {
  if (tier !== 'tier2') return item.unitPrice;

  const isBonified = combos.some(
    (combo) => combo.bonifiedItemCartId === item.cartItemId
  );

  return isBonified ? 0 : item.unitPrice;
}

export function unitsToNextTier(itemCount: number): number | null {
  if (itemCount < TIER1_MIN) return TIER1_MIN - itemCount;
  if (itemCount < TIER2_MIN) return TIER2_MIN - itemCount;
  return null;
}