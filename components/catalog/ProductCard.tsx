'use client';

import { useMemo, useState } from 'react';
import type { CartItemSize } from '@/types/cart';
import { useCart } from '@/hooks/useCart';

export type ProductSizeOption = CartItemSize & { isDecant: boolean };

export interface ProductCardProduct {
  id: string;
  name: string;
  brand: string;
  slug: string;
  sizes: ProductSizeOption[];
}

export interface ProductCardProps {
  product: ProductCardProduct;
}

function formatPrice(amount: number): string {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const [selectedId, setSelectedId] = useState(product.sizes[0]?.id ?? '');

  const selected = useMemo(
    () => product.sizes.find((s) => s.id === selectedId) ?? product.sizes[0],
    [product.sizes, selectedId]
  );

  const handleAdd = () => {
    if (!selected) return;
    addItem({
      productId: product.id,
      productName: product.name,
      brandName: product.brand,
      slug: product.slug,
      coverImageUrl: '',
      selectedSize: {
        id: selected.id,
        label: selected.label,
        volume_ml: selected.volume_ml,
        price: selected.price,
      },
      quantity: 1,
      unitPrice: selected.price,
      isDecant: selected.isDecant,
    });
  };

  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-[0_10px_30px_-20px_rgba(0,0,0,0.45)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-22px_rgba(0,0,0,0.55)]">
      <div className="relative aspect-[3/4] w-full bg-gradient-to-br from-[#f5f0e7] via-[#f9f6f1] to-[#ece3d6]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.55),_transparent_45%)]" />
        <div className="relative flex h-full w-full flex-col items-center justify-center gap-1 p-4 text-center">
          <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-500">
            {product.brand}
          </span>
          <span className="line-clamp-2 text-base font-semibold text-zinc-700">
            {product.name}
          </span>
          <span className="mt-2 rounded-full border border-zinc-300/70 bg-white/60 px-2 py-0.5 text-[10px] text-zinc-600">
            Imagen próximamente
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-zinc-500">
            {product.brand}
          </p>
          <h3 className="mt-1 line-clamp-2 text-lg font-semibold leading-snug text-primary">
            {product.name}
          </h3>
        </div>

        <div className="space-y-2">
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-500">
            Formato
          </p>
          <div className="flex flex-col gap-2">
            {product.sizes.map((size) => {
              const active = size.id === selected?.id;
              return (
                <button
                  key={size.id}
                  type="button"
                  onClick={() => setSelectedId(size.id)}
                  className={`flex w-full items-center justify-between rounded-2xl border px-3 py-2.5 text-left text-sm transition-colors ${
                    active
                      ? 'border-accent-wine bg-accent-wine text-white'
                      : 'border-zinc-200 bg-zinc-50/60 hover:border-accent-wine/50'
                  }`}
                >
                  <span className="font-medium">{size.label}</span>
                  <span className={`tabular-nums ${active ? '' : 'text-zinc-700'}`}>
                    {formatPrice(size.price)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          disabled={!selected}
          className="mt-auto w-full rounded-2xl border border-accent-wine bg-accent-wine py-3 text-sm font-semibold tracking-wide text-white transition-colors hover:bg-[#4d1822] disabled:cursor-not-allowed disabled:opacity-50"
        >
          Agregar al carrito
        </button>
      </div>
    </article>
  );
}
