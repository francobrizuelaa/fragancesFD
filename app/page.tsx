import Link from 'next/link';
import Image from 'next/image';
import { HomeProductCarouselSection } from '@/components/home/HomeProductCarousels';
import { HomeCategoryCards } from '@/components/home/HomeCategoryCards';
import { BrandsMarquee } from '@/components/home/BrandsMarquee';
import { getProductsByMarca } from '@/lib/products';

export const revalidate = 60;

const SECCION_MARCAS = [
  'hombre',
  'mujer',
  'nicho',
  'afnan',
  'armaf',
  'bharara',
  'french',
  'haramain',
  'lattafa',
  'orientica',
  'rasasi',
] as const;

function formatSectionTitle(key: (typeof SECCION_MARCAS)[number]): string {
  if (key === 'hombre') return 'Tendencias masculinas';
  if (key === 'mujer') return 'Tendencias femeninas';
  if (key === 'nicho') return 'Nicho';
  return `Línea ${key.charAt(0).toUpperCase()}${key.slice(1)}`;
}

export default async function Home() {
  const secciones = await Promise.all(
    SECCION_MARCAS.map(async (key) => ({
      key,
      title: formatSectionTitle(key),
      products: await getProductsByMarca(key, 10),
    }))
  );

  return (
    <div className="bg-cream">
      
      {/* SECCIÓN 1: PORTADA PERFECTA (Espacio en celu, pegado en PC) */}
      <section
        className="relative mt-24 md:mt-4 lg:mt-0 mb-12 w-full overflow-hidden sm:mb-32"
        aria-label="Promoción"
      >
        <Image
          src="/portada_inicio.png"
          alt="Portada principal"
          width={1920}
          height={800}
          priority
          sizes="100vw"
          className="w-full h-auto" 
        />
      </section>

      {/* SECCIÓN 2: TEXTO PREMIUM Y FOTO FLOTANTE */}
      <section className="border-b border-zinc-200/70">
        <div className="mx-auto grid max-w-[1600px] gap-12 px-5 py-12 sm:px-4 md:grid-cols-2 md:items-center md:py-16 lg:px-16 2xl:px-24">
          
          {/* Columna Izquierda: Textos y Promos Premium */}
          <div className="flex flex-col justify-center">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-accent-wine/80">
              Fragances FD
            </p>
            
            <h1 className="mt-4 text-4xl font-extrabold leading-[1.15] tracking-tight text-primary sm:text-5xl md:text-6xl">
              Probá en decants antes de invertir en el frasco completo
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-600">
              Contamos con un catálogo de más de <span className="font-semibold text-zinc-900">2000 fragancias</span>. Descubrí nuevas opciones y elegí la que mejor va con vos.
            </p>

            {/* Cajas de Promociones Premium */}
            <div className="mt-8 flex flex-col gap-3 max-w-lg">
              
              {/* Promo 1 */}
              <div className="flex items-center gap-4 rounded-2xl border border-zinc-200/60 bg-white/60 px-5 py-4 shadow-[0_4px_15px_-3px_rgba(0,0,0,0.05)] backdrop-blur-sm transition-colors hover:border-accent-wine/30">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent-wine/10 text-2xl">
                  🎁
                </div>
                <div>
                  <p className="text-base font-bold text-zinc-900">Llevando 3 decants</p>
                  <p className="text-sm text-zinc-600 mt-0.5">Recibís 1 decant sorpresa de regalo.</p>
                </div>
              </div>

              {/* Promo 2 */}
              <div className="flex items-center gap-4 rounded-2xl border border-zinc-200/60 bg-white/60 px-5 py-4 shadow-[0_4px_15px_-3px_rgba(0,0,0,0.05)] backdrop-blur-sm transition-colors hover:border-accent-wine/30">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent-wine/10 text-2xl">
                  🎁
                </div>
                <div>
                  <p className="text-base font-bold text-zinc-900">Llevando 6 o más</p>
                  <p className="text-sm text-zinc-600 mt-0.5">Pagás 5 y te llevás 1 decant gratis.</p>
                </div>
              </div>

            </div>

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

          {/* Columna Derecha: Imagen Flotante Ancha */}
          <div className="relative w-full max-w-[600px] mx-auto lg:ml-auto lg:mr-0 lg:max-w-[750px]">
            <Image
              src="/fotoinicio3.png"
              alt="Promo perfumes"
              width={800}
              height={800}
              priority
              className="w-full h-auto object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-700"
            />
          </div>
          
        </div>
      </section>

      {/* SECCIÓN 3: CARRUSELES DE PERFUMES */}
      {secciones.map(({ key, title, products }) =>
        products.length > 0 ? (
          <HomeProductCarouselSection
            key={key}
            title={title}
            href={
              key === 'hombre'
                ? '/catalogo/disenador?gender=hombre'
                : key === 'mujer'
                  ? '/catalogo/disenador?gender=mujer'
                  : key === 'nicho'
                    ? '/catalogo/nicho'
                    : undefined
            }
            products={products}
            emptyMessage={`No hay productos para ${title.toLowerCase()} por ahora.`}
          />
        ) : null
      )}

      {/* SECCIÓN 4: TARJETAS FINALES (Árabes, Diseñador, Nicho) */}
      <div className="mt-24">
        <HomeCategoryCards />
      </div>

      <BrandsMarquee />
      
    </div>
  );
}