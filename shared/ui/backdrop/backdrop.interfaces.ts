export type BackdropVariant = 'light' | 'dark' | 'blur';

export interface BackdropProps {
  isOpen?: boolean;
  className?: string;
  opacity?: number;
  blur?: boolean;
  disableScroll?: boolean;
  onClick?: () => void;
  zIndex?: number;
  children?: React.ReactNode;
}
