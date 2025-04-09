'use client';

import React, { forwardRef } from 'react';
import styles from './button.module.scss';
import { ButtonProps } from './button.interfaces';
import { cn } from '@app-shared/lib/utils';

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'medium',
      fullWidth = false,
      isLoading = false,
      startIcon,
      endIcon,
      className = '',
      disabled = false,
      onClick,
      onKeyDown,
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || isLoading;

    return (
      <button
        ref={ref}
        className={cn(
          styles.button,
          styles[variant],
          styles[size],
          {
            [styles.fullWidth]: fullWidth,
            [styles.loading]: isLoading,
          },
          className,
        )}
        disabled={isDisabled}
        onClick={onClick}
        aria-busy={isLoading}
        onKeyDown={onKeyDown}
        {...props}
      >
        {startIcon && !isLoading && (
          <div className={styles.buttonIcon}>{startIcon}</div>
        )}

        {isLoading && <div role="status" className={styles.spinner}></div>}
        <span className={styles.buttonContent}>{children}</span>

        {endIcon && !isLoading && (
          <div className={styles.buttonIconEnd}>{endIcon}</div>
        )}
      </button>
    );
  },
);

Button.displayName = 'Button';

export default Button;
