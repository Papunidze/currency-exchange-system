'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '@app-shared/components/logo';
import Button from '@app-shared/ui/button';
import IconButton from '@app-shared/ui/iconButton';
import styles from './top-bar.module.scss';

const TopBar = () => {
  const pathname = usePathname();
  const isSignedIn = true;

  return (
    <header className={styles.topBar}>
      <div className={styles.topBarContainer}>
        <div className={styles.logoSection}>
          <Link href="/" className={styles.logoLink}>
            <Logo size="sm" variant="primary" />
          </Link>
        </div>

        <nav className={styles.navLinks}>
          <ul>
            <li className={pathname === '/' ? styles.active : ''}>
              <Link href="/">Home</Link>
            </li>
            <li className={pathname === '/rates' ? styles.active : ''}>
              <Link href="/rates">Exchange Rates</Link>
            </li>
            <li className={pathname === '/about' ? styles.active : ''}>
              <Link href="/about">About</Link>
            </li>
            <li className={pathname === '/contact' ? styles.active : ''}>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </nav>

        <div className={styles.actions}>
          {isSignedIn ? (
            <>
              <IconButton
                icon={<span className="icon-bell" />}
                variant="ghost"
                aria-label="Notifications"
              />
              <IconButton
                icon={<span className="icon-user" />}
                variant="ghost"
                aria-label="User profile"
              />
            </>
          ) : (
            <>
              <Link href="/auth/signin">
                <Button variant="outlined" size="small">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button variant="primary" size="small">
                  Create Account
                </Button>
              </Link>
            </>
          )}

          <IconButton
            icon={<span className="icon-menu" />}
            variant="ghost"
            className={styles.mobileMenuButton}
            aria-label="Menu"
          />
        </div>
      </div>
    </header>
  );
};

export default TopBar;
