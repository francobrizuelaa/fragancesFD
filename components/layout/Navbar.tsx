'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Suspense, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { CartSidebar } from '@/components/cart/CartSidebar';
import { useCart } from '@/hooks/useCart';
import { NavbarSearch } from '@/components/layout/NavbarSearch';

function NavLink({
  href,
  label,
  light,
}: {
  href: string;
  label: string;
  light?: boolean;
}) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link
      href={href}
      className={`rounded-full px-4 py-2 text-base font-semibold transition-colors ${
        active
          ? 'text-accent-wine'
          : light
            ? 'text-accent-wine'
            : 'text-accent-wine hover:text-[#4d1822]'
      }`}
    >
      {label}
    </Link>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [cartOpen, setCartOpen] = useState(false);
  const { itemCount } = useCart();
  const isHome = pathname === '/';

  return (
    <>
      <header
        className={`inset-x-0 top-0 z-40 border-b border-zinc-200/80 bg-white/95 backdrop-blur-md transition-all duration-300 ${
          isHome ? 'fixed' : 'sticky'
        }`}
      >
        <nav className="relative mx-auto grid h-20 w-full max-w-7xl grid-cols-[1fr_auto] items-center gap-4 px-4 lg:h-24">
          <Link href="/" className="justify-self-start">
            <Image
            src="/logo3.png"
            alt="fragances FD"
            width={170}
            height={52}
            priority
            // Dejamos la altura fija (52px o h-12) y el ancho automático
            className="h-[52px] w-auto object-contain"
          />
            <span className="sr-only">fragances FD</span>
          </Link>

          <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-2 md:flex">
            <NavLink href="/" label="Inicio" />
            <div className="group relative">
              <Link
                href="/catalogo"
                className="inline-flex items-center gap-1 rounded-full px-4 py-2 text-base font-semibold text-accent-wine transition-colors hover:text-[#4d1822]"
              >
                Catálogo
                <ChevronDown className="h-5 w-5" aria-hidden />
              </Link>
              <div className="pointer-events-none absolute left-0 top-full z-50 pt-2 opacity-0 transition-all duration-200 group-hover:pointer-events-auto group-hover:opacity-100">
                <div className="min-w-[280px] rounded-2xl border border-zinc-200 bg-cream p-4 shadow-xl">
                  <ul className="flex flex-col gap-2">
                    <li>
                      <Link
                        href="/catalogo/disenador"
                        className="block rounded-xl px-4 py-3 text-base font-semibold text-primary transition-colors hover:bg-zinc-100 hover:text-accent-wine"
                      >
                        Perfumes de Diseñador
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/catalogo/arabes"
                        className="block rounded-xl px-4 py-3 text-base font-semibold text-primary transition-colors hover:bg-zinc-100 hover:text-accent-wine"
                      >
                        Perfumes Árabes
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/catalogo/nicho"
                        className="block rounded-xl px-4 py-3 text-base font-semibold text-primary transition-colors hover:bg-zinc-100 hover:text-accent-wine"
                      >
                        Perfumes de Nicho
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/catalogo"
                        className="block rounded-xl px-4 py-3 text-base font-semibold text-primary transition-colors hover:bg-zinc-100 hover:text-accent-wine"
                      >
                        Catálogo Completo
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Suspense
              fallback={
                <div
                  className="hidden h-11 min-w-[280px] max-w-sm animate-pulse rounded-full border border-zinc-200 bg-zinc-100/70 md:block"
                  aria-hidden
                />
              }
            >
              <NavbarSearch />
            </Suspense>

            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="inline-flex items-center gap-2 rounded-full border border-accent-wine px-4 py-2.5 text-base font-semibold text-accent-wine transition-colors hover:bg-accent-wine hover:text-white"
              aria-label="Abrir carrito"
            >
              <svg
                className="h-5 w-5"
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
