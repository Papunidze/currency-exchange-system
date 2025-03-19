export interface ImageProps extends Partial<ImageOptionalProps> {
  imageKey: string;
}

export type ImageFit = 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';

export interface ImageOptionalProps {
  size: number;
  width: number;
  height: number;
  className: string;
  alt: string;
  objectFit: ImageFit;
  onClick: () => void;
}
