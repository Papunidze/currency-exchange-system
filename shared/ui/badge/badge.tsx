'use client';

import React from 'react';
import { BadgeProps } from './badge.interfaces';
import styles from './badge.module.scss';
import { cn } from '@app-shared/lib/utils';

export const Badge = ({
  children,
  badgeContent,
  variant = 'primary',
  size = 'medium',
  position = 'top-right',
  max,
  dot = false,
  showZero = false,
  standalone = false,
  rounded = false,
  className,
  ...props
}: BadgeProps) => {
  const hasContent =
    dot || (badgeContent !== undefined && (showZero || badgeContent !== 0));

  const renderContent = () => {
    if (dot) return null;
    if (
      typeof badgeContent === 'number' &&
      max !== undefined &&
      badgeContent > max
    ) {
      return `${max}+`;
    }
    return badgeContent;
  };

  const badgeElement = hasContent ? (
    <span
      className={cn(
        styles.badge,
        styles[variant],
        styles[size],
        {
          [styles.dot]: dot,
          [styles.rounded]: rounded,
          [styles.standalone]: standalone,
        },
        className,
      )}
      {...props}
    >
      {renderContent()}
    </span>
  ) : null;

  if (standalone) {
    return badgeElement;
  }

  return (
    <div className={styles.badgeContainer}>
      {children}
      {hasContent && (
        <span className={cn(styles.badgeWrapper, styles[position])}>
          {badgeElement}
        </span>
      )}
    </div>
  );
};

Badge.displayName = 'Badge';
