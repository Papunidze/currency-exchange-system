import React from 'react';
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

export const UserMenu: React.FC<UserMenuProps> = ({
  username,
  email,
  avatar,
  onLogout,
  onProfile,
  onSettings,
  className,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleLogout = () => {
    onLogout?.();
    handleClose();
  };

  const handleProfile = () => {
    onProfile?.();
    handleClose();
  };

  const handleSettings = () => {
    onSettings?.();
    handleClose();
  };

  return (
    <div className={cn(styles.userMenu, className)}>
      <Popover
        isOpen={isOpen}
        onClose={handleClose}
        triggerElement={
          <button
            className={styles.trigger}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="User menu"
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
              onClick={handleProfile}
              className={styles.menuItem}
            >
              Profile
            </Button>
            <Button
              variant="ghost"
              fullWidth
              onClick={handleSettings}
              className={styles.menuItem}
            >
              Settings
            </Button>
            <Button
              variant="ghost"
              fullWidth
              onClick={handleLogout}
              className={styles.menuItem}
            >
              Logout
            </Button>
          </div>
        </div>
      </Popover>
    </div>
  );
};
