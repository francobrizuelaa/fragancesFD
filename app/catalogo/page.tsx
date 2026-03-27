'use client';

import { ProductCard } from '@/components/catalog/ProductCard';
import { CartSidebar } from '@/components/cart/CartSidebar';
import { MOCK_PRODUCTS } from '@/lib/mockProducts';

export default function CatalogoPage() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 lg:flex-row lg:items-start">
      <main className="min-w-0 flex-1">
        <div className="mb-8">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent-wine">
            Catálogo
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-primary">
            Decants y perfumes originales
          </h1>
          <p className="mt-3 max-w-3xl text-sm text-zinc-700">
            Elegí formato y precio, agregá al carrito y probá los niveles de combo:
            3+ unidades activa regalo y 5+ unidades activa el descuento del producto
            más barato del grupo.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {MOCK_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>

      <aside className="hidden w-full max-w-md shrink-0 lg:sticky lg:top-24 lg:block lg:max-h-[calc(100vh-7rem)] lg:self-start">
        <div className="flex max-h-[calc(100vh-7rem)] min-h-[320px] flex-col">
          <CartSidebar />
        </div>
      </aside>
    </div>
  );
}
