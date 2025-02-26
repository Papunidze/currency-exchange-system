import { ReactNode } from 'react';
import { ButtonVariant } from './ui.interface';

export type InputType =
  | 'text'
  | 'password'
  | 'email'
  | 'number'
  | 'tel'
  | 'date';

export type Validators =
  | ValidatorFn<string>
  | ValidatorFn<number>
  | ValidatorFn<boolean>;

export interface SchemaField {
  name: string;
  label: string;
  type: InputType;
  validators?: Validators;
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
