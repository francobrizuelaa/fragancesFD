'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { CarouselProductCard } from '@/components/catalog/CarouselProductCard';
import type { ProductCardProduct } from '@/components/catalog/ProductCard';

/** ~1 tarjeta visible en mobile (con leve peek), 2 en tablet, 4 en desktop. */
const slideBasis =
  'basis-[85%] min-w-0 md:basis-1/2 lg:basis-1/4 xl:basis-1/5';

export function HomeProductCarouselSection({
  title,
  href,
  products,
  emptyMessage,
}: {
  title: string;
  href?: string;
  products: ProductCardProduct[];
  emptyMessage: string;
}) {
  const autoplay = useMemo(
    () =>
      Autoplay({
        delay: 4000,
        stopOnInteraction: true,
        stopOnMouseEnter: true,
      }),
    []
  );

  if (products.length === 0) {
    return (
      <section className="mx-auto mt-12 w-full max-w-[1600px] px-5 pb-10 sm:px-4 md:mt-16 md:px-16 2xl:px-24">
        <h2 className="mb-2 text-2xl font-bold tracking-tight text-primary md:text-3xl">
          {title}
        </h2>
        <p className="text-sm text-zinc-600">{emptyMessage}</p>
      </section>
    );
  }

  return (
    <section className="mx-auto mt-12 w-full max-w-[1600px] px-5 pb-10 sm:px-4 md:mt-16 md:px-16 2xl:px-24">
      {href ? (
        <h2 className="mb-6 text-2xl font-bold tracking-tight text-primary md:text-3xl">
          <Link href={href} className="hover:text-accent-wine">
            {title}
          </Link>
        </h2>
      ) : (
        <h2 className="mb-6 text-2xl font-bold tracking-tight text-primary md:text-3xl">
          {title}
        </h2>
      )}
      <Carousel
        opts={{ loop: true, align: 'start' }}
        plugins={[autoplay]}
        className="w-full"
      >
        <CarouselContent>
          {products.map((product) => (
            <CarouselItem key={product.id} className={slideBasis}>
              <CarouselProductCard product={product} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>
    </section>
  );
}

export function HomeDestacadosCarousel({
  products,
}: {
  products: ProductCardProduct[];
}) {
  return (
    <HomeProductCarouselSection
      title="Nuestros Destacados"
      products={products}
      emptyMessage="No hay productos destacados por ahora."
    />
  );
}

export function HomePromocionesCarousel({
  products,
}: {
  products: ProductCardProduct[];
}) {
  return (
    <HomeProductCarouselSection
      title="Promociones"
      products={products}
      emptyMessage="No hay promociones por ahora."
    />
  );
}
