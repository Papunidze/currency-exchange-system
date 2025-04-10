import { HTMLAttributes, ReactNode } from 'react';

export type BadgeVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info';

export type BadgeSize = 'small' | 'medium' | 'large';

export type BadgePosition =
  | 'top-right'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-left';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children?: ReactNode;
  badgeContent?: ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
  max?: number;
  showZero?: boolean;
  position?: BadgePosition;
  standalone?: boolean;
  rounded?: boolean;
}
