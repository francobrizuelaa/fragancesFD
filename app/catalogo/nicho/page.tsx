import { Suspense } from 'react';
import type { ProductCardProduct } from '@/components/catalog/ProductCard';
import { getProducts } from '@/lib/products';
import { CatalogoClient } from '../catalogo-client';

export const revalidate = 60;

export default async function CatalogoNichoPage() {
  const products: ProductCardProduct[] = await getProducts().catch(() => []);

  return (
    <Suspense
      fallback={
        <div className="mx-auto w-full max-w-7xl px-4 py-16 text-center text-sm text-zinc-600">
          Cargando catálogo…
        </div>
      }
    >
      <CatalogoClient initialProducts={products} initialMainFilter="nicho" />
    </Suspense>
  );
}
