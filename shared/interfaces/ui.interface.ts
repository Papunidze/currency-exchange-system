export type ButtonVariant =
  | "btn-primary"
  | "btn-secondary"
  | "btn-outlined"
  | "btn-loading"
  | "btn-danger"
  | "btn-warning"
  | "btn-success";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
}
