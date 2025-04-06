import { TopBar } from '@app-shared/layouts/topbar';
import { Metadata } from 'next';
import { JSX } from 'react';
import styles from './page.module.scss';
import { ExchangeIcon, SettingsIcon } from '@app-shared/icons';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Home - Fast & Secure Currency Exchange',
  description:
    'Exchange currencies securely with real-time rates and minimal fees. Quick transfers, multiple payment methods, and 24/7 customer support.',
  keywords: ['currency exchange', 'home', 'exchange rates', 'forex'],
};

const FEATURES = [
  {
    icon: <ExchangeIcon />,
    title: 'Fast Exchange',
    description: 'Instant currency conversion with real-time rates',
  },
  {
    icon: <ExchangeIcon />,
    title: 'Transaction History',
    description: 'Track all your past exchanges and transfers',
  },
  {
    icon: <SettingsIcon />,
    title: 'Easy Management',
    description: 'Manage your account and preferences easily',
  },
];

export default function Home(): JSX.Element {
  return (
    <div className={styles.page}>
      <TopBar />

      <main className={styles.main}>
        <section className={styles.hero}>
          <h1 className={styles.title}>
            Fast & Secure
            <br />
            <span className={styles.highlight}>Currency Exchange</span>
          </h1>
          <p className={styles.description}>
            Exchange currencies securely with real-time rates and minimal fees.
            Quick transfers, multiple payment methods, and 24/7 customer
            support.
          </p>
          <Link href="/exchange" className={styles.ctaButton}>
            Start Exchange
          </Link>
        </section>

        <section className={styles.features}>
          {FEATURES.map((feature, index) => (
            <div key={index} className={styles.featureCard}>
              <div className={styles.featureIcon}>{feature.icon}</div>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDescription}>{feature.description}</p>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
