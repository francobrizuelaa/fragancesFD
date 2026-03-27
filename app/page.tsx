import Link from 'next/link';
import { ProductCard } from '@/components/catalog/ProductCard';
import { MOCK_PRODUCTS } from '@/lib/mockProducts';

const comboCards = [
  {
    tier: 'Nivel 1',
    title: 'Regalo con 3',
    description:
      'Llevando 3 unidades, sumamos un decant sorpresa de regalo a tu pedido.',
  },
  {
    tier: 'Nivel 2',
    title: 'Más barato a $0 llevando 5',
    description:
      'En cada grupo de 5 unidades, el producto de menor precio se bonifica automáticamente.',
  },
];

export default function Home() {
  const destacados = MOCK_PRODUCTS;
  const promociones = [...MOCK_PRODUCTS].reverse();

  return (
    <div className="bg-cream">
      <section className="border-b border-zinc-200/70">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 md:grid-cols-2 md:items-center md:py-24">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent-wine">
              fragances FD
            </p>
            <h1 className="mt-4 text-5xl font-semibold leading-tight tracking-tight text-primary sm:text-6xl">
              Descubrí Aromas con Distinción
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-zinc-700">
              Perfumes originales en decants y frascos cerrados. Curaduría premium,
              presentación impecable y una experiencia de compra simple.
            </p>
            <div className="mt-9">
              <Link
                href="/catalogo"
                className="inline-flex items-center gap-2 rounded-full bg-accent-wine px-7 py-3 text-sm font-semibold tracking-wide text-white transition-colors hover:bg-[#4d1822]"
              >
                Ver Catálogo
                <span aria-hidden>→</span>
              </Link>
            </div>
          </div>

          <div className="relative mx-auto h-[380px] w-full max-w-[440px]">
            <div className="absolute left-0 top-10 h-[280px] w-[210px] rounded-[2rem] border border-zinc-200 bg-gradient-to-b from-zinc-100 to-zinc-200 shadow-[0_16px_36px_-22px_rgba(0,0,0,0.45)]" />
            <div className="absolute right-4 top-0 h-[320px] w-[230px] rounded-[2rem] border border-zinc-200 bg-gradient-to-b from-zinc-50 to-zinc-300 shadow-[0_24px_40px_-22px_rgba(0,0,0,0.5)]" />
            <div className="absolute left-12 top-32 h-[280px] w-[220px] rounded-[2rem] border border-zinc-200 bg-white/60 p-4 backdrop-blur-[2px]">
              <div className="flex h-full items-end justify-center rounded-[1.4rem] border border-zinc-200 bg-[linear-gradient(180deg,#ece7de_0%,#ffffff_100%)]">
                <span className="mb-5 text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                  Decant Bottle
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:py-20">
        <div className="mb-8">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent-wine">
            Combos inteligentes
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-primary">
            Beneficios automáticos en tu carrito
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {comboCards.map((card) => (
            <article
              key={card.tier}
              className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-[0_12px_26px_-22px_rgba(0,0,0,0.55)]"
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 text-accent-wine">
                  {card.tier === 'Nivel 1' ? (
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 3v18M3 12h18" />
                    </svg>
                  ) : (
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="m4 12 5 5L20 6" />
                    </svg>
                  )}
                </span>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-wine">
                  {card.tier}
                </p>
              </div>
              <h3 className="mt-4 text-xl font-semibold text-primary">
                {card.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-700">
                {card.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-8">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-2xl font-semibold tracking-tight text-primary">
            Nuestros Destacados
          </h2>
        </div>
        <div className="flex snap-x gap-5 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:grid lg:grid-cols-3 lg:overflow-visible lg:pb-0">
          {destacados.map((product) => (
            <div key={`destacado-${product.id}`} className="min-w-[270px] max-w-[290px] snap-start lg:min-w-0 lg:max-w-none">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:py-14">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-2xl font-semibold tracking-tight text-primary">
            Promociones
          </h2>
        </div>
        <div className="flex snap-x gap-5 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:grid lg:grid-cols-3 lg:overflow-visible lg:pb-0">
          {promociones.map((product) => (
            <div key={`promo-${product.id}`} className="min-w-[270px] max-w-[290px] snap-start lg:min-w-0 lg:max-w-none">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
