import { SchemaField } from '@app-shared/services/schema';
import { SelectVariant } from '@app-shared/ui/select';
import { ButtonVariant } from '@app-shared/ui/button';

export interface FormProps<T = Record<string, any>> {
  schema: SchemaField[];
  onSubmit: (data: T) => void;
  defaultValues?: Partial<T>;
  isLoading?: boolean;
  submitLabel?: string;
  selectVariant?: SelectVariant;
  buttonVariant?: ButtonVariant;
  size?: 'small' | 'medium' | 'large';
  title?: string;
  content?: React.ReactNode;
}
