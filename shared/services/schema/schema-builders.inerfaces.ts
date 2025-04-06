import { ReactNode } from 'react';
import { ValidatorFn, Validators } from '@app-services/validator';

export interface SelectOption {
  value: string | number | boolean;
  label: string;
  disabled?: boolean;
  description?: string;
  icon?: ReactNode;
  group?: string;
}

export interface BaseSchemaField {
  name: string;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  hidden?: boolean;
  required?: boolean;
  helperText?: string;
  linkText?: string;
  attributes?: Record<string, unknown>;
  startContent?: ReactNode;
  endContent?: ReactNode;
  size?: 'small' | 'medium' | 'large';
}

export interface TextInputField extends BaseSchemaField {
  type: 'text' | 'email' | 'password' | 'search' | 'tel' | 'url';
  defaultValue?: string;
  validators?: ValidatorFn<string> | Validators;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  autocomplete?: string;
}

export interface NumberInputField extends BaseSchemaField {
  type: 'number' | 'range';
  defaultValue?: number;
  validators?: ValidatorFn<number> | Validators;
  min?: number;
  max?: number;
  step?: number;
}

export interface TextareaField extends BaseSchemaField {
  type: 'textarea';
  defaultValue?: string;
  validators?: ValidatorFn<string> | Validators;
  rows?: number;
  cols?: number;
  minLength?: number;
  maxLength?: number;
  resizable?: boolean;
}

export interface SelectField extends BaseSchemaField {
  type: 'select';
  defaultValue?: string | number | boolean;
  validators?: ValidatorFn<string | number | boolean> | Validators;
  options: SelectOption[];
  multiple?: boolean;
  searchable?: boolean;
  clearable?: boolean;
}

interface CheckboxField extends BaseSchemaField {
  type: 'checkbox';
  defaultValue?: boolean;
  validators?: ValidatorFn<boolean> | Validators;
  checkboxLabel?: string;
}

interface RadioField extends BaseSchemaField {
  type: 'radio';
  defaultValue?: string | number | boolean;
  validators?: ValidatorFn<string | number | boolean> | Validators;
  options: SelectOption[];
  layout?: 'horizontal' | 'vertical';
}

interface DateTimeField extends BaseSchemaField {
  type: 'date' | 'time' | 'datetime-local';
  defaultValue?: string;
  validators?: ValidatorFn<string> | Validators;
  min?: string;
  max?: string;
  format?: string;
}

interface FileField extends BaseSchemaField {
  type: 'file';
  validators?: ValidatorFn<FileList | null> | Validators;
  accept?: string;
  multiple?: boolean;
  maxSize?: number;
  allowedTypes?: string[];
}

interface ColorField extends BaseSchemaField {
  type: 'color';
  defaultValue?: string;
  validators?: ValidatorFn<string> | Validators;
  palette?: string[];
}

export type SchemaField =
  | TextInputField
  | NumberInputField
  | TextareaField
  | SelectField
  | CheckboxField
  | RadioField
  | DateTimeField
  | FileField
  | ColorField
  | (BaseSchemaField & {
      type: string;
      defaultValue?: string;
      validators?: ValidatorFn<unknown> | Validators;
    });
