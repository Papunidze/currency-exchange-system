import { InputHTMLAttributes, ReactNode } from 'react';

export type InputSize = 'small' | 'medium' | 'large';
export type InputVariant = 'primary' | 'secondary' | 'outlined';
export type InputType =
  | 'text'
  | 'email'
  | 'password'
  | 'textarea'
  | 'number'
  | 'select'
  | 'checkbox'
  | 'radio'
  | 'date'
  | 'time'
  | 'file'
  | 'color'
  | 'range'
  | string;

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  isValid?: boolean;
  label?: string;
  error?: string;
  errorMessage?: string;
  helperText?: string;
  size?: InputSize;
  variant?: InputVariant;
  fullWidth?: boolean;
  isLoading?: boolean;
  isInvalid?: boolean;
  startContent?: ReactNode;
  endContent?: ReactNode;
}
