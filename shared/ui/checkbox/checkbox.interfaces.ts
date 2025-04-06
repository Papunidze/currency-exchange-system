import { ReactNode } from 'react';

export type CheckBoxVariant = 'primary' | 'secondary';

export interface CheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: ReactNode;
  disabled?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: CheckBoxVariant;
  name?: string;
  error?: string;
}
