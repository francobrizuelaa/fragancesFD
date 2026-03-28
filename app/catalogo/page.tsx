'use client';

import { useMemo, useState } from 'react';
import { ProductCard } from '@/components/catalog/ProductCard';
import {
  CatalogFiltersSidebar,
  type CatalogSort,
} from '@/components/catalog/CatalogFiltersSidebar';
import {
  MOCK_PRODUCTS,
  minProductPrice,
  productHasVolumeMl,
} from '@/lib/mockProducts';

export default function CatalogoPage() {
  const [sort, setSort] = useState<CatalogSort>('popular');
  const [size10, setSize10] = useState(false);
  const [size5, setSize5] = useState(false);
  const [draftPriceMin, setDraftPriceMin] = useState('');
  const [draftPriceMax, setDraftPriceMax] = useState('');
  const [appliedPriceMin, setAppliedPriceMin] = useState<number | null>(null);
  const [appliedPriceMax, setAppliedPriceMax] = useState<number | null>(null);

  const applyPrices = () => {
    const minRaw = draftPriceMin.trim();
    const maxRaw = draftPriceMax.trim();
    setAppliedPriceMin(minRaw === '' ? null : Number(minRaw));
    setAppliedPriceMax(maxRaw === '' ? null : Number(maxRaw));
  };

  const filteredProducts = useMemo(() => {
    let list = [...MOCK_PRODUCTS];

    if (size10 || size5) {
      list = list.filter((p) => {
        const ok10 = !size10 || productHasVolumeMl(p, 10);
        const ok5 = !size5 || productHasVolumeMl(p, 5);
        return ok10 && ok5;
      });
    }

    list = list.filter((p) => {
      const min = minProductPrice(p);
      if (appliedPriceMin != null && !Number.isNaN(appliedPriceMin) && min < appliedPriceMin) {
        return false;
      }
      if (appliedPriceMax != null && !Number.isNaN(appliedPriceMax) && min > appliedPriceMax) {
        return false;
      }
      return true;
    });

    const baseOrder = new Map(MOCK_PRODUCTS.map((p, i) => [p.id, i]));

    switch (sort) {
      case 'price-asc':
        list.sort((a, b) => minProductPrice(a) - minProductPrice(b));
        break;
      case 'price-desc':
        list.sort((a, b) => minProductPrice(b) - minProductPrice(a));
        break;
      default:
        list.sort((a, b) => (baseOrder.get(a.id) ?? 0) - (baseOrder.get(b.id) ?? 0));
        break;
    }

    return list;
  }, [sort, size10, size5, appliedPriceMin, appliedPriceMax]);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8">
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

      <div className="flex flex-col gap-8 md:flex-row md:items-start">
        <CatalogFiltersSidebar
          className="w-full shrink-0 md:w-1/4"
          sort={sort}
          onSortChange={setSort}
          size10={size10}
          size5={size5}
          onSize10Change={setSize10}
          onSize5Change={setSize5}
          draftPriceMin={draftPriceMin}
          draftPriceMax={draftPriceMax}
          onDraftPriceMin={setDraftPriceMin}
          onDraftPriceMax={setDraftPriceMax}
          onApplyPrices={applyPrices}
        />

        <div className="min-w-0 flex-1 md:w-3/4">
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} linkToProduct />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
