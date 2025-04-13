import type { Metadata, Viewport } from 'next';
import { Inter, Poppins, Roboto, Roboto_Mono } from 'next/font/google';
import localFont from 'next/font/local';
import Link from 'next/link';
import { JSX } from 'react';

import { Preconnect } from '@app-shared/components/preconnect';

import 'styles/main.scss';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
  weight: ['300', '400', '500', '700'],
});

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  preload: true,
  weight: ['300', '400', '500', '700'],
});

const roboto = Roboto({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
  preload: true,
  weight: ['300', '400', '500', '700'],
});

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
  preload: true,
  weight: ['400', '500', '700'],
});

const satoshi = localFont({
  src: [
    {
      path: '../public/fonts/Satoshi-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/Satoshi-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/Satoshi-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/Satoshi-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-satoshi',
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: 'Currency Exchange System - Fast & Secure Currency Conversion',
    template: '%s | Currency Exchange System',
  },
  description:
    'Secure, fast and reliable currency exchange platform with real-time rates, multi-currency support, and user-friendly interface.',
  keywords: [
    'currency exchange',
    'forex',
    'money transfer',
    'exchange rates',
    'currency converter',
  ],
  authors: [{ name: 'CurrencyX' }],
  creator: 'CurrencyX',
  publisher: 'CurrencyX',
  formatDetection: {
    telephone: false,
  },
  metadataBase: new URL('https://currency-exchange-system.web.app/'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'fr-FR': '/fr-FR',
    },
  },
  openGraph: {
    title: 'Currency Exchange System',
    description: 'Secure, fast and reliable currency exchange platform',
    url: 'https://currency-exchange-system.web.app/',
    siteName: 'Currency Exchange System',
    images: [
      {
        url: 'https://currency-exchange-system.web.app//og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Currency Exchange System',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Currency Exchange System',
    description: 'Secure, fast and reliable currency exchange platform',
    images: ['https://currency-exchange-system.web.app//twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html
      lang="en"
      className={`
        ${inter.variable} 
        ${poppins.variable} 
        ${roboto.variable} 
        ${robotoMono.variable}
        ${satoshi.variable}
      `}
    >
      <head>
        <Preconnect />
      </head>
      <body>
        <Link href="/" className="skip-link">
          Skip to main content
        </Link>
        <div className="main-layout">
          <main id="main-content" role="main">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
