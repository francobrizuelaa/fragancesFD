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
  const bonifiedIds = new Set(
    data.comboTier === 'tier2'
      ? data.combos.map((combo) => combo.bonifiedItemCartId)
      : []
  );

  const lines = data.items.map((item) => {
    const size = item.selectedSize ? ` (${item.selectedSize.label})` : '';
    const isBonified = bonifiedIds.has(item.cartItemId);
    const bonifiedTag = isBonified ? ' 🎁 *BONIFICADO*' : '';
    const lineTotal = isBonified
      ? '$0,00'
      : formatCurrency(item.unitPrice * item.quantity);

    return `• ${item.quantity}x ${item.brandName} - ${item.productName}${size}${bonifiedTag} → ${lineTotal}`;
  });

  const summaryLines: string[] = [];
  if (data.comboTier === 'tier2' && data.totalSavings > 0) {
    summaryLines.push(
      `💸 *Descuento aplicado: -${formatCurrency(data.totalSavings)}*`
    );
  }
  summaryLines.push(`💰 *Total a pagar: ${formatCurrency(data.total)}*`);

  const giftLine =
    data.comboTier === 'tier1' || data.comboTier === 'tier2'
      ? '🎁 Incluye 1 Decant Sorpresa de Regalo'
      : null;

  const message = [
    '🛍️ *Nuevo Pedido*',
    '',
    ...(data.customerName ? [`👤 Cliente: ${data.customerName}`] : []),
    '',
    '📦 *Detalle del pedido:*',
    ...lines,
    '',
    ...summaryLines,
    ...(giftLine ? ['', giftLine] : []),
    ...(data.customerNotes ? ['', `📝 Notas: ${data.customerNotes}`] : []),
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
