'use client';

import { useRouter } from 'next/navigation';
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
  /** Si es true, la zona visual superior enlaza a /producto/[slug]. */
  linkToProduct?: boolean;
}

function formatPrice(amount: number): string {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function ProductCard({ product, linkToProduct }: ProductCardProps) {
  const router = useRouter();
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

  const goToProduct = () => {
    if (linkToProduct) router.push(`/producto/${product.slug}`);
  };

  return (
    <article
      role={linkToProduct ? 'link' : undefined}
      tabIndex={linkToProduct ? 0 : undefined}
      onClick={linkToProduct ? goToProduct : undefined}
      onKeyDown={
        linkToProduct
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                goToProduct();
              }
            }
          : undefined
      }
      className={`group flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-200/90 bg-white shadow-[0_8px_24px_-18px_rgba(0,0,0,0.35)] transition-shadow duration-300 hover:shadow-[0_14px_32px_-18px_rgba(0,0,0,0.42)] ${linkToProduct ? 'cursor-pointer' : ''}`}
    >
      <div className="relative aspect-[3/4] w-full shrink-0 bg-gradient-to-br from-[#f5f0e7] via-[#f9f6f1] to-[#ece3d6]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.55),_transparent_45%)]" />
        <div className="relative flex h-full w-full flex-col items-center justify-center gap-0.5 p-3 text-center">
          <span className="text-[9px] font-medium uppercase tracking-[0.18em] text-zinc-500">
            {product.brand}
          </span>
          <span className="line-clamp-2 text-sm font-semibold leading-tight text-zinc-700">
            {product.name}
          </span>
          <span className="mt-1.5 rounded-full border border-zinc-300/60 bg-white/55 px-2 py-0.5 text-[9px] text-zinc-600">
            Imagen próximamente
          </span>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-3 p-3.5 pt-3">
        <div className="min-h-0">
          <p className="text-[9px] font-medium uppercase tracking-[0.14em] text-zinc-500">
            {product.brand}
          </p>
          <h3 className="mt-0.5 line-clamp-2 text-base font-semibold leading-snug text-primary">
            {product.name}
          </h3>
        </div>

        <div
          className="min-h-0 flex-1 space-y-1.5"
          onClick={linkToProduct ? (e) => e.stopPropagation() : undefined}
        >
          <p className="text-[9px] font-medium uppercase tracking-[0.12em] text-zinc-500">
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
                  className={`flex w-full items-center justify-between rounded-xl border px-2.5 py-2 text-left text-xs transition-colors ${
                    active
                      ? 'border-accent-wine bg-accent-wine text-white'
                      : 'border-zinc-200 bg-zinc-50/70 hover:border-accent-wine/40'
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
          onClick={(e) => {
            if (linkToProduct) e.stopPropagation();
            handleAdd();
          }}
          disabled={!selected}
          className="mt-auto w-full rounded-xl border border-accent-wine bg-accent-wine py-2.5 text-xs font-semibold tracking-wide text-white shadow-sm transition-all duration-300 ease-out hover:-translate-y-px hover:border-[#4d1822] hover:bg-[#4d1822] hover:shadow-md active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-sm"
        >
          Agregar al carrito
        </button>
      </div>
    </article>
  );
}
