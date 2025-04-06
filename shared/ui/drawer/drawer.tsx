import React from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@app-shared/lib/utils';
import styles from './drawer.module.scss';
import Backdrop from '@app-ui/backdrop';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  placement?: 'left' | 'right';
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  children,
  className,
  placement = 'left',
}) => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <>
      <Backdrop isOpen={isOpen} onClick={onClose} />
      <div
        className={cn(
          styles.drawer,
          isOpen && styles.open,
          styles[placement],
          className,
        )}
      >
        <div className={styles.content}>{children}</div>
      </div>
    </>,
    document.body,
  );
};
