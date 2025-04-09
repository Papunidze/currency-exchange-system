import React, { memo, useState, useCallback } from 'react';
import Popover from '../popover';
import Button from '../button';
import styles from './user-menu.module.scss';
import { cn } from '@app-shared/lib/utils';
import { ChevronDownIcon } from '@app-shared/icons';

interface UserMenuProps {
  username?: string;
  email?: string;
  avatar?: string;
  onLogout?: () => void;
  onProfile?: () => void;
  onSettings?: () => void;
  className?: string;
}

// Use memo to prevent unnecessary re-renders
export const UserMenu = memo<UserMenuProps>(
  ({ username, email, avatar, onLogout, onProfile, onSettings, className }) => {
    const [isOpen, setIsOpen] = useState(false);

    // Combine all handlers into a single function that accepts an action
    const handleAction = useCallback((action?: () => void) => {
      action?.();
      setIsOpen(false);
    }, []);

    // Using single toggle function instead of separate open/close functions
    const toggleMenu = useCallback(() => {
      setIsOpen((prev) => !prev);
    }, []);

    return (
      <div className={cn(styles.userMenu, className)}>
        <Popover
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          triggerElement={
            <button
              className={styles.trigger}
              onClick={toggleMenu}
              aria-label={`User menu for ${username}`}
              aria-haspopup="true"
            >
              <div className={styles.avatar}>
                {avatar ? (
                  <img src={avatar} alt={username || 'User avatar'} />
                ) : (
                  <span>{username?.[0]?.toUpperCase() || 'U'}</span>
                )}
                <ChevronDownIcon
                  size="md"
                  className={styles.chevron}
                  color="var(--text-color-primary)"
                />
              </div>
            </button>
          }
          placement="bottom"
          variant="outlined"
        >
          <div className={styles.menuContent}>
            {username && (
              <div className={styles.userInfo}>
                <div className={styles.avatar}>
                  {avatar ? (
                    <img src={avatar} alt={username} />
                  ) : (
                    <span>{username[0].toUpperCase()}</span>
                  )}
                </div>
                <div className={styles.details}>
                  <div className={styles.username}>{username}</div>
                  {email && <div className={styles.email}>{email}</div>}
                </div>
              </div>
            )}
            <div className={styles.menuItems}>
              <Button
                variant="ghost"
                fullWidth
                onClick={() => handleAction(onProfile)}
                className={styles.menuItem}
              >
                Profile
              </Button>
              <Button
                variant="ghost"
                fullWidth
                onClick={() => handleAction(onSettings)}
                className={styles.menuItem}
              >
                Settings
              </Button>
              <Button
                variant="ghost"
                fullWidth
                onClick={() => handleAction(onLogout)}
                className={styles.menuItem}
              >
                Logout
              </Button>
            </div>
          </div>
        </Popover>
      </div>
    );
  },
);
