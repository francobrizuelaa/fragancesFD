import Link from 'next/link';
import { Sparkles } from 'lucide-react';

function CategoryCard({
  href,
  title,
  subtitle,
  accentClass,
}: {
  href: string;
  title: string;
  subtitle: string;
  accentClass: string;
}) {
  return (
    <Link
      href={href}
      className="group relative block overflow-hidden rounded-3xl border border-zinc-800/40 shadow-[0_24px_50px_-28px_rgba(0,0,0,0.55)] outline-none ring-accent-wine/0 transition-shadow focus-visible:ring-2 focus-visible:ring-accent-wine"
    >
      <div className="relative aspect-square md:aspect-video">
        <div
          className={`absolute inset-0 bg-gradient-to-br ${accentClass} transition-transform duration-700 ease-out group-hover:scale-110`}
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(255,255,255,0.12),transparent_55%)] opacity-90 transition-opacity duration-500 group-hover:opacity-100"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-zinc-950/55 transition-colors duration-500 group-hover:bg-zinc-950/75"
          aria-hidden
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
          <Sparkles
            className="h-10 w-10 text-white/35 transition-all duration-500 group-hover:scale-110 group-hover:text-white/50 md:h-12 md:w-12"
            strokeWidth={1.25}
            aria-hidden
          />
          <h2 className="font-serif text-2xl font-semibold uppercase tracking-[0.12em] text-white drop-shadow-md sm:text-3xl md:text-4xl">
            {title}
          </h2>
          <p className="max-w-sm text-xs font-medium uppercase tracking-[0.2em] text-white/70 transition-colors duration-500 group-hover:text-white/85 sm:text-sm">
            {subtitle}
          </p>
        </div>
      </div>
    </Link>
  );
}

export function HomeCategoryCards() {
  return (
    <section
      className="mx-auto w-full max-w-[1400px] px-4 pb-10 md:px-12"
      aria-label="Categorías"
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <CategoryCard
          href="/catalogo"
          title="Perfumes árabes"
          subtitle="Compra online · envío a todo el país"
          accentClass="from-[#1a0a0e] via-[#3d1520] to-[#2a1218]"
        />
        <CategoryCard
          href="/disenador"
          title="Perfumes de diseñador"
          subtitle="A pedido · consultá por WhatsApp"
          accentClass="from-zinc-900 via-[#1f1418] to-[#2d181c]"
        />
      </div>
    </section>
  );
}
