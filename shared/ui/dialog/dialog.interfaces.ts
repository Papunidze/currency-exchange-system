import { HTMLAttributes } from 'react';

export type DialogSize = 'small' | 'medium' | 'large';
export type DialogVariant = 'primary' | 'secondary' | 'outlined';

export interface DialogProps
  extends Omit<HTMLAttributes<HTMLDialogElement>, 'title'> {
  isOpen: boolean;
  title?: string;
  description?: string;
  className?: string;
  contentClassName?: string;
  showClose?: boolean;
  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  position?: 'center' | 'top';
  onClose?: () => void;
  children?: React.ReactNode;
}
