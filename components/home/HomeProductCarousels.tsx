'use client';

import { Carousel3D } from '@/components/ui/3DCarousel';
import { CarouselProductCard } from '@/components/catalog/CarouselProductCard';
import type { ProductCardProduct } from '@/components/catalog/ProductCard';

export function HomeProductCarousels({
  products,
}: {
  products: ProductCardProduct[];
}) {
  const destacados = products;
  const promociones = [...products].reverse();

  const itemsDestacados = destacados.map((product) => (
    <CarouselProductCard key={product.id} product={product} />
  ));

  const itemsPromos = promociones.map((product) => (
    <CarouselProductCard key={`promo-${product.id}`} product={product} />
  ));

  return (
    <>
      <section className="mx-auto w-full max-w-[1400px] px-4 pb-10 md:px-12">
        <h2 className="mb-2 text-2xl font-semibold tracking-tight text-primary">
          Nuestros Destacados
        </h2>
        <Carousel3D
          items={itemsDestacados}
          autoRotate
          rotationSpeed={3500}
          perspective={1100}
          radius={360}
        />
      </section>

      <section className="mx-auto w-full max-w-[1400px] px-4 py-10 sm:py-14 md:px-12">
        <h2 className="mb-2 text-2xl font-semibold tracking-tight text-primary">
          Promociones
        </h2>
        <Carousel3D
          items={itemsPromos}
          autoRotate
          rotationSpeed={4000}
          perspective={1100}
          radius={360}
        />
      </section>
    </>
  );
}
