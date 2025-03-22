'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SettingsIcon, SignOutIcon } from '@app-shared/icons';
import { Logo } from '@app-shared/components/media';
import { cn } from '@app-shared/lib/utils';
import { SideBarProps, NavItem } from './sidebar.interfaces';

import styles from './sidebar.module.scss';

const navigationItems: NavItem[] = [
  {
    label: 'Dashboard',
    icon: <SettingsIcon />,
    href: '/',
  },
  {
    label: 'Currency Rates',
    icon: <SettingsIcon />,
    href: '/rates',
  },
  {
    label: 'Transactions',
    icon: <SettingsIcon />,
    href: '/transactions',
  },
  {
    label: 'Settings',
    icon: <SettingsIcon />,
    href: '/settings',
  },
];

const SideBar: React.FC<SideBarProps> = ({
  isCollapsed,
  setIsCollapsed,
  isMobile = false,
}) => {
  const pathname = usePathname();
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

  useEffect(() => {
    if (isMobile) {
      setIsOverlayVisible(!isCollapsed);

      if (!isCollapsed) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    } else {
      setIsOverlayVisible(false);
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobile, isCollapsed]);

  const handleOverlayClick = () => {
    if (isMobile && !isCollapsed) {
      setIsCollapsed(true);
    }
  };

  const handleLogout = () => {
    console.log('Logout clicked');
  };

  return (
    <>
      {isOverlayVisible && (
        <div
          className={styles.overlay}
          onClick={handleOverlayClick}
          aria-hidden="true"
          data-testid="sidebar-overlay"
        />
      )}

      <nav
        className={cn(
          styles.sidebar,
          isCollapsed && styles.collapsed,
          isMobile && styles.mobile,
        )}
        aria-label="Main navigation"
        data-testid="sidebar"
      >
        <div className={styles.sidebarContainer}>
          <div className={styles.sidebarTop}>
            <Link href="/" className={styles.logoLink}>
              <Logo
                showText={!isCollapsed}
                size={isCollapsed ? 'sm' : 'md'}
                variant="primary"
              />
            </Link>
          </div>

          <div className={styles.sidebarNav}>
            <ul className={styles.navList}>
              {navigationItems.map((item) => (
                <li key={item.href} className={styles.navItem}>
                  <Link
                    href={item.href}
                    className={cn(
                      styles.navLink,
                      pathname === item.href && styles.active,
                    )}
                  >
                    <span className={styles.navIcon}>{item.icon}</span>
                    {!isCollapsed && (
                      <span className={styles.navLabel}>{item.label}</span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.sidebarBottom}>
            <button
              className={styles.logoutButton}
              onClick={handleLogout}
              aria-label="Logout"
            >
              <span className={styles.navIcon}>
                <SignOutIcon />
              </span>
              {!isCollapsed && <span className={styles.navLabel}>Logout</span>}
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default SideBar;
