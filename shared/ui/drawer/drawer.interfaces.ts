import { ReactNode } from 'react';

export interface DrawerProps {
  children: ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
  placement?: 'left' | 'right';
}
