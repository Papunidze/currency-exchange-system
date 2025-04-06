import React, { JSX, ReactNode } from 'react';

import styles from './legal.module.scss';

interface LegalLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

const LegalLayout = ({
  children,
  title,
  subtitle,
}: LegalLayoutProps): JSX.Element => {
  return (
    <div className={styles.legalLayout}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1>{title}</h1>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </header>

        <div className={styles.legalContent}>{children}</div>
      </div>
    </div>
  );
};

export default LegalLayout;
