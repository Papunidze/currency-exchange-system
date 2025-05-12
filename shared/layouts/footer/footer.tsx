'use client';

import React, { JSX } from 'react';
import Link from 'next/link';
import styles from './footer.module.scss';
import { Image } from '@app-shared/components/media';

const Footer = (): JSX.Element => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.copyright}>
          © {currentYear} Currency Exchange System. All rights reserved.
        </div>
        <nav className={styles.nav}>
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/terms-of-service">Terms of Service</Link>
        </nav>
        <div className={styles.socialMedia}>
          <Image imageKey="social:facebook" alt="Facebook" />
          <Image imageKey="social:twitter" alt="Twitter" />
          <Image imageKey="social:instagram" alt="Instagram" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
