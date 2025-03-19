'use client';

import React, { useState } from 'react';
import styles from './top-bar.module.scss';
import IconButton from '@app-shared/ui/iconButton';
import { SearchIcon, BellIcon, UserIcon } from '@app-shared/icons';

interface TopBarProps {
  userName?: string;
  isSidebarCollapsed?: boolean;
}

const TopBar: React.FC<TopBarProps> = ({
  userName = 'Guest',
  isSidebarCollapsed = false,
}) => {
  const [searchValue, setSearchValue] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Get greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    setShowUserMenu(false);
  };

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
    setShowNotifications(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchValue);
  };

  return (
    <header
      className={`${styles.topBar} ${isSidebarCollapsed ? styles.sidebarCollapsed : ''}`}
    >
      <div className={styles.greeting}>
        <h2>
          {getGreeting()}, <span className={styles.userName}>{userName}</span>
        </h2>
      </div>

      <div className={styles.actions}>
        <form onSubmit={handleSearch} className={styles.searchForm}>
          <div className={styles.searchInputWrapper}>
            <input
              type="text"
              placeholder="Search..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className={styles.searchInput}
            />
            <button type="submit" className={styles.searchButton}>
              <SearchIcon size="sm" />
            </button>
          </div>
        </form>

        <div className={styles.iconButtons}>
          <div className={styles.iconButtonWrapper}>
            <IconButton
              icon={<BellIcon />}
              variant="ghost"
              size="small"
              ariaLabel="Notifications"
              onClick={toggleNotifications}
              className={showNotifications ? styles.active : ''}
            />
            {/* Notification Badge */}
            <span className={styles.notificationBadge}>3</span>

            {/* Notification dropdown */}
            {showNotifications && (
              <div className={styles.dropdown}>
                <div className={styles.dropdownHeader}>
                  <h3>Notifications</h3>
                  <button className={styles.markAsRead}>
                    Mark all as read
                  </button>
                </div>
                <ul className={styles.notificationList}>
                  <li className={styles.notification}>
                    <div className={styles.notificationDot} />
                    <div className={styles.notificationContent}>
                      <p>Your wallet has been updated</p>
                      <span className={styles.notificationTime}>
                        2 mins ago
                      </span>
                    </div>
                  </li>
                  <li className={styles.notification}>
                    <div className={styles.notificationDot} />
                    <div className={styles.notificationContent}>
                      <p>New exchange rate available</p>
                      <span className={styles.notificationTime}>
                        1 hour ago
                      </span>
                    </div>
                  </li>
                  <li className={styles.notification}>
                    <div className={styles.notificationDot} />
                    <div className={styles.notificationContent}>
                      <p>Transaction completed successfully</p>
                      <span className={styles.notificationTime}>
                        3 hours ago
                      </span>
                    </div>
                  </li>
                </ul>
                <div className={styles.dropdownFooter}>
                  <a href="/notifications">View all notifications</a>
                </div>
              </div>
            )}
          </div>

          <div className={styles.iconButtonWrapper}>
            <IconButton
              icon={<UserIcon />}
              variant="ghost"
              size="small"
              ariaLabel="User menu"
              onClick={toggleUserMenu}
              className={showUserMenu ? styles.active : ''}
            />

            {/* User menu dropdown */}
            {showUserMenu && (
              <div className={styles.dropdown}>
                <div className={styles.userInfo}>
                  <div className={styles.userAvatar}>
                    {userName.charAt(0).toUpperCase()}
                  </div>
                  <div className={styles.userDetails}>
                    <h4>{userName}</h4>
                    <p>user@example.com</p>
                  </div>
                </div>
                <ul className={styles.userMenuList}>
                  <li>
                    <a href="/profile">Profile</a>
                  </li>
                  <li>
                    <a href="/settings">Settings</a>
                  </li>
                  <li>
                    <button onClick={() => console.log('Logout')}>
                      Sign out
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
