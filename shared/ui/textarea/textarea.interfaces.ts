export type TextareaSize = 'small' | 'medium' | 'large';
export type TextareaVariant = 'primary' | 'secondary' | 'outlined';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  isInvalid?: boolean;
  isValid?: boolean;
  fullWidth?: boolean;
  showCount?: boolean;
  maxLength?: number;
  autoResize?: boolean;
  size?: 'small' | 'medium' | 'large';
  className?: string;
  contentClassName?: string;
}
