'use client';

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
  'basis-[88%] min-w-0 md:basis-1/2 lg:basis-1/4';

function HomeProductCarouselSection({
  title,
  products,
  emptyMessage,
}: {
  title: string;
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
      <section className="mx-auto w-full max-w-[1400px] px-4 pb-10 md:px-12">
        <h2 className="mb-2 text-2xl font-semibold tracking-tight text-primary">
          {title}
        </h2>
        <p className="text-sm text-zinc-600">{emptyMessage}</p>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-[1400px] px-4 pb-10 md:px-12">
      <h2 className="mb-6 text-2xl font-semibold tracking-tight text-primary">
        {title}
      </h2>
      <Carousel
        opts={{ loop: true, align: 'start' }}
        plugins={[autoplay]}
        className="w-full px-10 md:px-14"
      >
        <CarouselContent>
          {products.map((product) => (
            <CarouselItem key={product.id} className={slideBasis}>
              <CarouselProductCard product={product} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
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
