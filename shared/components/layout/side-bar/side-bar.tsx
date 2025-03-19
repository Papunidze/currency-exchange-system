'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './side-bar.module.scss';
import Logo from '@app-shared/components/logo';
import IconButton from '@app-shared/ui/iconButton';
import { navigationItems } from './navbar-items';
import { SignOutIcon } from '@app-shared/icons';

const SideBar: React.FC = () => {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const isMobileView = window.innerWidth <= 768;
      setIsMobile(isMobileView);
      if (isMobileView && !isMobile) {
        setIsCollapsed(true);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [isMobile]);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const ToggleIcon = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: isCollapsed ? 'rotate(180deg)' : 'none' }}
    >
      <path
        d="M10 3L5 8L10 13"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <>
      <aside
        className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ''} ${isMobile ? styles.mobile : ''}`}
        aria-label="Main navigation"
        role="navigation"
      >
        <div className={styles.sidebarHeader}>
          <div className={styles.logoWrapper}>
            <Logo
              direction="row"
              size={isCollapsed ? 'sm' : 'md'}
              showText={!isCollapsed}
              variant="primary"
            />
          </div>
        </div>

        <nav className={styles.navigation}>
          {navigationItems.map((group) => (
            <div key={group.group} className={styles.navGroup}>
              {!isCollapsed && (
                <h2 className={styles.groupTitle}>{group.group}</h2>
              )}
              <ul className={styles.navList}>
                {group.items.map((item, itemIndex) => (
                  <li
                    key={`${group.group}-${itemIndex}`}
                    className={styles.navItem}
                  >
                    <Link
                      href={item.href}
                      className={`${styles.navLink} ${pathname === item.href ? styles.active : ''}`}
                      aria-label={item.ariaLabel}
                      aria-current={pathname === item.href ? 'page' : undefined}
                    >
                      <span
                        className={`${styles.navIcon} ${isCollapsed && pathname === item.href ? styles.activeIcon : ''}`}
                        aria-hidden="true"
                      >
                        {item.icon}
                      </span>
                      {!isCollapsed && (
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
          <button
            className={styles.logoutButton}
            onClick={() => console.log('Logout')}
            aria-label="Sign out of your account"
          >
            <span
              className={`${styles.navIcon} ${isCollapsed ? styles.centeredIcon : ''}`}
              aria-hidden="true"
            >
              <SignOutIcon />
            </span>
            {!isCollapsed && <span className={styles.navLabel}>Log Out</span>}
          </button>
        </div>
      </aside>

      <div className={styles.toggleButtonWrapper}>
        <IconButton
          icon={<ToggleIcon />}
          onClick={toggleSidebar}
          variant="ghost"
          size="small"
          className={styles.toggleButton}
          ariaLabel={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        />
      </div>
    </>
  );
};

export default SideBar;
