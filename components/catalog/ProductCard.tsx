'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import type { CartItemSize } from '@/types/cart';
import { useCart } from '@/hooks/useCart';

export type ProductSizeOption = CartItemSize & { isDecant: boolean };

export interface ProductCardProduct {
  id: string;
  name: string;
  brand: string;
  slug: string;
  images: string[];
  /** Categoría de catálogo: diseñador vs árabe (filtro `?type=`). */
  type: 'designer' | 'arab';
  sizes: ProductSizeOption[];
}

export interface ProductCardProps {
  product: ProductCardProduct;
  /** Si es true, imagen y título enlazan a /producto/[slug] con Link válido (sin botones anidados). */
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
  const { addItem } = useCart();
  const [selectedId, setSelectedId] = useState(product.sizes[0]?.id ?? '');
  const productHref = `/producto/${product.slug}`;

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
      coverImageUrl: product.images[0] ?? '',
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

  const imageBlock = (
    <div className="relative aspect-[3/4] w-full shrink-0 bg-zinc-100">
      <Image
        src={product.images[0] ?? '/decant-1.png'}
        alt={product.name}
        fill
        sizes="(max-width: 768px) 45vw, (max-width: 1280px) 33vw, 25vw"
        className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
      />
    </div>
  );

  const titleBlock = (
    <div className="min-h-0">
      <p className="text-[9px] font-medium uppercase tracking-[0.12em] text-zinc-500 md:tracking-[0.14em]">
        {product.brand}
      </p>
      <h3 className="mt-0.5 line-clamp-2 text-[13px] font-semibold leading-snug text-primary sm:text-sm md:text-base">
        {product.name}
      </h3>
    </div>
  );

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-200/90 bg-white shadow-[0_8px_24px_-18px_rgba(0,0,0,0.35)] transition-shadow duration-300 hover:shadow-[0_14px_32px_-18px_rgba(0,0,0,0.42)]">
      {linkToProduct ? (
        <Link
          href={productHref}
          className="block shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-accent-wine focus-visible:ring-offset-2"
        >
          {imageBlock}
        </Link>
      ) : (
        imageBlock
      )}

      <div className="flex min-h-0 flex-1 flex-col gap-2 p-2.5 pt-2 sm:gap-3 sm:p-3.5 sm:pt-3">
        {linkToProduct ? (
          <Link
            href={productHref}
            className="min-h-0 block outline-none focus-visible:ring-2 focus-visible:ring-accent-wine focus-visible:ring-offset-2 rounded-md"
          >
            {titleBlock}
          </Link>
        ) : (
          titleBlock
        )}

        <div className="min-h-0 flex-1 space-y-1 sm:space-y-1.5">
          <p className="text-[8px] font-medium uppercase tracking-[0.1em] text-zinc-500 sm:text-[9px] sm:tracking-[0.12em]">
            Formato
          </p>
          <div className="flex flex-col gap-1 sm:gap-1.5">
            {product.sizes.map((size) => {
              const active = size.id === selected?.id;
              return (
                <button
                  key={size.id}
                  type="button"
                  onClick={() => setSelectedId(size.id)}
                  className={`flex min-h-11 w-full items-center justify-between rounded-xl border px-2 py-2 text-left text-[11px] transition-colors sm:min-h-0 sm:px-2.5 sm:text-xs ${
                    active
                      ? 'border-accent-wine bg-accent-wine text-white'
                      : 'border-zinc-200 bg-zinc-50/70 hover:border-accent-wine/40'
                  }`}
                >
                  <span className="font-medium leading-tight">{size.label}</span>
                  <span className={`shrink-0 tabular-nums ${active ? '' : 'text-zinc-700'}`}>
                    {formatPrice(size.price)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {linkToProduct && (
          <Link
            href={productHref}
            className="mt-auto flex min-h-12 w-full items-center justify-center rounded-2xl border border-zinc-300 bg-white py-2 text-center text-[11px] font-semibold tracking-wide text-primary transition-colors hover:border-accent-wine hover:text-accent-wine sm:text-xs"
          >
            Ver producto
          </Link>
        )}
        <button
          type="button"
          onClick={handleAdd}
          disabled={!selected}
          className="w-full min-h-12 rounded-2xl border border-accent-wine bg-accent-wine py-2.5 text-[11px] font-semibold tracking-wide text-white shadow-sm transition-all duration-300 ease-out hover:border-[#4d1822] hover:bg-[#4d1822] hover:shadow-md active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 sm:text-xs"
        >
          Agregar al carrito
        </button>
      </div>
    </article>
  );
}
