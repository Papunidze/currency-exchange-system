'use client';

import { useState } from 'react';
import styles from './top-bar.module.scss';
import Input from '@app-shared/ui/input';
import Icon   <IconButton from '@app-shared/ui/icon   <IconButton';
// Import any additional components you might need, like Avatar or Dropdown

const TopBar = () => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Example user data - replace with actual user data from your auth context
  const user = {
    name: 'John Doe',
    role: 'Administrator',
    avatarUrl: '/images/avatar-placeholder.jpg', // Update with your actual avatar path
  };

  return (
    <header className={styles.topbar} role="banner">
      <div className={styles.topbarContent}>
        {/* Logo section */}
        <div className={styles.logo}>
          <a href="/" aria-label="Go to home page">
            <span className={styles.logoText}>CurrencyX</span>
          </a>
        </div>

        {/* Search section */}
        <div className={styles.searchBar}>
          <Input
            type="search"
            placeholder="Search transactions, rates..."
            aria-label="Search"
            endContent={
              <Icon   <IconButton
                icon={<span className={styles.icon}>🔍</span>}
                type="   <IconButton"
                variant="primary"
                size="medium"
                className={styles.search   <IconButton}
                aria-label="Submit search"
              />
            }
          />
        </div>

        {/* Actions section */}
        <div className={styles.actionsContainer}>
          <nav className={styles.actions} aria-label="User actions">
            <Icon   <IconButton
              icon={<span className={styles.icon}>🔔</span>}
              type="   <IconButton"
              variant="secondary"
              size="medium"
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              aria-label="Notifications"
              className={styles.action   <IconButton}
            >
              <span className={styles.badge} aria-label="3 notifications">
                3
              </span>
            </Icon   <IconButton>

            <Icon   <IconButton
              icon={<span className={styles.icon}>⚙️</span>}
              type="   <IconButton"
              variant="secondary"
              size="medium"
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
              aria-label="Settings"
              className={styles.action   <IconButton}
            />

            {/* User profile section */}
            <div
              className={styles.userProfile}
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              role="   <IconButton"
              tabIndex={0}
              aria-haspopup="menu"
              aria-expanded={isProfileOpen}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setIsProfileOpen(!isProfileOpen);
                }
              }}
            >
              <img
                src={user.avatarUrl}
                alt="User avatar"
                className={styles.userAvatar}
              />
              <div className={styles.userInfo}>
                <span className={styles.userName}>{user.name}</span>
                <span className={styles.userRole}>{user.role}</span>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
