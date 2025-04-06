import { HTMLAttributes, ReactNode } from 'react';

export type PopoverSize = 'sm' | 'md' | 'lg';
export type PopoverVariant =
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'success'
  | 'warning'
  | 'outlined'
  | 'ghost';

export type PopoverPlacement = 'top' | 'right' | 'bottom' | 'left';

export interface PopoverProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  children: ReactNode;
  triggerElement: ReactNode;
  title?: string;
  className?: string;
  contentClassName?: string;
  showClose?: boolean;
  closeOnOutsideClick?: boolean;
  closeOnEscape?: boolean;
  size?: PopoverSize;
  variant?: PopoverVariant;
  placement?: PopoverPlacement;
  onClose?: () => void;
  onOpen?: () => void;
  offset?: number;
}
