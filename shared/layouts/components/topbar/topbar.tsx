'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BellIcon, SettingsIcon, MenuIcon, UserIcon } from '@app-shared/icons';
import IconButton from '@app-shared/ui/iconButton';

import styles from './topbar.module.scss';
import Popover from '@app-shared/ui/popover';

interface TopBarProps {
  userName?: string;
  isSidebarCollapsed?: boolean;
  onMenuClick?: () => void;
}

const TopBar = ({
  userName = 'User',
  isSidebarCollapsed = false,
  onMenuClick,
}: TopBarProps) => {
  const [showNotifications, setShowNotifications] = useState(false);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <header
      className={`${styles.topBar} ${isSidebarCollapsed ? styles.sidebarCollapsed : ''}`}
      role="banner"
    >
      <div className={styles.topBarContainer}>
        <div className={styles.leftSection}>
          <IconButton
            icon={<MenuIcon />}
            variant="ghost"
            className={`${styles.sidebarToggle} ${isSidebarCollapsed ? styles.collapsed : ''}`}
            onClick={onMenuClick}
            aria-label={
              isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'
            }
            aria-expanded={!isSidebarCollapsed}
          />
          <div className={styles.greeting}>
            <h1 className={styles.greetingText}>
              {getGreeting()},{' '}
              <span className={styles.userName}>{userName}</span>
            </h1>
          </div>
        </div>

        <nav className={styles.iconButtons} aria-label="User menu">
          <Popover
            content={
              <div className={styles.popoverContent}>
                <div className={styles.popoverHeader}>
                  <h2 className={styles.popoverTitle}>Notifications</h2>
                  <button className={styles.markAllRead}>
                    Mark all as read
                  </button>
                </div>

                <ul className={styles.notificationList}>
                  <li className={styles.notificationItem}>
                    <div className={styles.notificationDot} />
                    <div className={styles.notificationContent}>
                      <p>New exchange rate updated</p>
                      <span className={styles.notificationTime}>
                        2 mins ago
                      </span>
                    </div>
                  </li>
                  <li className={styles.notificationItem}>
                    <div className={styles.notificationDot} />
                    <div className={styles.notificationContent}>
                      <p>Transaction completed</p>
                      <span className={styles.notificationTime}>
                        1 hour ago
                      </span>
                    </div>
                  </li>
                </ul>

                <div className={styles.popoverFooter}>
                  <Link href="/notifications" className={styles.viewAllLink}>
                    View all notifications
                  </Link>
                </div>
              </div>
            }
            isOpen={showNotifications}
            onOpenChange={setShowNotifications}
            trigger="click"
          >
            <div className={styles.iconWrapper}>
              <IconButton
                icon={<BellIcon />}
                variant="ghost"
                size="small"
                ariaLabel="Notifications"
                className={showNotifications ? styles.active : ''}
              />
              <span
                className={styles.notificationBadge}
                aria-label="3 unread notifications"
              >
                3
              </span>
            </div>
          </Popover>
          <div className={styles.rightSection}>
            <Link href="/settings" className={styles.iconWrapper}>
              <IconButton
                icon={<SettingsIcon />}
                variant="ghost"
                size="small"
                ariaLabel="Settings"
              />
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default TopBar;
