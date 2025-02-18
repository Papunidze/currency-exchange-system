import { ReactNode } from "react";
import { ButtonVariant } from "./ui.interface";

export interface SchemaField
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
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
}

export type ValidatorFn<T> = (
  value: T,
  formData?: FormData
) => string | undefined;
