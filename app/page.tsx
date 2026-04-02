import Link from 'next/link';
import Image from 'next/image';
import {
  HomeDestacadosCarousel,
  HomePromocionesCarousel,
} from '@/components/home/HomeProductCarousels';
import { HomeCategoryCards } from '@/components/home/HomeCategoryCards';
import type { ProductCardProduct } from '@/components/catalog/ProductCard';
import { getProducts } from '@/lib/products';

export const revalidate = 60;

export default async function Home() {
  const products: ProductCardProduct[] = await getProducts().catch(() => []);

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

          {/* ACÁ EMPIEZA LA MAGIA DE LAS IMÁGENES REALES */}
          <div className="relative mx-auto h-[380px] w-full max-w-[440px]">
            
            {/* Imagen de fondo izquierda */}
            <div className="absolute left-0 top-10 h-[280px] w-[210px] overflow-hidden rounded-[2rem] shadow-[0_16px_36px_-22px_rgba(0,0,0,0.45)]">
              <Image 
                src="/decant-1.png" 
                alt="Decant de perfume 1" 
                fill 
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 hover:scale-105" 
              />
            </div>

            {/* Imagen de fondo derecha */}
            <div className="absolute right-4 top-0 h-[320px] w-[230px] overflow-hidden rounded-[2rem] shadow-[0_24px_40px_-22px_rgba(0,0,0,0.5)]">
              <Image 
                src="/decant-1.png" 
                alt="Decant de perfume 2" 
                fill 
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 hover:scale-105" 
              />
            </div>

            {/* Imagen principal al frente */}
            <div className="absolute left-12 top-32 h-[280px] w-[220px] overflow-hidden rounded-[2rem] border-[6px] border-[#fdfbf7] shadow-2xl">
              <Image 
                src="/decant-1.png" 
                alt="Decant de perfume principal" 
                fill 
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 hover:scale-105" 
              />
            </div>
            
          </div>
          {/* ACÁ TERMINA */}

        </div>
      </section>

      <section
        className="mb-24 w-full bg-gradient-to-br from-[#2a0e14] via-[#3d1520] to-[#4d1822] py-24 text-cream sm:mb-32 sm:py-32"
        aria-label="Promoción"
      >
        <div className="mx-auto w-full max-w-4xl px-4 text-center">
          <p className="mb-4 font-serif text-3xl italic leading-snug text-[#e8e3d9] md:mb-6 md:text-5xl md:leading-tight">
            ¡Decant de regalo llevando 3 productos!
          </p>
          <p className="font-sans text-sm font-light uppercase tracking-widest text-white/80 md:text-base">
            ¡Perfume de regalo llevando 5!
          </p>
        </div>
      </section>

      <HomeDestacadosCarousel products={products} />
      <HomeCategoryCards />
      <HomePromocionesCarousel products={products} />
    </div>
  );
}