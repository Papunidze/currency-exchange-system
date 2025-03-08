import { FC, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Backdrop } from '@app-shared/ui/backdrop';
import IconButton from '@app-shared/ui/iconButton';
import { cn } from '@app-shared/lib/utils';
import styles from './dialog.module.scss';
import { DialogProps } from './dialog.interfaces';

export const Dialog: FC<DialogProps> = ({
  isOpen,
  title,
  description,
  className,
  contentClassName,
  showClose = true,
  closeOnBackdrop = true,
  closeOnEscape = true,
  size = 'md',
  position = 'center',
  onClose,
  children,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && closeOnEscape) {
        onClose?.();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, closeOnEscape, onClose]);

  useEffect(() => {
    if (isOpen && dialogRef.current) {
      const focusableElements = dialogRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (focusableElements.length > 0) {
        (focusableElements[0] as HTMLElement).focus();
      }
    }
  }, [isOpen]);

  const dialog = (
    <Backdrop
      isOpen={isOpen}
      onClick={closeOnBackdrop ? onClose : undefined}
      blur
    >
      <div
        ref={dialogRef}
        className={cn(styles.dialog, styles[size], styles[position], className)}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'dialog-title' : undefined}
        aria-describedby={description ? 'dialog-description' : undefined}
        data-visible={isOpen}
      >
        <div
          className={cn(styles.content, contentClassName)}
          onClick={(e) => e.stopPropagation()}
        >
          {showClose && (
            <IconButton
              icon="X"
              className={styles.closeButton}
              onClick={onClose}
              aria-label="Close dialog"
              variant="ghost"
            />
          )}

          {title && (
            <h2 id="dialog-title" className={styles.title}>
              {title}
            </h2>
          )}

          {description && (
            <p id="dialog-description" className={styles.description}>
              {description}
            </p>
          )}

          <div className={styles.body}>{children}</div>
        </div>
      </div>
    </Backdrop>
  );

  return createPortal(dialog, document.body);
};
