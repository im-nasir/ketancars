import type { Metadata } from 'next';
import { Cormorant_Garamond, Jost } from 'next/font/google';
import './globals.css';
import { NavThemeProvider } from '@/context/NavThemeContext';
import Nav from '@/components/Nav';
import AudioPlayer from '@/components/AudioPlayer';

const cormorant = Cormorant_Garamond({
  variable: '--font-serif',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const jost = Jost({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://classica.co.uk'),
  title: {
    default: 'CLASSICA — Rare & Vintage Motor Cars',
    template: '%s — CLASSICA',
  },
  description:
    'CLASSICA curates the world\'s finest classic and vintage motor cars. Acquisitions, sales, and bespoke restoration.',
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    siteName: 'CLASSICA',
    // TODO: Replace with client domain
    url: 'https://classica.co.uk',
    images: [
      {
        // TODO: Replace with actual OG image
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'CLASSICA — Rare & Vintage Motor Cars',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`}>
      <body className="bg-white text-stone-900 antialiased">
        <NavThemeProvider>
          <Nav />
          {children}
          <AudioPlayer />
        </NavThemeProvider>
      </body>
    </html>
  );
}
