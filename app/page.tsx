import { Metadata } from 'next';
import React, { JSX } from 'react';

import Contact from './contact/contact';
import History from './history/history';
import Home from './home/home';
import styles from './page.module.scss';
import Statistic from './statistic/statistic';
import { TopBar } from '@app-shared/layouts';

export const metadata: Metadata = {
  title:
    'Smart Kiosk Management System | Automated Currency Exchange Solutions',
  description:
    'Streamline your currency exchange kiosk operations with automated calculations, profit tracking, and market analytics. Perfect for kiosk owners looking to optimize their business.',
  keywords: [
    'currency exchange kiosk',
    'kiosk management system',
    'exchange rate calculator',
    'profit tracking',
    'VAT calculation',
    'kiosk accounting',
    'market analytics',
    'exchange rate impact',
    'daily profit report',
    'kiosk automation',
  ],
  openGraph: {
    title:
      'Smart Kiosk Management System | Automated Currency Exchange Solutions',
    description:
      'Streamline your currency exchange kiosk operations with automated calculations, profit tracking, and market analytics.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Smart Kiosk Management System',
  },
  twitter: {
    card: 'summary_large_image',
    title:
      'Smart Kiosk Management System | Automated Currency Exchange Solutions',
    description:
      'Streamline your currency exchange kiosk operations with automated calculations, profit tracking, and market analytics.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function HomePage(): JSX.Element {
  return (
    <React.Fragment>
      <TopBar />
      <section className={styles.main}>
        <section id="home" className={styles.section} aria-label="Home">
          <Home />
        </section>
        <section
          id="statistic"
          className={styles.section}
          aria-label="Statistics"
        >
          <Statistic />
        </section>
        <section id="history" className={styles.section} aria-label="History">
          <History />
        </section>
        <section id="contact" className={styles.section} aria-label="Contact">
          <Contact />
        </section>
      </section>
    </React.Fragment>
  );
}
