import React, { JSX } from 'react';

import { Image } from '@app-shared/components/media';
import Button from '@app-shared/ui/button';

import styles from './home.module.scss';

const HomeContent = (): JSX.Element => {
  return (
    <section className={styles.homeContainer} aria-label="Hero section">
      <div className={styles.homeContent}>
        <div className={styles.textContent}>
          <h1 className={styles.title}>
            <span className={styles.highlight}>Smart Kiosk</span>
            <span className={styles.highlight_subtitle}>Management System</span>
          </h1>
          <p className={styles.subtitle}>
            Streamline your currency exchange kiosk operations with real-time
            calculations and automated accounting
          </p>
          <p className={styles.description}>
            Designed specifically for kiosk owners, our platform automates
            exchange calculations, tracks profits, manages VAT, and provides
            detailed analytics to optimize your business.
          </p>
          <div className={styles.ctaButtons}>
            <Button variant="primary" size="large">
              Start Free Trial
            </Button>
          </div>
        </div>
        <div className={styles.imageContainer}>
          <Image imageKey="banner:kiosky" alt="hero" />
        </div>
      </div>

      <div className={styles.statsSection}>
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <span className={styles.statNumber}>500+</span>
            <span className={styles.statLabel}>Active Kiosks</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statNumber}>$2M+</span>
            <span className={styles.statLabel}>Daily Transactions</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statNumber}>99.9%</span>
            <span className={styles.statLabel}>Uptime</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeContent;
