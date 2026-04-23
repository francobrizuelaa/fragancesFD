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

// TRUCO 3: Normalizar la cadena para evitar caracteres rotos
function sanitizeMessage(text: string): string {
  return text.normalize('NFC');
}

// TRUCO 4: Limpiar el espacio invisible (\u00A0) que rompe las URLs
function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
  })
    .format(amount)
    .replace(/\u00A0/g, ' '); 
}

export function buildWhatsAppMessage(data: CheckoutData): string {
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
    
    // TRUCO 2: Unicode explícito (\u{1F381} = 🎁)
    const lineTotal = isBonified
      ? `~${formatCurrency(item.unitPrice * item.quantity)}~ *¡GRATIS!* \u{1F381}`
      : `*${formatCurrency(item.unitPrice * item.quantity)}*`;

    // \u{1F538} = 🔸 | \u21B3 = ↳
    return `\u{1F538} ${item.quantity}x ${item.brandName} - ${item.productName}${size}\n   \u21B3 ${lineTotal}`;
  });

  const summaryLines: string[] = [];
  // \u{1F4DD} = 📝
  summaryLines.push(`\u{1F4DD} Subtotal: ${formatCurrency(data.subtotal)}`);
  
  if (data.comboTier === 'tier2' && data.totalSavings > 0) {
    // \u{1F4B8} = 💸
    summaryLines.push(`\u{1F4B8} Descuentos: -${formatCurrency(data.totalSavings)}`);
  }
  // \u{1F4B0} = 💰
  summaryLines.push(`\u{1F4B0} *TOTAL A PAGAR: ${formatCurrency(data.total)}*`);

  // \u2728 = ✨
  const giftLine = hasSurpriseGift
    ? '\u2728 *¡ATENCIÓN! Este pedido incluye 1 Decant Sorpresa de Regalo* \u2728'
    : null;

  const message = [
    // \u{1F6CD}\u{FE0F} = 🛍️ | \u{1F5A4} = 🖤
    '\u{1F6CD}\u{FE0F} *NUEVO PEDIDO - FD FRAGANCES* \u{1F5A4}',
    '-----------------------------------',
    // \u{1F464} = 👤
    ...(data.customerName ? [`\u{1F464} *Cliente:* ${data.customerName}`, ''] : []),
    // \u{1F4E6} = 📦
    '\u{1F4E6} *Detalle de la compra:*',
    ...lines,
    '-----------------------------------',
    ...summaryLines,
    ...(giftLine ? ['', giftLine] : []),
    // \u{1F4CC} = 📌
    ...(data.customerNotes ? ['', `\u{1F4CC} _Notas del cliente: ${data.customerNotes}_`] : []),
  ].join('\n');

  return sanitizeMessage(message).trim();
}

export function buildWhatsAppURL(message: string): string {
  // Ahora el string ya está sanitizado y limpio de espacios raros antes de encodearse
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}