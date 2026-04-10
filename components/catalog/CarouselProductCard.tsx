import Link from 'next/link';
import Image from 'next/image';
import type { ProductCardProduct } from '@/components/catalog/ProductCard';

export function CarouselProductCard({ product }: { product: ProductCardProduct }) {
  return (
    <Link
      href={`/producto/${product.slug}`}
      className="group block h-full rounded-2xl border border-zinc-200/90 bg-white shadow-[0_18px_36px_-24px_rgba(0,0,0,0.55)] transition-all duration-300 [transform-style:preserve-3d] hover:-translate-y-1 hover:shadow-[0_24px_44px_-22px_rgba(0,0,0,0.5)]"
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-t-2xl bg-zinc-100">
        <Image
          src={product.images[0] ?? '/decant-1.png'}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 80vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />
      </div>
      <div className="space-y-2 border-t border-zinc-100 px-3 py-3">
        <p className="line-clamp-2 text-center text-sm font-semibold text-primary">
          {product.name}
        </p>
        <span className="block w-full rounded-xl border border-accent-wine bg-accent-wine py-2 text-center text-xs font-semibold uppercase tracking-[0.1em] text-white">
          Ver producto
        </span>
      </div>
    </Link>
  );
}
