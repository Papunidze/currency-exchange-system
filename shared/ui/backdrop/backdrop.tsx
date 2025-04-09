import { useEffect } from 'react';
import styles from './backdrop.module.scss';
import { cn } from '@app-shared/lib/utils';
import { BackdropProps } from './backdrop.interfaces';

/**
 * Backdrop component that provides an overlay effect with customizable opacity and blur
 */
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
  // Handle scroll locking when backdrop is open
  useEffect(() => {
    if (!disableScroll) return;

    const originalOverflow = document.body.style.overflow;

    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, disableScroll]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className={cn(
        styles.backdrop,
        blur && styles.blur,
        isOpen && styles.visible,
        className,
      )}
      onClick={onClick}
      style={
        {
          '--backdrop-opacity': `${opacity / 100}`,
          zIndex,
        } as React.CSSProperties
      }
    >
      <div className={styles.backdropContent}>
        {/* Prevent clicks on the content from bubbling up to the backdrop */}
        <div
          className={styles.contentWrapper}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

Backdrop.displayName = 'Backdrop';

export default Backdrop;
