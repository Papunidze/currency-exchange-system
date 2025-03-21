import { FC, useEffect } from 'react';
import styles from './backdrop.module.scss';
import { cn } from '@app-shared/lib/utils';
import { BackdropProps } from './backdrop.interfaces';

const Backdrop = ({
  isOpen = false,
  className,
  opacity = 50,
  blur = false,
  disableScroll = true,
  onClick,
  zIndex = 50,
  children,
}: BackdropProps) => {
  useEffect(() => {
    if (disableScroll) {
      if (isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }

    return () => {
      if (disableScroll) {
        document.body.style.overflow = '';
      }
    };
  }, [isOpen, disableScroll]);

  if (!isOpen) return null;

  return (
    <div
      className={cn(
        styles.backdrop,
        blur && styles.blur,
        isOpen && styles.visible,
        className,
      )}
      onClick={onClick}
      style={
        {
          '--backdrop-opacity': opacity / 100,
          zIndex,
        } as React.CSSProperties
      }
      aria-hidden="true"
    >
      <div
        className={styles.backdropContent}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

Backdrop.displayName = 'Backdrop';

export default Backdrop;
