import { SchemaField } from '@app-shared/services/schema';
import { SelectVariant } from '@app-shared/ui/select';
import { HTMLAttributes, ReactNode } from 'react';
import { ButtonVariant } from '@app-ui/button';
import { CheckBoxVariant } from '@app-ui/checkbox';

export interface FormProps<T>
  extends Omit<HTMLAttributes<HTMLFormElement>, 'onSubmit' | 'content'> {
  schema: SchemaField[];
  onSubmit: (data: T) => void;
  defaultValues?: Partial<T>;
  isLoading?: boolean;
  submitLabel?: string;
  selectVariant?: SelectVariant;
  buttonVariant?: ButtonVariant;
  size?: 'small' | 'medium' | 'large';
  title?: string;
  checkboxVariant?: CheckBoxVariant;
  content?: ReactNode;
  children?: ReactNode;
}
