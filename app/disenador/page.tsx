import type { Metadata } from 'next';
import Link from 'next/link';

const DESIGNER_BRANDS = [
  'Dior',
  'Chanel',
  'Tom Ford',
  'Yves Saint Laurent',
  'Giorgio Armani',
  'Amouage',
  'Creed',
  'Byredo',
  'Maison Francis Kurkdjian',
  'Gucci',
  'Prada',
  'Versace',
  'Hermès',
  'Givenchy',
  'Valentino',
  'Marc Jacobs',
  'Burberry',
  'Dolce & Gabbana',
  'Jean Paul Gaultier',
];

export const metadata: Metadata = {
  title: 'Marcas de diseñador | fragances FD',
  description:
    'Perfumes de diseñador a pedido. Consultá stock y cotización por WhatsApp.',
};

export default function DisenadorPage() {
  return (
    <div className="min-h-[70vh] bg-cream">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:py-20">
        <header className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent-wine">
            A pedido
          </p>
          <h1 className="mt-4 font-serif text-4xl font-semibold tracking-tight text-primary sm:text-5xl">
            Marcas de Diseñador
          </h1>
          <p className="mt-6 text-base leading-relaxed text-zinc-700 sm:text-lg">
            Trabajamos con las mejores casas de perfumería del mundo. Estos
            productos son exclusivos y se traen a pedido. Seleccioná tu marca
            favorita y consultanos el stock y cotización por WhatsApp.
          </p>
        </header>

        <ul className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-5">
          {DESIGNER_BRANDS.map((name) => (
            <li key={name}>
              <div className="flex min-h-[88px] items-center justify-center rounded-2xl border border-zinc-200/90 bg-white px-4 py-5 text-center shadow-[0_8px_30px_-18px_rgba(0,0,0,0.35)] transition-shadow hover:shadow-[0_12px_36px_-16px_rgba(61,21,32,0.25)]">
                <span className="font-serif text-base font-medium tracking-wide text-primary sm:text-lg">
                  {name}
                </span>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-16 flex justify-center">
          <Link
            href="#"
            className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-accent-wine px-10 py-3.5 text-center text-sm font-semibold uppercase tracking-[0.14em] text-white shadow-[0_14px_40px_-12px_rgba(61,21,32,0.55)] transition hover:bg-[#4d1822]"
          >
            Consultar catálogo completo por WhatsApp
          </Link>
        </div>
      </div>
    </div>
  );
}
