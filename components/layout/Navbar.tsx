'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import { CartSidebar } from '@/components/cart/CartSidebar';
import { useCart } from '@/hooks/useCart';

function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link
      href={href}
      className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
        active
          ? 'text-accent-wine'
          : 'text-primary hover:text-accent-wine'
      }`}
    >
      {label}
    </Link>
  );
}

export function Navbar() {
  const [cartOpen, setCartOpen] = useState(false);
  const { itemCount } = useCart();

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-zinc-200/80 bg-cream/95 backdrop-blur-md">
        <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="fragances FD"
              width={132}
              height={36}
              priority
              style={{ width: 'auto', height: 'auto' }}
              className="h-9 w-auto object-contain"
            />
            <span className="sr-only">fragances FD</span>
          </Link>

          <div className="hidden items-center gap-2 sm:flex">
            <NavLink href="/" label="Inicio" />
            <div className="group relative">
              <Link
                href="/catalogo"
                className="inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-primary transition-colors hover:text-accent-wine"
              >
                Catálogo
                <ChevronDown className="h-4 w-4" aria-hidden />
              </Link>
              <div className="pointer-events-none absolute left-0 top-full z-50 pt-2 opacity-0 transition-all duration-200 group-hover:pointer-events-auto group-hover:opacity-100">
                <div className="w-[360px] rounded-2xl border border-zinc-200 bg-cream p-5 shadow-xl">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-accent-wine">
                        Perfumes de Diseñador
                      </p>
                      <ul className="space-y-2 text-sm text-zinc-700">
                        <li><Link href="#" className="hover:text-accent-wine">Dior</Link></li>
                        <li><Link href="#" className="hover:text-accent-wine">Chanel</Link></li>
                        <li><Link href="#" className="hover:text-accent-wine">YSL</Link></li>
                      </ul>
                    </div>
                    <div>
                      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-accent-wine">
                        Perfumes Árabes
                      </p>
                      <ul className="space-y-2 text-sm text-zinc-700">
                        <li><Link href="#" className="hover:text-accent-wine">Lattafa</Link></li>
                        <li><Link href="#" className="hover:text-accent-wine">Afnan</Link></li>
                        <li><Link href="#" className="hover:text-accent-wine">Armaf</Link></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <label className="relative hidden md:block">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" aria-hidden />
              <input
                type="search"
                placeholder="Buscar"
                className="h-10 w-44 rounded-full border border-zinc-200 bg-zinc-100/70 pl-9 pr-3 text-sm text-zinc-800 outline-none transition focus:border-zinc-300 focus:bg-white"
                aria-label="Buscar perfumes"
              />
            </label>

            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="inline-flex items-center gap-2 rounded-full border border-accent-wine px-3.5 py-2 text-sm font-medium text-accent-wine transition-colors hover:bg-accent-wine hover:text-white"
              aria-label="Abrir carrito"
            >
              <svg
                className="h-4.5 w-4.5"
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
                <span className="rounded-full bg-accent-wine px-2 py-0.5 text-xs font-semibold text-white">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </nav>
      </header>

      {cartOpen && (
        <div
          className="fixed inset-0 z-50 flex"
          role="dialog"
          aria-modal="true"
          aria-label="Carrito"
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/55"
            onClick={() => setCartOpen(false)}
            aria-label="Cerrar carrito"
          />
          <div className="relative ml-auto flex h-full w-full max-w-md flex-col bg-white shadow-2xl">
            <CartSidebar onClose={() => setCartOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}
