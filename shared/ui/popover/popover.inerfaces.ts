import { HTMLAttributes, ReactNode } from 'react';
export type PopoverSize = 'sm' | 'md' | 'lg';
export type PopoverVariant =
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'success'
  | 'warning'
  | 'outlined'
  | 'ghost'
  | 'dark';
export type PopoverPlacement =
  | 'top'
  | 'top-right'
  | 'right'
  | 'bottom'
  | 'bottom-left'
  | 'bottom-right'
  | 'left';
export type PopoverTrigger = 'click' | 'hover' | 'focus';
export interface PopoverProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  triggerElement: ReactNode;
  title?: string;
  className?: string;
  contentClassName?: string;
  closeOnOutsideClick?: boolean;
  closeOnEscape?: boolean;
  size?: PopoverSize;
  variant?: PopoverVariant;
  placement?: PopoverPlacement;
  trigger?: PopoverTrigger;
  isOpen?: boolean;
  onClose?: () => void;
  onOpen?: () => void;
  offset?: number;
  autoFocus?: boolean;
  trapFocus?: boolean;
  transparent?: boolean;
  triggerAriaLabel?: string;
}
