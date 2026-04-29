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

const RULE_HEAVY = '================================';
const RULE_LIGHT = '--------------------------------';

function stripInvalidSurrogates(input: string): string {
  let out = '';
  for (let i = 0; i < input.length; i++) {
    const codeUnit = input.charCodeAt(i);
    if (codeUnit >= 0xd800 && codeUnit <= 0xdbff) {
      const next = input.charCodeAt(i + 1);
      if (next >= 0xdc00 && next <= 0xdfff) {
        out += input[i] + input[i + 1];
        i++;
      }
      continue;
    }
    if (codeUnit >= 0xdc00 && codeUnit <= 0xdfff) continue;
    out += input[i];
  }
  return out;
}

function sanitizeWhatsAppText(text: string): string {
  const normalizedNewlines = text.replace(/\r\n?/g, '\n');
  const withoutBrokenSurrogates = stripInvalidSurrogates(normalizedNewlines);
  return withoutBrokenSurrogates
    .normalize('NFC')
    .replace(/[\u00A0\u202F]/g, ' ');
}

function sanitizeWaMeNumber(raw: string): string {
  return raw.replace(/[^\d]/g, '');
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
  })
    .format(amount)
    .replace(/\u00A0/g, ' ');
}

const FD_TIPS = [
  'Escribinos como te gustaria recibir el pedido',
  'Para pedidos grandes, confirmá stock antes de abonar.',
  'Contamos con un stock de +2000 perfumes. Si te gustaria probar alguna fragancia que no ves en la pagina, hacemelo saber',
] as const;

export function buildWhatsAppMessage(data: CheckoutData): string {
  const totalUnits = data.items.reduce((acc, item) => acc + item.quantity, 0);
  
  // Promoción actualizada: Decant gratis desde las 3 unidades
  const hasSurpriseGift = totalUnits >= 3;

  // NUEVA LÓGICA: Contamos CUÁNTOS perfumes de cada ID nos regalaron
  const bonifiedCounts: Record<string, number> = {};
  if (data.comboTier === 'tier2') {
    data.combos.forEach((combo) => {
      bonifiedCounts[combo.bonifiedItemCartId] = 
        (bonifiedCounts[combo.bonifiedItemCartId] || 0) + 1;
    });
  }

  const lines = data.items.map((item, i) => {
    const n = i + 1;
    const size = item.selectedSize ? ` (${item.selectedSize.label})` : '';
    
    // Vemos cuántos de este renglón son gratis
    const bonifiedQty = bonifiedCounts[item.cartItemId] || 0;
    const totalPrice = item.unitPrice * item.quantity;
    
    let lineTotal = '';

    if (bonifiedQty === 0) {
      // CASO 1: Ninguno es gratis, se paga el total normal
      lineTotal = `*${formatCurrency(totalPrice)}*`;
    } else if (bonifiedQty === item.quantity) {
      // CASO 2: Llevó 1 y justo es el gratis (se tacha todo el precio)
      lineTotal = `~${formatCurrency(totalPrice)}~  *GRATIS (bonificado)*`;
    } else {
      // CASO 3: Llevó 8, pero solo 1 o 2 son gratis (muestra precio normal y avisa cuántos bonificó)
      lineTotal = `*${formatCurrency(totalPrice)}* _(${bonifiedQty} bonificado${bonifiedQty > 1 ? 's' : ''})_`;
    }

    return [
      `(${n})  ${item.quantity}x  ${item.brandName}  -  ${item.productName}${size}`,
      `     Total línea:  ${lineTotal}`,
    ].join('\n');
  });

  const summary: string[] = [
    `Subtotal:   ${formatCurrency(data.subtotal)}`,
  ];
  
  if (data.comboTier === 'tier2' && data.totalSavings > 0) {
    summary.push(`Ahorro combo:  -${formatCurrency(data.totalSavings)}`);
  }
  summary.push(`*TOTAL A PAGAR:  ${formatCurrency(data.total)}*`);

  const giftLine = hasSurpriseGift
    ? `*PROMO ACTIVA:* Este pedido incluye 1 decant sorpresa de regalo.`
    : null;

  const message = [
    `*NUEVO PEDIDO  |  FD FRAGANCES*`,
    `${RULE_HEAVY}`,
    ...(data.customerName
      ? ['', `*Cliente:* ${data.customerName}`]
      : []),
    '',
    `*Detalle*`,
    ...lines,
    '',
    `${RULE_LIGHT}`,
    ...summary,
    ...(giftLine ? ['', giftLine] : []),
    ...(data.customerNotes
      ? ['', `*Notas del cliente*`, `_ ${data.customerNotes} _`]
      : []),
    '',
    `${RULE_LIGHT}`,
    `*FD Tips*`,
    ...FD_TIPS.map((t, idx) => `${idx + 1}. ${t}`),
  ].join('\n');

  return sanitizeWhatsAppText(message).trim();
}

export function buildWhatsAppURL(message: string): string {
  const number = sanitizeWaMeNumber(WHATSAPP_NUMBER);
  const safeMessage = sanitizeWhatsAppText(message).trim();
  const url = new URL(`https://wa.me/${number}`);
  url.searchParams.set('text', safeMessage);
  return url.toString();
}

/** Enlace wa.me para consulta desde la ficha de un producto. */
export function buildProductConsultWhatsAppURL(
  brand: string,
  productName: string
): string | null {
  const raw = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  if (!raw?.trim()) return null;
  const number = sanitizeWaMeNumber(raw);
  if (!number) return null;
  const url = new URL(`https://wa.me/${number}`);
  url.searchParams.set(
    'text',
    `Hola, consulto por el perfume: ${brand} - ${productName}`
  );
  return url.toString();
}