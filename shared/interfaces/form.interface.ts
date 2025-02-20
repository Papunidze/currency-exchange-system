import { ReactNode } from 'react';
import { ButtonVariant } from './ui.interface';

export type InputType =
  | 'text'
  | 'password'
  | 'email'
  | 'number'
  | 'tel'
  | 'date';

export interface SchemaField {
  name: string;
  label: string;
  type: InputType;
  validators?: ValidatorFn<string>;
}

export interface FormProps<T> {
  submitButtonLabel?: string;
  submitButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  btnStyle?: ButtonVariant;
  schema: SchemaField[];
  onSubmit: (data: T) => void;
  isLoading?: boolean;
  children?: ReactNode;
  props?: React.ButtonHTMLAttributes<HTMLFormElement>;
}

export type ValidatorFn<T> = (
  value: T,
  formData?: FormData,
) => string | undefined;
