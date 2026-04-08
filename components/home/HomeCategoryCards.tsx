import Link from 'next/link';
import Image from 'next/image';

function CategoryCard({
  href,
  title,
  subtitle,
  imageSrc,
}: {
  href: string;
  title: string;
  subtitle: string;
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
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center sm:gap-5">
          <h2 className="font-serif text-2xl font-semibold uppercase tracking-[0.14em] text-white drop-shadow-sm sm:text-3xl md:text-4xl">
            {title}
          </h2>
          <p className="max-w-md text-xs font-medium uppercase tracking-[0.22em] text-white/85 sm:text-sm">
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
          imageSrc="/arabes.png"
        />
        <CategoryCard
          href="/disenador"
          title="Perfumes de diseñador"
          subtitle="A pedido · consultá por WhatsApp"
          imageSrc="/disenador.png"
        />
      </div>
    </section>
  );
}
