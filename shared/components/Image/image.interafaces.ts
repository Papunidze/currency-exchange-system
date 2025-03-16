export interface ImageProps {
  imageKey: string;
  size?: number;
  width?: number;
  height?: number;
  className?: string;
  onClick?: () => void;
  alt?: string;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
}
