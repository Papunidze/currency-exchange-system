'use client';

import React from 'react';
import { cn } from '@app-shared/lib/utils';
import { BaseLayoutProps } from './base-layout.interfaces';
import styles from './base-layout.module.scss';
import { TopBar } from '../topbar';

export const BaseLayout: React.FC<BaseLayoutProps> = ({
  children,
  header,
  footer,
  className,
  sidebar,
  showTopbar = true,
}) => {
  return (
    <div className={cn(styles.layout, className)}>
      {showTopbar && <TopBar />}

      <div className={styles.container}>
        {sidebar && <aside className={styles.sidebar}>{sidebar}</aside>}

        <main className={styles.main}>
          {header && <header className={styles.header}>{header}</header>}
          <div className={styles.content}>{children}</div>
          {footer && <footer className={styles.footer}>{footer}</footer>}
        </main>
      </div>
    </div>
  );
};
