import Link from 'next/link';

export function Footer() {
  return (
    <footer className="mt-8 bg-[#11151e] text-zinc-200">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-12 md:grid-cols-3">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-white">
            Términos y Condiciones
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-zinc-300">
            <li>
              <Link href="#" className="transition-colors hover:text-white">
                Política de privacidad
              </Link>
            </li>
            <li>
              <Link href="#" className="transition-colors hover:text-white">
                Términos del servicio
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-white">
            Contactanos
          </h3>
          <div className="mt-4 space-y-2 text-sm text-zinc-300">
            <p>Tel: +54 9 11 76661815</p>
            <p>Mail: contacto@fragancesfd.com</p>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-white">
            Seguinos
          </h3>
          <div className="mt-4">
            <a
              href="https://www.instagram.com/fragances_fd/?hl=es"
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-600 text-zinc-200 transition-colors hover:border-white hover:text-white"
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-zinc-700/80">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 py-5 text-sm text-zinc-300 sm:flex-row sm:items-center sm:justify-between">
          <p>
            Medios de pago: Visa / MasterCard / Mercado Pago
          </p>
          <p>
            Medios de envío: Andreani / Correo Argentino
          </p>
        </div>
      </div>

      <div className="border-t border-zinc-700/70">
        <div className="mx-auto w-full max-w-7xl px-4 py-4 text-xs text-zinc-400">
          © {new Date().getFullYear()} fragances FD. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
