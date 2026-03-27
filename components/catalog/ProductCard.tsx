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
    <article className="flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950">
      <div className="relative aspect-[3/4] w-full bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900">
        <div className="flex h-full w-full flex-col items-center justify-center gap-1 p-4 text-center">
          <span className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            {product.brand}
          </span>
          <span className="line-clamp-2 text-sm font-semibold text-zinc-700 dark:text-zinc-200">
            {product.name}
          </span>
          <span className="mt-2 rounded-full bg-zinc-300/80 px-2 py-0.5 text-[10px] text-zinc-600 dark:bg-zinc-700 dark:text-zinc-300">
            Imagen próximamente
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            {product.brand}
          </p>
          <h3 className="mt-0.5 line-clamp-2 text-base font-semibold leading-snug text-zinc-900 dark:text-zinc-50">
            {product.name}
          </h3>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
            Formato
          </p>
          <div className="flex flex-col gap-1.5">
            {product.sizes.map((size) => {
              const active = size.id === selected?.id;
              return (
                <button
                  key={size.id}
                  type="button"
                  onClick={() => setSelectedId(size.id)}
                  className={`flex w-full items-center justify-between rounded-xl border px-3 py-2.5 text-left text-sm transition-colors ${
                    active
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-950 dark:border-emerald-500 dark:bg-emerald-950/40 dark:text-emerald-100'
                      : 'border-zinc-200 bg-zinc-50 hover:border-zinc-300 dark:border-zinc-700 dark:bg-zinc-900/50 dark:hover:border-zinc-600'
                  }`}
                >
                  <span className="font-medium">{size.label}</span>
                  <span className="tabular-nums text-zinc-700 dark:text-zinc-200">
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
          className="mt-auto w-full rounded-xl bg-zinc-900 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-emerald-600 dark:hover:bg-emerald-500"
        >
          Agregar al carrito
        </button>
      </div>
    </article>
  );
}
