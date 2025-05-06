import { Metadata } from 'next';
import { JSX } from 'react';

import Contact from './contact/contact';
import History from './history/history';
import Home from './home/home';
import styles from './page.module.scss';
import Statistic from './statistic/statistic';

export const metadata: Metadata = {
  title: 'Home - Fast & Secure Currency Exchange',
  description:
    'Exchange currencies securely with real-time rates and minimal fees. Quick transfers, multiple payment methods, and 24/7 customer support.',
  keywords: ['currency exchange', 'home', 'exchange rates', 'forex'],
};

export default function HomePage(): JSX.Element {
  return (
    <main className={styles.main}>
      <section id="home" className={styles.section}>
        <Home />
      </section>
      <section id="statistic" className={styles.section}>
        <Statistic />
      </section>
      <section id="history" className={styles.section}>
        <History />
      </section>
      <section id="contact" className={styles.section}>
        <Contact />
      </section>
    </main>
  );
}
