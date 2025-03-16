import { SchemaField } from '@app-shared/services/schema';
import { SelectVariant } from '@app-shared/ui/select';
import { ButtonVariant } from '@app-shared/ui/button';
import { HTMLAttributes, ReactNode } from 'react';

export interface FormProps<T> extends Omit<HTMLAttributes<HTMLFormElement>, 'onSubmit' | 'content'> {
  schema: SchemaField[];
  onSubmit: (data: T) => void;
  defaultValues?: Partial<T>;
  isLoading?: boolean;
  submitLabel?: string;
  selectVariant?: SelectVariant;
  buttonVariant?: ButtonVariant;
  size?: 'small' | 'medium' | 'large';
  title?: string;
  content?: ReactNode;
  children?: ReactNode;
}