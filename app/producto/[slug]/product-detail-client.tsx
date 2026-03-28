'use client';

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
  const full = product.sizes.find((s) => !s.isDecant);
  const out: ProductSizeOption[] = [];
  if (five) out.push(five);
  if (ten) out.push(ten);
  if (full) out.push(full);
  return out.length ? out : product.sizes;
}

function sizeButtonLabel(s: ProductSizeOption): string {
  if (s.volume_ml === 5) return '5ml';
  if (s.volume_ml === 10) return '10ml';
  return 'Frasco';
}

const GALLERY_SLOTS = 4;

export function ProductDetailClient({ product }: { product: ProductCardProduct }) {
  const { addItem } = useCart();
  const sizes = useMemo(() => orderedSizeOptions(product), [product]);
  const [selected, setSelected] = useState<ProductSizeOption | null>(
    sizes[0] ?? null
  );
  const [qty, setQty] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

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
      quantity: qty,
      unitPrice: selected.price,
      isDecant: selected.isDecant,
    });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
        <div>
          <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-gradient-to-br from-[#f5f0e7] via-[#faf7f2] to-[#e8dfd2]">
            <div
              className="aspect-[4/5] w-full bg-[radial-gradient(circle_at_30%_20%,_rgba(255,255,255,0.7),_transparent_50%)]"
              role="img"
              aria-label={`Vista ${activeImage + 1} de ${product.name}`}
            />
          </div>
          <div className="mt-4 flex gap-3 sm:flex-row">
            {Array.from({ length: GALLERY_SLOTS }, (_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveImage(i)}
                className={`h-20 flex-1 rounded-xl border bg-gradient-to-br from-zinc-100 to-zinc-200 transition-all ${
                  activeImage === i
                    ? 'border-accent-wine ring-2 ring-accent-wine/30'
                    : 'border-zinc-200 opacity-80 hover:opacity-100'
                }`}
                aria-label={`Miniatura ${i + 1}`}
              />
            ))}
          </div>
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
            20% OFF por Transferencia
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
