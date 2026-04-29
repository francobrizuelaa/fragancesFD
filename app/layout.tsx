import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "fragances FD",
  description: "Perfumes originales y decants premium",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-primary">
        <Navbar />
        <main className="flex-1 pb-[calc(4.75rem+env(safe-area-inset-bottom))] md:pb-0">
          {children}
        </main>
        <a
          href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=Hola%2C%20quiero%20asesoramiento%20sobre%20perfumes.`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contactar por WhatsApp"
          className="fixed bottom-6 right-6 z-[80] hidden h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_28px_-10px_rgba(0,0,0,0.5)] transition-transform hover:scale-110 md:inline-flex"
        >
          <svg
            className="h-7 w-7"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden
          >
            <path d="M19.05 4.94A9.77 9.77 0 0 0 12.1 2c-5.41 0-9.82 4.4-9.82 9.81 0 1.73.45 3.42 1.31 4.9L2 22l5.43-1.42a9.76 9.76 0 0 0 4.67 1.19h.01c5.41 0 9.82-4.4 9.82-9.81a9.7 9.7 0 0 0-2.88-7.02Zm-6.95 15.2h-.01a8.11 8.11 0 0 1-4.13-1.12l-.3-.18-3.22.84.86-3.14-.2-.32a8.15 8.15 0 0 1-1.24-4.32c0-4.49 3.66-8.14 8.16-8.14a8.08 8.08 0 0 1 5.77 2.39 8.07 8.07 0 0 1 2.37 5.75c0 4.49-3.67 8.14-8.16 8.14Zm4.46-6.1c-.24-.12-1.41-.7-1.63-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1-.37-1.9-1.18-.7-.62-1.17-1.39-1.31-1.63-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.31-.74-1.79-.19-.46-.39-.4-.54-.41h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2 0 1.18.86 2.31.98 2.47.12.16 1.69 2.58 4.1 3.62.57.25 1.02.4 1.37.52.58.18 1.11.15 1.53.09.47-.07 1.41-.58 1.61-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z" />
          </svg>
        </a>
        <Footer />
      </body>
    </html>
  );
}
