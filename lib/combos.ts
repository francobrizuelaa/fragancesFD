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

  for (const item of items) {
    for (let i = 0; i < item.quantity; i += 1) {
      units.push({ cartItemId: item.cartItemId, price: item.unitPrice });
    }
  }

  units.sort((a, b) => b.price - a.price);

  const comboGroups: ComboGroup[] = [];
  let i = 0;

  while (i + GROUP_SIZE <= units.length) {
    const group = units.slice(i, i + GROUP_SIZE);
    const bonified = group[group.length - 1];
    const groupItemIds = [...new Set(group.map((unit) => unit.cartItemId))];

    comboGroups.push({
      comboId: uuidv4(),
      items: items.filter((item) => groupItemIds.includes(item.cartItemId)),
      bonifiedItemCartId: bonified.cartItemId,
      savings: bonified.price,
    });

    i += GROUP_SIZE;
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
