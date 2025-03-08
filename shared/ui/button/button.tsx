'use client';

import React, { ReactNode, ButtonHTMLAttributes, forwardRef } from 'react';
import styles from './button.module.scss';
import { ButtonProps } from './button.interfaces';

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

    return (
      <button
        ref={ref}
        className={`
          ${styles.button}
          ${styles[variant]} 
          ${styles[size]} 
          ${fullWidth ? styles.fullWidth : ''} 
          ${isLoading ? styles.loading : ''} 
          ${className}
        `}
        disabled={disabled || isLoading}
        onClick={handleClick}
        aria-busy={isLoading}
        {...props}
      >
        {startIcon && <div className={styles.buttonIcon}>{startIcon}</div>}

        <span className={styles.buttonContent}>{children}</span>

        {endIcon && <div className={styles.buttonIconEnd}>{endIcon}</div>}
      </button>
    );
  },
);

Button.displayName = 'Button';

export default Button;
