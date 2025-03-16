'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '@app-shared/components/logo';
import {
  HomeIcon,
  WalletIcon,
  TransactionsIcon,
  ChartIcon,
  ExchangeIcon,
  CurrencyIcon,
  SettingsIcon,
  SignOutIcon,
} from '@app-shared/icons';
import { cn } from '@app-shared/lib/utils';
import styles from './side-bar.module.scss';

interface NavItem {
  href: string;
  icon: React.ReactNode;
  label: string;
  group?: string;
}

const NAV_ITEMS: NavItem[] = [
  { href: '/', icon: <HomeIcon />, label: 'Home', group: 'main' },
  { href: '/wallet', icon: <WalletIcon />, label: 'Wallet', group: 'main' },
  {
    href: '/transactions',
    icon: <TransactionsIcon />,
    label: 'Transactions',
    group: 'main',
  },
  {
    href: '/rates',
    icon: <ChartIcon />,
    label: 'Current Rates',
    group: 'finance',
  },
  {
    href: '/exchange',
    icon: <ExchangeIcon />,
    label: 'Exchange',
    group: 'finance',
  },
  {
    href: '/valutes',
    icon: <CurrencyIcon />,
    label: 'Valutes',
    group: 'finance',
  },
  {
    href: '/settings',
    icon: <SettingsIcon />,
    label: 'Settings',
    group: 'system',
  },
];

export default function SideBar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Handle responsive behavior
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsCollapsed(true);
      }
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  useEffect(() => {
    if (isMobile) {
      setIsOpen(false);
    }
  }, [pathname, isMobile]);

  const navGroups = NAV_ITEMS.reduce(
    (groups, item) => {
      const group = item.group || 'other';
      return {
        ...groups,
        [group]: [...(groups[group] || []), item],
      };
    },
    {} as Record<string, NavItem[]>,
  );

  const toggleSidebar = () => {
    if (isMobile) {
      setIsOpen(!isOpen);
    } else {
      setIsCollapsed(!isCollapsed);
    }
  };

  return (
    <>
      {isMobile && (
        <button
          className={cn(styles.mobileToggle, isOpen && styles.active)}
          onClick={toggleSidebar}
          aria-label="Toggle navigation"
        >
          <span className={styles.hamburgerIcon}></span>
        </button>
      )}

      {isMobile && isOpen && (
        <div className={styles.overlay} onClick={() => setIsOpen(false)} />
      )}

      <aside
        className={cn(
          styles.sidebar,
          isCollapsed && styles.collapsed,
          isMobile && styles.mobile,
          isOpen && styles.open,
        )}
        aria-label="Main navigation"
      >
        <div className={styles.sidebarHeader}>
          <Logo
            size={isCollapsed && !isOpen ? 'sm' : 'md'}
            showText={!isCollapsed || (isMobile && isOpen)}
            variant="primary"
            className={styles.logo}
          />

          {!isMobile && (
            <button
              className={styles.collapseButton}
              onClick={toggleSidebar}
              aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d={isCollapsed ? 'M6 2L11 8L6 14' : 'M10 2L5 8L10 14'}
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          )}
        </div>

        <nav className={styles.nav}>
          {Object.entries(navGroups).map(([group, items]) => (
            <div key={group} className={styles.navGroup}>
              {!isCollapsed && (
                <h3 className={styles.groupTitle}>
                  {group.charAt(0).toUpperCase() + group.slice(1)}
                </h3>
              )}
              <ul className={styles.navList}>
                {items.map((item) => (
                  <li key={item.href} className={styles.navItem}>
                    <Link
                      href={item.href}
                      className={cn(
                        styles.navLink,
                        pathname === item.href && styles.active,
                      )}
                      aria-label={item.label}
                      title={item.label}
                    >
                      <span className={styles.navIcon}>{item.icon}</span>
                      {(!isCollapsed || (isMobile && isOpen)) && (
                        <span className={styles.navLabel}>{item.label}</span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className={styles.sidebarFooter}>
          <Link
            href="/auth/signout"
            className={styles.signOutButton}
            aria-label="Sign out"
            title="Sign out"
          >
            <span className={styles.navIcon}>
              <SignOutIcon />
            </span>
            {(!isCollapsed || (isMobile && isOpen)) && (
              <span className={styles.navLabel}>Sign out</span>
            )}
          </Link>
        </div>
      </aside>
    </>
  );
}
