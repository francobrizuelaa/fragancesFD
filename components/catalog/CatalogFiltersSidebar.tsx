'use client';

import { cn } from '@/lib/utils';

export type CatalogSort = 'popular' | 'price-asc' | 'price-desc';

export interface CatalogFiltersSidebarProps {
  sort: CatalogSort;
  onSortChange: (sort: CatalogSort) => void;
  size10: boolean;
  size5: boolean;
  onSize10Change: (v: boolean) => void;
  onSize5Change: (v: boolean) => void;
  draftPriceMin: string;
  draftPriceMax: string;
  onDraftPriceMin: (v: string) => void;
  onDraftPriceMax: (v: string) => void;
  onApplyPrices: () => void;
  className?: string;
}

export function CatalogFiltersSidebar({
  sort,
  onSortChange,
  size10,
  size5,
  onSize10Change,
  onSize5Change,
  draftPriceMin,
  draftPriceMax,
  onDraftPriceMin,
  onDraftPriceMax,
  onApplyPrices,
  className,
}: CatalogFiltersSidebarProps) {
  return (
    <aside
      className={cn(
        'rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm',
        className
      )}
    >
      <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-primary">
        Filtros
      </h2>

      <div className="mt-5 space-y-2">
        <label htmlFor="catalog-sort" className="text-xs font-medium text-zinc-600">
          Ordenar por
        </label>
        <select
          id="catalog-sort"
          value={sort}
          onChange={(e) => onSortChange(e.target.value as CatalogSort)}
          className="w-full rounded-xl border border-zinc-200 bg-cream px-3 py-2.5 text-sm text-primary outline-none focus:border-accent-wine"
        >
          <option value="popular">Más vendidos</option>
          <option value="price-asc">Menor precio</option>
          <option value="price-desc">Mayor precio</option>
        </select>
      </div>

      <div className="mt-6">
        <p className="text-xs font-medium text-zinc-600">Tamaño</p>
        <ul className="mt-3 space-y-2">
          <li className="flex items-center gap-2">
            <input
              id="size-10"
              type="checkbox"
              checked={size10}
              onChange={(e) => onSize10Change(e.target.checked)}
              className="h-4 w-4 rounded border-zinc-300 text-accent-wine focus:ring-accent-wine"
            />
            <label htmlFor="size-10" className="text-sm text-zinc-800">
              10ml
            </label>
          </li>
          <li className="flex items-center gap-2">
            <input
              id="size-5"
              type="checkbox"
              checked={size5}
              onChange={(e) => onSize5Change(e.target.checked)}
              className="h-4 w-4 rounded border-zinc-300 text-accent-wine focus:ring-accent-wine"
            />
            <label htmlFor="size-5" className="text-sm text-zinc-800">
              5ml
            </label>
          </li>
        </ul>
      </div>

      <div className="mt-6 space-y-2">
        <p className="text-xs font-medium text-zinc-600">Precio</p>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label htmlFor="price-min" className="sr-only">
              Desde
            </label>
            <input
              id="price-min"
              type="number"
              min={0}
              placeholder="Desde"
              value={draftPriceMin}
              onChange={(e) => onDraftPriceMin(e.target.value)}
              className="w-full rounded-xl border border-zinc-200 bg-cream px-3 py-2 text-sm outline-none placeholder:text-zinc-400 focus:border-accent-wine"
            />
          </div>
          <div>
            <label htmlFor="price-max" className="sr-only">
              Hasta
            </label>
            <input
              id="price-max"
              type="number"
              min={0}
              placeholder="Hasta"
              value={draftPriceMax}
              onChange={(e) => onDraftPriceMax(e.target.value)}
              className="w-full rounded-xl border border-zinc-200 bg-cream px-3 py-2 text-sm outline-none placeholder:text-zinc-400 focus:border-accent-wine"
            />
          </div>
        </div>
        <button
          type="button"
          onClick={onApplyPrices}
          className="mt-2 w-full rounded-xl border border-primary bg-primary py-2.5 text-sm font-semibold text-white transition-colors hover:bg-zinc-800"
        >
          Aplicar
        </button>
      </div>
    </aside>
  );
}
