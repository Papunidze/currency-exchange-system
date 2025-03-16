import type { Metadata, Viewport } from 'next';
import { Inter, Open_Sans } from 'next/font/google';
import 'styles/main.scss';

// Configure fonts
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const openSans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-open-sans',
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
  authors: [{ name: 'Your Company Name' }],
  creator: 'Your Company Name',
  publisher: 'Your Company Name',
  formatDetection: {
    telephone: false,
  },
  metadataBase: new URL('https://your-domain.com'),
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
    url: 'https://your-domain.com',
    siteName: 'Currency Exchange System',
    images: [
      {
        url: 'https://your-domain.com/og-image.jpg',
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
    images: ['https://your-domain.com/twitter-image.jpg'],
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
}) {
  return (
    <html lang="en" className={`${inter.variable} ${openSans.variable}`}>
      <body>
        <div className="main-layout">
          <main id="main-content" role="main">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
