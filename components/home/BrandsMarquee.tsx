import Link from 'next/link';

/** Marcas de diseñador — orden fijo para el marquee del home. */
const DESIGNER_MARQUEE_BRANDS = [
  'ABERCROMBIE', 'AMOUAGE', 'ANTONIO BANDERAS', 'ARMANI', 'AZZARO', 
  'BENETTON', 'BURBERRY', 'BVLGARI', 'CAROLINA HERRERA', 'CHANEL', 
  'CHLOE', 'CALVIN KLEIN', 'CREED', 'DIOR', 'DOLCE GABBANA', 
  'ESCENTRIC', 'GISADA', 'GIVENCHY', 'GUCCI', 'HERMES', 
  'HUGO BOSS', 'INITIO', 'JEAN PAUL GAULTIER', 'JIMMY CHOO', 'LACOSTE', 
  'LOEWE', 'MANCERA', 'MARC JACOBS', 'MARLY', 'MEMO', 
  'MERCEDES BENZ', 'MONT BLANC', 'MONTALE', 'NEJMA', 'PACO RABANNE', 
  'PRADA', 'STELLA DUSTIN', 'THIERRY MUGLER', 'TOM FORD', 'VALENTINO', 
  'VERSACE', 'XERJOFF', 'YSL'
] as const;

export function BrandsMarquee() {
  // Le agregamos un separador lindo entre cada marca
  const line = DESIGNER_MARQUEE_BRANDS.join('  ·  ') + '  ·  ';

  return (
    <section className="mx-auto mt-14 w-full max-w-[1600px] px-5 pb-16 sm:px-4 md:px-16 2xl:px-24">
      
      {/* Motor de la animación: Esto hace que el texto se mueva infinitamente 
        sin necesidad de tocar el tailwind.config ni el globals.css
      */}
      <style>{`
        @keyframes scroll-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: scroll-marquee 40s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Contenedor de la cinta */}
      <div className="overflow-hidden rounded-2xl border border-zinc-200/90 bg-white/70 py-5 shadow-sm backdrop-blur-sm">
        {/* El w-max es clave para que el texto no se corte y ocupe todo lo que necesite */}
        <div className="flex w-max animate-marquee">
          <span className="inline-block whitespace-nowrap px-4 font-sans text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500 md:text-sm">
            {line}
          </span>
          <span className="inline-block whitespace-nowrap px-4 font-sans text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500 md:text-sm" aria-hidden="true">
            {line}
          </span>
        </div>
      </div>

      {/* Textos y Botón */}
      <p className="mt-8 mb-6 text-xl md:text-2xl font-extrabold text-center text-primary tracking-tight">
        Más de 2000 perfumes en frascos con los que trabajamos. Buscá tu marca y consultanos disponibilidad.
      </p>

      <div className="flex justify-center">
        {/* ACORDATE DE CAMBIAR EL NÚMERO DE TELÉFONO EN EL HREF */}
        <Link
          href="https://wa.me/5491100000000" 
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-[#25D366] px-8 py-3 text-sm font-bold uppercase tracking-[0.12em] text-white shadow-[0_10px_30px_-10px_rgba(37,211,102,0.6)] transition hover:bg-[#1ebd5a] hover:scale-105"
        >
          Consultar por WhatsApp
        </Link>
      </div>
    </section>
  );
}