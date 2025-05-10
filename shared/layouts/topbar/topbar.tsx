'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { MenuIcon, ChevronLeftIcon } from '@app-shared/icons';
import { TopBarProps } from './topbar.interfaces';
import Logo from '@app-shared/components/media/logo';
import { cn } from '@app-shared/lib/utils';
import styles from './topbar.module.scss';
import IconButton from '@app-shared/ui/iconButton';
import Link from 'next/link';
import Drawer from '@app-shared/ui/drawer';
import { Avatar } from '@app-shared/ui/avatar';
import Popover from '@app-shared/ui/popover';
import Button from '@app-shared/ui/button';

const NAV_ITEMS = [
  { label: 'Home', href: '/#home' },
  { label: 'Statistic', href: '/#statistic' },
  { label: 'History', href: '/#history' },
  { label: 'Contact', href: '/#contact' },
];

export const TopBar = ({ className, showUserMenu = true }: TopBarProps) => {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith('/dashboard');
  const isSidebarVisible = isDashboard;
  const isSidebarCollapsed = false;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSolid, setIsSolid] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const handleLogout = () => {
    console.log('Logout clicked');
  };

  const handleProfile = () => {
    console.log('Profile clicked');
  };

  const handleSettings = () => {
    console.log('Settings clicked');
  };

  useEffect(() => {
    const homeSection = document.getElementById('home');
    if (!homeSection) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsSolid(!entry.isIntersecting);
      },
      {
        threshold: 0,
        rootMargin: '-100px 0px 0px 0px',
      },
    );

    observerRef.current.observe(homeSection);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return (
    <header
      className={cn(
        styles.topbar,
        className,
        isSidebarVisible && styles.withSidebar,
        isSidebarCollapsed && styles.withSidebarCollapsed,
        isSolid ? styles.solid : '',
      )}
    >
      <div className={styles.leftSection}>
        <IconButton
          className={styles.mobileMenuButton}
          aria-label="Menu"
          icon={<MenuIcon />}
          variant="ghost"
          size="small"
          onClick={() => setIsMobileMenuOpen(true)}
        />
        <Link href="#home" className={styles.logoLink}>
          <Logo
            size="lg"
            showText={true}
            variant={isSolid ? 'primary' : 'light'}
          />
        </Link>
      </div>

      <nav className={styles.nav}>
        <ul className={styles.navList}>
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  styles.navLink,
                  pathname === item.href && styles.active,
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className={styles.rightSection}>
        {showUserMenu && (
          <Popover
            triggerElement={
              <Avatar src={`https://picsum.photos/seed/20/40/40`} />
            }
            triggerAriaLabel="Open user menu"
            placement="bottom-left"
            offset={8}
            variant="outlined"
            autoFocus={false}
            trapFocus={false}
          >
            <div className={styles.userMenuContent}>
              <div className={styles.menuItems}>
                <Button
                  variant="ghost"
                  onClick={handleProfile}
                  className={styles.menuItem}
                >
                  Profile
                </Button>
                <Button
                  variant="ghost"
                  onClick={handleSettings}
                  className={styles.menuItem}
                >
                  Settings
                </Button>
                <hr className={styles.userMenuDivider} />
                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className={styles.menuItem}
                >
                  Logout
                </Button>
              </div>
            </div>
          </Popover>
        )}
      </div>

      <Drawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        placement="left"
      >
        <div className={styles.mobileMenuContent}>
          <div className={styles.mobileMenuHeader}>
            <Logo size="md" showText={true} variant="primary" />
            <IconButton
              className={styles.closeButton}
              aria-label="Close menu"
              icon={<ChevronLeftIcon />}
              variant="ghost"
              size="small"
              onClick={() => setIsMobileMenuOpen(false)}
            />
          </div>
          <nav className={styles.mobileNav}>
            <ul className={styles.mobileNavList}>
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      styles.mobileNavLink,
                      pathname === item.href && styles.active,
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Drawer>
    </header>
  );
};
