import Link from 'next/link';
import Image from 'next/image';

function CategoryCard({
  href,
  title,
  imageSrc,
}: {
  href: string;
  title: string;
  imageSrc: string;
}) {
  return (
    <Link
      href={href}
      className="group relative block overflow-hidden rounded-3xl border border-zinc-800/30 shadow-[0_24px_50px_-28px_rgba(0,0,0,0.5)] outline-none ring-accent-wine/0 transition-shadow focus-visible:ring-2 focus-visible:ring-accent-wine"
    >
      <div className="relative aspect-square md:aspect-video">
        <Image
          src={imageSrc}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
        <div
          className="absolute inset-0 bg-black/45 transition-colors duration-500 group-hover:bg-black/50"
          aria-hidden
        />
        <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
          <h2 className="font-serif text-2xl font-semibold uppercase tracking-[0.14em] text-white drop-shadow-sm sm:text-3xl md:text-4xl">
            {title}
          </h2>
        </div>
      </div>
    </Link>
  );
}

export function HomeCategoryCards() {
  return (
    <section
      className="mx-auto w-full max-w-[1600px] px-5 pb-12 sm:px-4 md:px-16 2xl:px-24"
      aria-label="Categorías"
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <CategoryCard
          href="/catalogo/arabes"
          title=""
          imageSrc="/arabes3.png"
        />
        <CategoryCard
          href="/catalogo/disenador"
          title=""
          imageSrc="/diseñador2.png"
        />
        <CategoryCard
          href="/catalogo/nicho"
          title=""
          imageSrc="/nicho.png"
        />
      </div>
    </section>
  );
}
