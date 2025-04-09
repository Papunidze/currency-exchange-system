import { forwardRef, memo } from 'react';
import styles from './icon-button.module.scss';
import { IconButtonProps } from './iconButton.interfaces';
import { cn } from '@app-shared/lib/utils';

const IconButton = memo(
  forwardRef<HTMLButtonElement, IconButtonProps>(
    (
      {
        icon,
        variant = 'primary',
        size = 'medium',
        isLoading = false,
        ariaLabel,
        className = '',
        badgeCount,
        disabled,
        ...props
      },
      ref,
    ) => {
      return (
        <button
          ref={ref}
          type="button"
          className={cn(
            styles.iconButton,
            styles[variant],
            styles[size],
            isLoading && styles.loading,
            className,
          )}
          disabled={disabled || isLoading}
          aria-label={ariaLabel}
          aria-busy={isLoading}
          {...props}
        >
          {icon}
          {badgeCount !== undefined && badgeCount > 0 && (
            <span
              className={styles.badge}
              aria-label={`${badgeCount} notifications`}
            >
              {badgeCount > 99 ? '99+' : badgeCount}
            </span>
          )}
        </button>
      );
    },
  ),
);

IconButton.displayName = 'IconButton';

export default IconButton;
