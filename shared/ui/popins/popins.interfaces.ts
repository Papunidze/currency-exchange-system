import { ReactNode } from 'react';

export type PopinsPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface PopinsProps {
  children: ReactNode;
  content: ReactNode;
  isOpen?: boolean;
  placement?: PopinsPlacement;
  offset?: number;
  showArrow?: boolean;
  trigger?: 'click' | 'hover';
  className?: string;
  contentClassName?: string;
  onOpenChange?: (isOpen: boolean) => void;
  closeOnClickOutside?: boolean;
  closeOnEscape?: boolean;
}
