import { SelectHTMLAttributes, ReactNode } from 'react';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  description?: string;
  icon?: ReactNode;
}

export type SelectSize = 'small' | 'medium' | 'large';
export type SelectVariant = 'primary' | 'secondary';

export interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  options: SelectOption[];
  label?: string;
  error?: string;
  helperText?: string;
  size?: SelectSize;
  variant?: SelectVariant;
  fullWidth?: boolean;
  isLoading?: boolean;
  isSearchable?: boolean;
  isClearable?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}
