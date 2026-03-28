'use client';

import { Carousel3D } from '@/components/ui/3DCarousel';
import { CarouselProductCard } from '@/components/catalog/CarouselProductCard';
import { MOCK_PRODUCTS } from '@/lib/mockProducts';

export function HomeProductCarousels() {
  const destacados = MOCK_PRODUCTS;
  const promociones = [...MOCK_PRODUCTS].reverse();

  const itemsDestacados = destacados.map((product) => (
    <CarouselProductCard key={product.id} product={product} />
  ));

  const itemsPromos = promociones.map((product) => (
    <CarouselProductCard key={`promo-${product.id}`} product={product} />
  ));

  return (
    <>
      <section className="mx-auto max-w-7xl px-4 pb-10">
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

      <section className="mx-auto max-w-7xl px-4 py-10 sm:py-14">
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
