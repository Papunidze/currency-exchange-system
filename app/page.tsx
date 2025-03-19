import TopBar from '@app-layout/top-bar';
import SideBar from '@app-layout/side-bar';
import styles from './page.module.scss';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home - Fast & Secure Currency Exchange',
  description:
    'Exchange currencies securely with real-time rates and minimal fees. Quick transfers, multiple payment methods, and 24/7 customer support.',
  keywords: ['currency exchange', 'home', 'exchange rates', 'forex'],
};

export default function Home() {
  return (
    <div className={styles.container}>
      <TopBar userName="Giga" />
      <div className={styles.content}>
        <div className={styles.dashboardLayout}>
          <SideBar />
        </div>
        <section className={styles.mainSection}>
          <div className={styles.hero}>
            <h1>Fast & Secure Currency Exchange</h1>
            <p>Exchange currencies with real-time rates and low fees.</p>

            <div className={styles.converterCard}>
              <h2>Quick Currency Converter</h2>
              <div className={styles.exchangeForm}></div>
            </div>
          </div>

          <section
            aria-labelledby="features-heading"
            className={styles.features}
          >
            <h2 id="features-heading" className={styles.sectionTitle}>
              Our Features
            </h2>

            <div className={styles.featureGrid}>
              <article className={styles.featureCard}>
                <div className={styles.iconWrapper}>{/* Icon */}</div>
                <h3>Real-Time Rates</h3>
                <p>
                  Get the most competitive exchange rates updated in real-time.
                </p>
              </article>

              <article className={styles.featureCard}>
                <div className={styles.iconWrapper}>{/* Icon */}</div>
                <h3>Secure Transactions</h3>
                <p>
                  Advanced encryption and security protocols to protect your
                  money.
                </p>
              </article>

              <article className={styles.featureCard}>
                <div className={styles.iconWrapper}>{/* Icon */}</div>
                <h3>Low Fees</h3>
                <p>Transparent fee structure with no hidden costs.</p>
              </article>
            </div>
          </section>

          <section
            aria-labelledby="market-heading"
            className={styles.marketOverview}
          >
            <h2 id="market-heading" className={styles.sectionTitle}>
              Market Overview
            </h2>
          </section>
        </section>
      </div>
    </div>
  );
}
