'use client';

import React, { ReactNode, ButtonHTMLAttributes, forwardRef } from 'react';
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
      ...props
    },
    ref,
  ) => {
    const handleClick = (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    ) => {
      if (isLoading || disabled) return;
      onClick?.(e);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleClick(
          e as unknown as React.MouseEvent<HTMLButtonElement, MouseEvent>,
        );
      }
      props.onKeyDown?.(e);
    };

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
        disabled={disabled || isLoading}
        onClick={handleClick}
        aria-busy={isLoading}
        onKeyDown={handleKeyDown}
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
