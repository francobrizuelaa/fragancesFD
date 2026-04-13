'use client';

import { useMemo } from 'react';
import { useCart } from '@/hooks/useCart';
import { buildWhatsAppMessage, buildWhatsAppURL } from '@/lib/whatsapp';

function formatMoney(amount: number): string {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(amount);
}

export interface CartSidebarProps {
  onClose?: () => void;
}

export function CartSidebar({ onClose }: CartSidebarProps) {
  const {
    items,
    combos,
    comboTier,
    subtotal,
    totalSavings,
    total,
    updateQuantity,
    removeItem,
  } = useCart();

  const whatsappConfigured = Boolean(
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER
  );

  const checkoutUrl = useMemo(() => {
    if (!whatsappConfigured) return null;
    const message = buildWhatsAppMessage({
      items,
      combos,
      comboTier,
      subtotal,
      totalSavings,
      total,
    });
    return buildWhatsAppURL(message);
  }, [
    whatsappConfigured,
    items,
    combos,
    comboTier,
    subtotal,
    totalSavings,
    total,
  ]);

  return (
    <div className="flex h-full min-h-0 flex-col border-zinc-200 bg-white shadow-xl lg:rounded-2xl lg:border">
      <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-3">
        <h2 className="text-lg font-semibold text-primary">
          Carrito
        </h2>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"
            aria-label="Cerrar carrito"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-3">
        {comboTier === 'tier1' && (
          <div className="mb-3 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-900">
            <p className="font-semibold">Nivel 1 — Regalo activo</p>
            <p className="mt-0.5 text-xs opacity-90">
              Incluye 1 decant sorpresa de regalo en tu pedido.
            </p>
          </div>
        )}

        {comboTier === 'tier2' && (
          <div className="mb-3 rounded-xl border border-accent-wine/30 bg-accent-wine/5 px-3 py-2 text-sm text-accent-wine">
            <p className="font-semibold">Nivel 2 — Combo activo</p>
            <p className="mt-0.5 text-xs opacity-90">
              Cada 5 unidades, el ítem de menor valor del grupo queda bonificado
              ($0).
            </p>
          </div>
        )}

        {items.length === 0 ? (
          <p className="py-8 text-center text-sm text-zinc-500">
            Tu carrito está vacío. Agregá perfumes desde el catálogo.
          </p>
        ) : (
          <ul className="space-y-3">
            {items.map((item) => {
              const size = item.selectedSize?.label
                ? ` · ${item.selectedSize.label}`
                : '';
              
              // MAGIA VISUAL ACÁ: Contamos exactamente cuántas veces se bonificó este ítem
              const bonifiedCount = combos?.filter(c => c.bonifiedItemCartId === item.cartItemId).length || 0;
              const isBonified = comboTier === 'tier2' && bonifiedCount > 0;
              
              const lineFull = item.unitPrice * item.quantity;
              const discountAmount = isBonified ? (item.unitPrice * bonifiedCount) : 0;
              // El precio a mostrar es el total menos el descuento de las unidades gratis
              const lineDisplay = lineFull - discountAmount;

              return (
                <li
                  key={item.cartItemId}
                  className="rounded-xl border border-zinc-100 bg-zinc-50/80 p-3"
                >
                  <div className="flex gap-2">
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-zinc-500">
                        {item.brandName}
                      </p>
                      <p className="truncate font-medium text-zinc-900">
                        {item.productName}
                        <span className="font-normal text-zinc-600">
                          {size}
                        </span>
                      </p>
                      {isBonified && (
                        <span className="mt-1 inline-block rounded-md bg-accent-wine/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-accent-wine">
                          {bonifiedCount > 1 ? `Bonificado (${bonifiedCount} gratis)` : 'Bonificado'}
                        </span>
                      )}
                    </div>
                    <div className="text-right">
                      {isBonified ? (
                        <div>
                          <p className="text-xs text-zinc-400 line-through">
                            {formatMoney(lineFull)}
                          </p>
                          <p className="font-semibold tabular-nums text-accent-wine">
                            {formatMoney(lineDisplay)}
                          </p>
                        </div>
                      ) : (
                        <p className="font-semibold tabular-nums text-zinc-900">
                          {formatMoney(lineDisplay)}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-2 flex items-center justify-between gap-2">
                    <div className="flex items-center rounded-lg border border-zinc-200 bg-white">
                      <button
                        type="button"
                        className="px-2.5 py-1 text-sm hover:bg-zinc-100"
                        onClick={() =>
                          updateQuantity(item.cartItemId, item.quantity - 1)
                        }
                      >
                        −
                      </button>
                      <span className="min-w-[2rem] text-center text-sm tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        className="px-2.5 py-1 text-sm hover:bg-zinc-100"
                        onClick={() =>
                          updateQuantity(item.cartItemId, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      className="text-xs font-medium text-accent-wine hover:underline"
                      onClick={() => removeItem(item.cartItemId)}
                    >
                      Quitar
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <div className="border-t border-zinc-200 bg-zinc-50/90 px-4 py-4">
        <dl className="space-y-1.5 text-sm">
          <div className="flex justify-between text-zinc-600">
            <dt>Subtotal</dt>
            <dd className="tabular-nums text-zinc-900">
              {formatMoney(subtotal)}
            </dd>
          </div>
          {totalSavings > 0 && (
            <div className="flex justify-between text-accent-wine">
              <dt>Descuentos (combos)</dt>
              <dd className="tabular-nums">−{formatMoney(totalSavings)}</dd>
            </div>
          )}
          <div className="flex justify-between border-t border-zinc-200 pt-2 text-base font-semibold">
            <dt className="text-zinc-900">Total</dt>
            <dd className="tabular-nums text-zinc-900">
              {formatMoney(total)}
            </dd>
          </div>
        </dl>

        <a
          href={checkoutUrl ?? undefined}
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-4 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-white transition-colors ${
            checkoutUrl
              ? 'bg-accent-wine hover:bg-[#4d1822]'
              : 'cursor-not-allowed bg-zinc-400'
          }`}
          aria-disabled={!checkoutUrl}
          onClick={(e) => {
            if (!checkoutUrl) e.preventDefault();
          }}
        >
          <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Pedir por WhatsApp
        </a>
        {!whatsappConfigured && (
          <p className="mt-2 text-center text-[11px] text-zinc-500">
            Definí{' '}
            <code className="rounded bg-zinc-200 px-1">
              NEXT_PUBLIC_WHATSAPP_NUMBER
            </code>{' '}
            en <code className="rounded bg-zinc-200 px-1">.env.local</code>{' '}
            para habilitar el enlace.
          </p>
        )}
      </div>
    </div>
  );
}