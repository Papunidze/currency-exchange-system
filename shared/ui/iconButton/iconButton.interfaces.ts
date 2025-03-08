import { ButtonHTMLAttributes, ReactNode } from 'react';

export type IconButtonVariant =
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'success'
  | 'warning'
  | 'ghost';

export type IconButtonSize = 'small' | 'medium' | 'large';

export interface IconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  isLoading?: boolean;
  ariaLabel?: string;
  className?: string;

  badgeCount?: number;
}
