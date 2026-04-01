import Link from 'next/link';
import type { ProductCardProduct } from '@/components/catalog/ProductCard';
import { minProductPrice } from '@/lib/products';

function formatPrice(amount: number): string {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function CarouselProductCard({ product }: { product: ProductCardProduct }) {
  const from = minProductPrice(product);

  return (
    <Link
      href={`/producto/${product.slug}`}
      className="block h-full rounded-2xl border border-zinc-200/90 bg-white shadow-[0_18px_36px_-24px_rgba(0,0,0,0.55)] transition-all duration-300 [transform-style:preserve-3d] hover:-translate-y-1 hover:shadow-[0_24px_44px_-22px_rgba(0,0,0,0.5)]"
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-t-2xl bg-gradient-to-br from-[#f5f0e7] via-[#f9f6f1] to-[#ece3d6]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.55),_transparent_45%)]" />
        <div className="relative flex h-full flex-col items-center justify-center gap-1 p-4 text-center">
          <span className="text-[9px] font-medium uppercase tracking-[0.2em] text-zinc-500">
            {product.brand}
          </span>
          <span className="line-clamp-2 px-1 text-sm font-semibold leading-tight text-zinc-800">
            {product.name}
          </span>
          <span className="mt-2 text-[10px] text-zinc-500">Ver producto</span>
        </div>
      </div>
      <div className="border-t border-zinc-100 px-3 py-2.5">
        <p className="text-center text-[10px] uppercase tracking-[0.14em] text-zinc-500">
          Desde
        </p>
        <p className="text-center text-sm font-semibold tabular-nums text-primary">
          {formatPrice(from)}
        </p>
      </div>
    </Link>
  );
}
