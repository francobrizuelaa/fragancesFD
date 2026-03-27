'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
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
  const [logoSrc, setLogoSrc] = useState('/logo.jpeg');
  const { itemCount } = useCart();

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-zinc-200/80 bg-cream/95 backdrop-blur-md">
        <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src={logoSrc}
              alt="fragances FD"
              width={132}
              height={36}
              className="h-9 w-auto object-contain"
              onError={() => setLogoSrc('/logoperfumes.jpeg')}
            />
            <span className="sr-only">fragances FD</span>
          </Link>

          <div className="hidden items-center gap-2 sm:flex">
            <NavLink href="/" label="Inicio" />
            <NavLink href="/catalogo" label="Catálogo" />
          </div>

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
