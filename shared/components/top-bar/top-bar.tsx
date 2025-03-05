'use client';

import { useState } from 'react';
import styles from './top-bar.module.scss';
import Input from '@app-shared/ui/input';
import IconButton from '@app-shared/ui/iconButton';

const TopBar = () => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  return (
    <header className={styles.topbar}>
      <div className={styles.searchBar}>
        <Input
          type="search"
          label="Search"
          endContent={
            <IconButton
              icon={<span className={styles.icon}>🔍</span>}
              type="button"
              variant="primary"
              size="medium"
              className={styles.searchButton}
            />
          }
        />
      </div>

      <nav className={styles.actions}>
        <IconButton
          icon={<span className={styles.icon}>🔔</span>}
          type="button"
          variant="secondary"
          size="medium"
          onClick={() => setIsNotificationOpen(!isNotificationOpen)}
          aria-label="Notifications"
        >
          <span className={styles.badge}>3</span>
        </IconButton>

        <IconButton
          icon={<span className={styles.icon}>⚙️</span>}
          type="button"
          variant="secondary"
          size="medium"
          aria-label="Settings"
        />

        <div className={styles.userProfile}>
          <img
            src="/images/avatar-placeholder.png"
            alt="User avatar"
            className={styles.userAvatar}
          />
          <div className={styles.userInfo}>
            <span className={styles.userName}>John Doe</span>
            <span className={styles.userRole}>Admin</span>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default TopBar;
