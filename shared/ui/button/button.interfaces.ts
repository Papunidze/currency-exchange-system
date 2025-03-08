import { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'success'
  | 'warning'
  | 'outlined'
  | 'ghost';

export type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  isLoading?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}
