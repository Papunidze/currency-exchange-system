import { HTMLAttributes, ReactNode } from 'react';

export type PopoverPlacement =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top-start'
  | 'top-end'
  | 'bottom-start'
  | 'bottom-end'
  | 'left-start'
  | 'left-end'
  | 'right-start'
  | 'right-end';
export type PopoverTrigger = 'click' | 'hover' | 'focus';

export interface PopoverProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'content'> {
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  trigger?: PopoverTrigger;
  placement?: PopoverPlacement;
  offset?: number;
  arrow?: boolean;
  content: ReactNode;
  children: ReactNode;
  closeOnClickOutside?: boolean;
  closeOnEsc?: boolean;
}
