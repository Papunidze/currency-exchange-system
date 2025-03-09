import React from 'react';
import NextImage from 'next/image';
import type { ImageConfig } from '@app-image/config';
import { isSocialImage, isBannerImage, isAvatarImage } from '@app-image/config';
import { imageRegistry } from '@app-image/registry';
import styles from './image.module.scss';

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

export const Image: React.FC<ImageProps> = ({
  imageKey,
  size,
  width,
  height,
  className,
  onClick,
  alt,
  objectFit = 'contain',
}) => {
  const config = imageRegistry.get(imageKey);

  if (!config) {
    console.warn(`Image with key "${imageKey}" not found in registry`);
    return null;
  }

  const getWrapperClassName = (config: ImageConfig): string => {
    const baseClass = styles.wrapper;
    const categoryClass = styles[config.category];

    if (isSocialImage(config)) {
      return `${baseClass} ${categoryClass} ${styles.interactive}`;
    }

    if (isAvatarImage(config)) {
      return `${baseClass} ${categoryClass} ${styles.rounded}`;
    }

    if (isBannerImage(config)) {
      return `${baseClass} ${categoryClass} ${styles[config.position]}`;
    }

    return `${baseClass} ${categoryClass}`;
  };

  const finalWidth = size || width || config.width;
  const finalHeight = size || height || config.height;

  return (
    <div
      className={`${getWrapperClassName(config)} ${className || ''}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <NextImage
        src={config.src}
        alt={alt || config.alt}
        width={finalWidth}
        height={finalHeight}
        className={styles.image}
        style={{ objectFit }}
      />
    </div>
  );
};

export default Image;
