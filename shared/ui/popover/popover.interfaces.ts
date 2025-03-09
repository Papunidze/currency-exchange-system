import { ReactNode } from 'react';

export type PopoverPosition = 'top' | 'bottom' | 'left' | 'right';
export type PopoverTrigger = 'click' | 'hover';

export interface PopoverProps {
  children: ReactNode;
  content: ReactNode;
  placement?: PopoverPosition;
  trigger?: PopoverTrigger;
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  showArrow?: boolean;
  offset?: number;
  className?: string;
  contentClassName?: string;
  tailClassName?: string;
  hasBackdrop?: boolean;
}
