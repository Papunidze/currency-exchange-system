import React, { useState, useEffect } from 'react';
import { cn } from '@app-shared/lib/utils';
import Backdrop from '@app-ui/backdrop';
import styles from './drawer.module.scss';
import { DrawerProps } from './drawer.interfaces';

export const Drawer: React.FC<DrawerProps> = ({
  children,
  className,
  isOpen,
  onClose,
  placement = 'left',
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <Backdrop isOpen={isOpen} onClick={onClose} disableScroll />
      <div
        className={cn(
          styles.drawer,
          styles[placement],
          isOpen && styles.visible,
          className,
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Drawer"
      >
        <div className={styles.content}>{children}</div>
      </div>
    </>
  );
};

Drawer.displayName = 'Drawer';

export default Drawer;
