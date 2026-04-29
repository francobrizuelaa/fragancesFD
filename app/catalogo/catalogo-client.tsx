'use client';

import { useCallback, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  ProductCard,
  type ProductCardProduct,
} from '@/components/catalog/ProductCard';
import {
  CatalogFiltersSidebar,
  type CatalogGenderFilter,
  type CatalogMainFilter,
  type CatalogSort,
} from '@/components/catalog/CatalogFiltersSidebar';
import {
  getCatalogMainCategory,
  minProductPrice,
  productHasVolumeMl,
  productMatchesPriceRange,
} from '@/lib/products';

const VALID_SORT: CatalogSort[] = ['popular', 'price-asc', 'price-desc'];

function parsePriceParam(raw: string | null): number | null {
  if (raw === null || raw.trim() === '') return null;
  const n = Number(raw);
  if (Number.isNaN(n) || n < 0) return null;
  return n;
}

export function CatalogoClient({
  initialProducts,
  initialMainFilter = 'all',
}: {
  initialProducts: ProductCardProduct[];
  initialMainFilter?: CatalogMainFilter;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const search = searchParams.get('search')?.trim() ?? '';
  const sortRaw = searchParams.get('sort') as CatalogSort | null;
  const sort: CatalogSort =
    sortRaw && VALID_SORT.includes(sortRaw) ? sortRaw : 'popular';
  const size10 = searchParams.get('size10') === '1';
  const size5 = searchParams.get('size5') === '1';
  const mainRaw = searchParams.get('main') as CatalogMainFilter | null;
  const mainFilter: CatalogMainFilter =
    mainRaw &&
    ['all', 'designer', 'nicho', 'arabes'].includes(mainRaw)
      ? mainRaw
      : initialMainFilter;
  const genderRaw = searchParams.get('gender') as CatalogGenderFilter | null;
  const gender: CatalogGenderFilter =
    genderRaw && ['all', 'hombre', 'mujer'].includes(genderRaw)
      ? genderRaw
      : 'all';
  const appliedPriceMin = parsePriceParam(searchParams.get('priceMin'));
  const appliedPriceMax = parsePriceParam(searchParams.get('priceMax'));
  const priceMinKey = searchParams.get('priceMin') ?? '';
  const priceMaxKey = searchParams.get('priceMax') ?? '';

  const [draftPriceMin, setDraftPriceMin] = useState(priceMinKey);
  const [draftPriceMax, setDraftPriceMax] = useState(priceMaxKey);

  const updateParams = useCallback(
    (patch: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());
      for (const [k, v] of Object.entries(patch)) {
        if (v === null || v === '') params.delete(k);
        else params.set(k, v);
      }
      const q = params.toString();
      router.replace(q ? `${pathname}?${q}` : pathname);
    },
    [searchParams, pathname, router]
  );

  const baseOrder = useMemo(
    () => new Map(initialProducts.map((p, i) => [p.id, i])),
    [initialProducts]
  );

  const filteredProducts = useMemo(() => {
    let list: ProductCardProduct[] = [...initialProducts];

    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q)
      );
    }

    if (mainFilter !== 'all') {
      list = list.filter((p) => getCatalogMainCategory(p) === mainFilter);
    }

    if (gender !== 'all') {
      list = list.filter((p) => p.brand.trim().toLowerCase() === gender);
    }

    if (size10 || size5) {
      list = list.filter((p) => {
        const ok10 = !size10 || productHasVolumeMl(p, 10);
        const ok5 = !size5 || productHasVolumeMl(p, 5);
        return ok10 && ok5;
      });
    }

    list = list.filter((p) =>
      productMatchesPriceRange(p, appliedPriceMin, appliedPriceMax)
    );

    switch (sort) {
      case 'price-asc':
        list = [...list].sort(
          (a, b) => minProductPrice(a) - minProductPrice(b)
        );
        break;
      case 'price-desc':
        list = [...list].sort(
          (a, b) => minProductPrice(b) - minProductPrice(a)
        );
        break;
      default:
        list = [...list].sort(
          (a, b) => (baseOrder.get(a.id) ?? 0) - (baseOrder.get(b.id) ?? 0)
        );
        break;
    }

    return list;
  }, [
    initialProducts,
    search,
    mainFilter,
    gender,
    sort,
    size10,
    size5,
    appliedPriceMin,
    appliedPriceMax,
    baseOrder,
  ]);

  const applyPrices = () => {
    const minRaw = draftPriceMin.trim();
    const maxRaw = draftPriceMax.trim();
    updateParams({
      priceMin: minRaw === '' ? null : minRaw,
      priceMax: maxRaw === '' ? null : maxRaw,
    });
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-3 py-6 sm:px-4 sm:py-8">
      <div className="mb-8">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent-wine">
          
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-primary">
          Catálogo de decants
        </h1>
        <p className="mt-3 max-w-3xl text-sm text-zinc-700">
          Explorá perfumes de Diseñador, Nicho y Árabes en decants y frascos.
          Elegí formato y precio, agregá al carrito y combiná filtros por tipo,
          tamaño y rango de precio.
        </p>
      </div>

      <div className="flex flex-col gap-8 md:flex-row md:items-start">
        <CatalogFiltersSidebar
          className="w-full shrink-0 md:w-1/4"
          mainFilter={mainFilter}
          onMainFilterChange={(v) => updateParams({ main: v === 'all' ? null : v })}
          gender={gender}
          onGenderChange={(v) => updateParams({ gender: v === 'all' ? null : v })}
          sort={sort}
          onSortChange={(s) =>
            updateParams({ sort: s === 'popular' ? null : s })
          }
          size10={size10}
          size5={size5}
          onSize10Change={(v) => updateParams({ size10: v ? '1' : null })}
          onSize5Change={(v) => updateParams({ size5: v ? '1' : null })}
          draftPriceMin={draftPriceMin}
          draftPriceMax={draftPriceMax}
          onDraftPriceMin={setDraftPriceMin}
          onDraftPriceMax={setDraftPriceMax}
          onApplyPrices={applyPrices}
        />

        <div className="min-w-0 flex-1 md:w-3/4">
          {filteredProducts.length === 0 ? (
            <p className="rounded-2xl border border-zinc-200 bg-white px-6 py-12 text-center text-sm text-zinc-600">
              No hay productos que coincidan con los filtros. Probá otra búsqueda
              o ajustá los filtros.
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 xl:grid-cols-3">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} linkToProduct />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
