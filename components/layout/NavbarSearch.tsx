'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
} from 'react';
import { Search } from 'lucide-react';
import { getProducts, minProductPrice } from '@/lib/products';
import type { ProductCardProduct } from '@/components/catalog/ProductCard';

function formatPriceArs(amount: number): string {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(amount);
}

function filterPredictive(
  q: string,
  all: ProductCardProduct[]
): ProductCardProduct[] {
  const trimmed = q.trim().toLowerCase();
  if (!trimmed) return [];
  return all
    .filter(
      (p) =>
        p.name.toLowerCase().includes(trimmed) ||
        p.brand.toLowerCase().includes(trimmed)
    )
    .slice(0, 4);
}

function thumbnailSrc(p: ProductCardProduct): string {
  return p.images[0] ?? '/decant-1.png';
}

export function NavbarSearch({ light = false }: { light?: boolean }) {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState('');
  const [panelOpen, setPanelOpen] = useState(false);
  const [catalog, setCatalog] = useState<ProductCardProduct[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getProducts()
      .then(setCatalog)
      .catch(() => setCatalog([]));
  }, []);

  const results = useMemo(
    () => filterPredictive(searchQuery, catalog),
    [searchQuery, catalog]
  );

  const showPanel = panelOpen && searchQuery.trim().length > 0;

  useEffect(() => {
    const onDocMouseDown = (e: MouseEvent) => {
      const el = containerRef.current;
      if (!el || el.contains(e.target as Node)) return;
      setPanelOpen(false);
    };
    document.addEventListener('mousedown', onDocMouseDown);
    return () => document.removeEventListener('mousedown', onDocMouseDown);
  }, []);

  const submitSearch = useCallback(() => {
    const q = searchQuery.trim();
    setPanelOpen(false);
    if (!q) {
      router.push('/catalogo');
      return;
    }
    router.push(`/catalogo?search=${encodeURIComponent(q)}`);
  }, [router, searchQuery]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitSearch();
  };

  return (
    <div ref={containerRef} className="relative hidden min-w-[280px] max-w-sm md:block">
      <form onSubmit={handleSubmit}>
        <Search
          className={`pointer-events-none absolute left-3 top-1/2 z-[1] h-4 w-4 -translate-y-1/2 ${
            light ? 'text-white/80' : 'text-zinc-500'
          }`}
          aria-hidden
        />
        <input
          type="search"
          name="q"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setPanelOpen(true);
          }}
          onFocus={() => setPanelOpen(true)}
          placeholder="Buscar"
          className={`h-10 w-full rounded-full border pl-9 pr-3 text-sm outline-none transition ${
            light
              ? 'border-white/40 bg-black/25 text-white placeholder:text-white/80 focus:border-white/60 focus:bg-black/35'
              : 'border-zinc-200 bg-zinc-100/70 text-zinc-800 placeholder:text-zinc-500 focus:border-zinc-300 focus:bg-white'
          }`}
          aria-label="Buscar perfumes"
          autoComplete="off"
        />

        {showPanel && (
          <div
            id="navbar-search-results"
            role="listbox"
            className="absolute left-0 top-full z-[60] mt-2 w-full overflow-hidden rounded-md bg-cream shadow-2xl ring-1 ring-zinc-200/80"
          >
            {results.length > 0 ? (
              <ul className="max-h-[min(320px,70vh)] divide-y divide-zinc-200/80 overflow-y-auto">
                {results.map((p) => (
                  <li key={p.id} role="option" aria-selected={false}>
                    <Link
                      href={`/producto/${p.slug}`}
                      onClick={() => setPanelOpen(false)}
                      className="flex gap-3 px-3 py-2.5 transition-colors hover:bg-zinc-100/90"
                    >
                      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md bg-zinc-100">
                        <Image
                          src={thumbnailSrc(p)}
                          alt={p.name}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-primary">
                          {p.name}
                        </p>
                        <p className="truncate text-xs text-zinc-600">{p.brand}</p>
                        <p className="mt-0.5 text-xs font-medium tabular-nums text-accent-wine">
                          desde {formatPriceArs(minProductPrice(p))}
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="px-3 py-4 text-center text-sm text-zinc-600">
                Sin coincidencias rápidas. Probá en el catálogo completo.
              </p>
            )}
            <div className="border-t border-zinc-200/80 bg-cream/95 p-2">
              <button
                type="submit"
                className="w-full rounded-md py-2.5 text-center text-sm font-semibold text-accent-wine transition hover:bg-zinc-100"
              >
                Ver todos los resultados
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
