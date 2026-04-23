import type { CartItem, ComboGroup, ComboTier } from '@/types/cart';

interface CheckoutData {
  items: CartItem[];
  combos: ComboGroup[];
  comboTier: ComboTier;
  subtotal: number;
  totalSavings: number;
  total: number;
  customerName?: string;
  customerNotes?: string;
}

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER!;

export function buildWhatsAppMessage(data: CheckoutData): string {
  // Lógica del regalo sobrante que arreglamos antes
  const totalUnits = data.items.reduce((acc, item) => acc + item.quantity, 0);
  const hasSurpriseGift = (totalUnits % 5) >= 3;

  const bonifiedIds = new Set(
    data.comboTier === 'tier2'
      ? data.combos.map((combo) => combo.bonifiedItemCartId)
      : []
  );

  const lines = data.items.map((item) => {
    const size = item.selectedSize ? ` (${item.selectedSize.label})` : '';
    const isBonified = bonifiedIds.has(item.cartItemId);
    
    // Si está bonificado, tachamos el precio real y ponemos GRATIS en negrita
    const lineTotal = isBonified
      ? `~${formatCurrency(item.unitPrice * item.quantity)}~ *¡GRATIS!*`
      : `*${formatCurrency(item.unitPrice * item.quantity)}*`;

    return `▪️ ${item.quantity}x ${item.brandName} - ${item.productName}${size}\n   ↳ ${lineTotal}`;
  });

  const summaryLines: string[] = [];
  summaryLines.push(`Subtotal: ${formatCurrency(data.subtotal)}`);
  
  if (data.comboTier === 'tier2' && data.totalSavings > 0) {
    summaryLines.push(`Descuentos: -${formatCurrency(data.totalSavings)}`);
  }
  summaryLines.push(`*TOTAL A PAGAR: ${formatCurrency(data.total)}*`);

  const giftLine = hasSurpriseGift
    ? '✨ *¡ATENCIÓN! Este pedido incluye 1 Decant Sorpresa de Regalo* ✨'
    : null;

  const message = [
    '*NUEVO PEDIDO - FD FRAGANCES* 🖤',
    '-----------------------------------',
    ...(data.customerName ? [`*Cliente:* ${data.customerName}`, ''] : []),
    '*Detalle de la compra:*',
    ...lines,
    '-----------------------------------',
    ...summaryLines,
    ...(giftLine ? ['', giftLine] : []),
    ...(data.customerNotes ? ['', `_Notas del cliente: ${data.customerNotes}_`] : []),
  ].join('\n');

  return message.trim();
}

export function buildWhatsAppURL(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
  }).format(amount);
}