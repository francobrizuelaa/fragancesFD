'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, LayoutGrid, MessageCircle, ShoppingBag } from 'lucide-react';
import { useCart } from '@/hooks/useCart';

function waConsultHref(): string {
  const raw = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  if (!raw?.trim()) return '#';
  const phone = raw.replace(/\D/g, '');
  if (!phone) return '#';
  const url = new URL(`https://wa.me/${phone}`);
  url.searchParams.set(
    'text',
    'Hola, quiero asesoramiento sobre perfumes y decants.'
  );
  return url.toString();
}

export function MobileBottomNav() {
  const pathname = usePathname();
  const { itemCount, openCartDrawer } = useCart();
  const waHref = waConsultHref();

  if (pathname.startsWith('/producto/')) return null;

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-[90] border-t border-zinc-200/70 bg-white/80 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-1 shadow-[0_-8px_32px_-12px_rgba(0,0,0,0.12)] backdrop-blur-xl supports-[backdrop-filter]:bg-white/70 md:hidden"
      aria-label="Navegación principal"
    >
      <div className="mx-auto flex max-w-lg items-stretch justify-between gap-1 px-2">
        <BottomLink
          href="/"
          label="Inicio"
          icon={Home}
          active={pathname === '/'}
        />
        <BottomLink
          href="/catalogo"
          label="Catálogo"
          icon={LayoutGrid}
          active={pathname.startsWith('/catalogo')}
        />
        <button
          type="button"
          onClick={() => openCartDrawer()}
          className="relative flex min-h-12 min-w-[3.25rem] flex-1 flex-col items-center justify-center gap-0.5 rounded-2xl py-1.5 text-[10px] font-semibold tracking-wide text-zinc-600 transition-colors active:bg-zinc-100/80"
          aria-label="Abrir carrito"
        >
          <span className="relative inline-flex">
            <ShoppingBag className="h-6 w-6 stroke-[1.75]" aria-hidden />
            {itemCount > 0 && (
              <span className="absolute -right-2 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-accent-wine px-1 text-[10px] font-bold text-white">
                {itemCount > 99 ? '99+' : itemCount}
              </span>
            )}
          </span>
          Carrito
        </button>
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-12 min-w-[3.25rem] flex-1 flex-col items-center justify-center gap-0.5 rounded-2xl py-1.5 text-[10px] font-semibold tracking-wide text-[#128C7E] transition-colors active:bg-[#25D366]/10"
          aria-label="Consultar por WhatsApp"
        >
          <MessageCircle className="h-6 w-6" aria-hidden />
          WhatsApp
        </a>
      </div>
    </nav>
  );
}

function BottomLink({
  href,
  label,
  icon: Icon,
  active,
}: {
  href: string;
  label: string;
  icon: typeof Home;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex min-h-12 min-w-[3.25rem] flex-1 flex-col items-center justify-center gap-0.5 rounded-2xl py-1.5 text-[10px] font-semibold tracking-wide transition-colors active:bg-zinc-100/80 ${
        active ? 'text-accent-wine' : 'text-zinc-600'
      }`}
    >
      <Icon
        className={`h-6 w-6 ${active ? 'stroke-[2.5]' : 'stroke-[1.75]'}`}
        aria-hidden
      />
      {label}
    </Link>
  );
}
