import React, { ReactNode } from 'react';
import styles from './auth.module.scss';
import Logo from '@app-components/logo';

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  showLogo?: boolean;
}

export default function AuthLayout({
  children,
  title,
  subtitle,
  showLogo = true,
}: AuthLayoutProps) {
  return (
    <div className={styles.authWrapper}>
      <div className={styles.authContainer}>
        {showLogo && (
          <div className={styles.logoContainer}>
            <Logo size="md" variant="primary" text="CurrencyX" />
          </div>
        )}

        <div className={styles.authHeader}>
          <h1 className={styles.authTitle}>{title}</h1>
          {subtitle && <p className={styles.authSubtitle}>{subtitle}</p>}
        </div>

        <div className={styles.authContent}>{children}</div>

        <div className={styles.authFooter}>
          <p className={styles.copyright}>
            &copy; {new Date().getFullYear()} Currency Exchange System. All
            rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
