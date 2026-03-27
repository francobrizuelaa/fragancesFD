'use client';

import { useState } from 'react';
import {
  ProductCard,
  type ProductCardProduct,
} from '@/components/catalog/ProductCard';
import { CartSidebar } from '@/components/cart/CartSidebar';
import { useCart } from '@/hooks/useCart';

const MOCK_PRODUCTS: ProductCardProduct[] = [
  {
    id: 'tf-oud-wood',
    name: 'Oud Wood',
    brand: 'Tom Ford',
    slug: 'tom-ford-oud-wood',
    sizes: [
      { id: 'full', label: 'Frasco entero', price: 450_000, isDecant: false },
      {
        id: 'd10',
        label: 'Decant 10ml',
        price: 28_000,
        isDecant: true,
        volume_ml: 10,
      },
      {
        id: 'd5',
        label: 'Decant 5ml',
        price: 16_000,
        isDecant: true,
        volume_ml: 5,
      },
    ],
  },
  {
    id: 'dior-sauvage',
    name: 'Sauvage EDT',
    brand: 'Dior',
    slug: 'dior-sauvage-edt',
    sizes: [
      { id: 'full', label: 'Frasco entero', price: 195_000, isDecant: false },
      {
        id: 'd10',
        label: 'Decant 10ml',
        price: 14_500,
        isDecant: true,
        volume_ml: 10,
      },
      {
        id: 'd5',
        label: 'Decant 5ml',
        price: 8_500,
        isDecant: true,
        volume_ml: 5,
      },
    ],
  },
  {
    id: 'creed-aventus',
    name: 'Aventus',
    brand: 'Creed',
    slug: 'creed-aventus',
    sizes: [
      { id: 'full', label: 'Frasco entero', price: 520_000, isDecant: false },
      {
        id: 'd10',
        label: 'Decant 10ml',
        price: 32_000,
        isDecant: true,
        volume_ml: 10,
      },
      {
        id: 'd5',
        label: 'Decant 5ml',
        price: 18_000,
        isDecant: true,
        volume_ml: 5,
      },
    ],
  },
  {
    id: 'chanel-bleu',
    name: 'Bleu de Chanel',
    brand: 'Chanel',
    slug: 'chanel-bleu-de-chanel',
    sizes: [
      { id: 'full', label: 'Frasco entero', price: 210_000, isDecant: false },
      {
        id: 'd10',
        label: 'Decant 10ml',
        price: 15_800,
        isDecant: true,
        volume_ml: 10,
      },
      {
        id: 'd5',
        label: 'Decant 5ml',
        price: 9_200,
        isDecant: true,
        volume_ml: 5,
      },
    ],
  },
  {
    id: 'ysl-la-nuit',
    name: 'La Nuit de L\'Homme',
    brand: 'Yves Saint Laurent',
    slug: 'ysl-la-nuit-de-lhomme',
    sizes: [
      { id: 'full', label: 'Frasco entero', price: 175_000, isDecant: false },
      {
        id: 'd10',
        label: 'Decant 10ml',
        price: 13_200,
        isDecant: true,
        volume_ml: 10,
      },
      {
        id: 'd5',
        label: 'Decant 5ml',
        price: 7_800,
        isDecant: true,
        volume_ml: 5,
      },
    ],
  },
  {
    id: 'mmm-replica',
    name: 'By the Fireplace',
    brand: 'Maison Margiela',
    slug: 'maison-margiela-by-the-fireplace',
    sizes: [
      { id: 'full', label: 'Frasco entero', price: 188_000, isDecant: false },
      {
        id: 'd10',
        label: 'Decant 10ml',
        price: 14_000,
        isDecant: true,
        volume_ml: 10,
      },
      {
        id: 'd5',
        label: 'Decant 5ml',
        price: 8_200,
        isDecant: true,
        volume_ml: 5,
      },
    ],
  },
];

function CartOpenButton({ onOpen }: { onOpen: () => void }) {
  const { itemCount } = useCart();
  return (
    <button
      type="button"
      onClick={onOpen}
      className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm font-medium text-zinc-800 shadow-sm transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800 lg:hidden"
    >
      <svg
        className="h-5 w-5 text-zinc-600 dark:text-zinc-300"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
      Carrito
      {itemCount > 0 && (
        <span className="rounded-full bg-emerald-600 px-2 py-0.5 text-xs font-semibold text-white">
          {itemCount}
        </span>
      )}
    </button>
  );
}

export default function Home() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <div className="min-h-screen bg-zinc-100 dark:bg-zinc-950">
      <header className="sticky top-0 z-20 border-b border-zinc-200/80 bg-white/90 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/90">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
              Cenzia Decants
            </p>
            <h1 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              Catálogo de prueba
            </h1>
          </div>
          <CartOpenButton onOpen={() => setCartOpen(true)} />
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 lg:flex-row lg:items-start">
        <main className="min-w-0 flex-1">
          <p className="mb-6 max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">
            Elegí formato y precio, agregá al carrito y probá los niveles de
            combo (3+ unidades: regalo; 5+: descuento del más barato a $0 cada 5
            unidades).
          </p>
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {MOCK_PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </main>

        <aside className="hidden w-full max-w-md shrink-0 lg:block lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:self-start">
          <div className="flex max-h-[calc(100vh-7rem)] min-h-[320px] flex-col">
            <CartSidebar />
          </div>
        </aside>
      </div>

      {cartOpen && (
        <div
          className="fixed inset-0 z-40 flex lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Carrito"
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/50"
            aria-label="Cerrar fondo"
            onClick={() => setCartOpen(false)}
          />
          <div className="relative ml-auto flex h-full w-full max-w-md flex-col bg-white shadow-2xl dark:bg-zinc-950">
            <CartSidebar onClose={() => setCartOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
