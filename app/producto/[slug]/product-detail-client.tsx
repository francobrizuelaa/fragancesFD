'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import type {
  ProductCardProduct,
  ProductSizeOption,
} from '@/components/catalog/ProductCard';
import { useCart } from '@/hooks/useCart';

function formatPrice(amount: number): string {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(amount);
}

function orderedSizeOptions(
  product: ProductCardProduct
): ProductSizeOption[] {
  const five = product.sizes.find((s) => s.volume_ml === 5);
  const ten = product.sizes.find((s) => s.volume_ml === 10);
  const out: ProductSizeOption[] = [];
  if (five) out.push(five);
  if (ten) out.push(ten);
  return out.length ? out : product.sizes;
}

function sizeButtonLabel(s: ProductSizeOption): string {
  if (s.volume_ml === 5) return '5ml';
  if (s.volume_ml === 10) return '10ml';
  return s.label;
}

export function ProductDetailClient({ product }: { product: ProductCardProduct }) {
  const { addItem } = useCart();
  const sizes = useMemo(() => orderedSizeOptions(product), [product]);
  const [selected, setSelected] = useState<ProductSizeOption | null>(
    sizes[0] ?? null
  );
  const [qty, setQty] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const galleryImages =
    product.images.length > 0 ? product.images : ['/decant-1.png'];

  const handleAdd = () => {
    if (!selected) return;
    addItem({
      productId: product.id,
      productName: product.name,
      brandName: product.brand,
      slug: product.slug,
      coverImageUrl: galleryImages[activeImage] ?? galleryImages[0] ?? '',
      selectedSize: {
        id: selected.id,
        label: selected.label,
        volume_ml: selected.volume_ml,
        price: selected.price,
      },
      quantity: qty,
      unitPrice: selected.price,
      isDecant: selected.isDecant,
    });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
        <div>
          <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100">
            <div className="relative aspect-[4/5] w-full">
              <Image
                src={galleryImages[activeImage] ?? galleryImages[0]}
                alt={`${product.name} - imagen ${activeImage + 1}`}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
          {galleryImages.length > 1 && (
            <div className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-5">
              {galleryImages.map((img, i) => (
                <button
                  key={`${img}-${i}`}
                  type="button"
                  onClick={() => setActiveImage(i)}
                  className={`relative aspect-square overflow-hidden rounded-xl border transition-all ${
                    activeImage === i
                      ? 'border-accent-wine ring-2 ring-accent-wine/30'
                      : 'border-zinc-200 hover:border-zinc-300'
                  }`}
                  aria-label={`Miniatura ${i + 1}`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} miniatura ${i + 1}`}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
            {product.brand}
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-primary sm:text-4xl">
            {product.name}
          </h1>

          <p className="mt-2 text-lg font-semibold tabular-nums text-primary">
            {selected ? formatPrice(selected.price) : '—'}
          </p>

          <p className="mt-3 text-sm font-semibold text-red-600">
          Llevando 3 decants, Recibís 1 decant sorpresa de regalo
          </p>
          <p className="mt-3 text-sm font-semibold text-red-600">
          Llevando 6 o más, Pagás 5 y te llevás 1 decant gratis.
          </p>

          <div className="mt-8">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-zinc-500">
              Tamaño
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {sizes.map((s) => {
                const active = selected?.id === s.id;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSelected(s)}
                    className={`min-w-[4.5rem] rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors ${
                      active
                        ? 'border-primary bg-primary text-white'
                        : 'border-zinc-200 bg-white text-primary hover:border-zinc-400'
                    }`}
                  >
                    {sizeButtonLabel(s)}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-8">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-zinc-500">
              Cantidad
            </p>
            <div className="mt-3 inline-flex items-center rounded-xl border border-zinc-200 bg-white">
              <button
                type="button"
                className="px-4 py-2.5 text-lg leading-none text-primary hover:bg-zinc-50"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Menos"
              >
                −
              </button>
              <span className="min-w-[3rem] text-center text-sm font-semibold tabular-nums">
                {qty}
              </span>
              <button
                type="button"
                className="px-4 py-2.5 text-lg leading-none text-primary hover:bg-zinc-50"
                onClick={() => setQty((q) => q + 1)}
                aria-label="Más"
              >
                +
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            disabled={!selected}
            className="mt-10 w-full rounded-2xl bg-[#111111] py-4 text-center text-base font-semibold tracking-wide text-white transition-all duration-300 hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
}
