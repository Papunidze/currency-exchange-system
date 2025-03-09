import React from 'react';
import styles from './icons.module.scss';

export type IconSize = 'sm' | 'md' | 'lg' | number;

export interface IconProps {
  size?: IconSize;
  className?: string;
  title?: string;
  color?: string;
}

const sizeMap: Record<string, number> = {
  sm: 16,
  md: 24,
  lg: 32,
};

const createIcon = (displayName: string, path: string) => {
  const IconComponent = ({
    size = 'md',
    className,
    color = 'currentColor',
    title,
  }: IconProps) => {
    const finalSize = typeof size === 'string' ? sizeMap[size] : size;

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={finalSize}
        height={finalSize}
        viewBox="0 0 24 24"
        className={`${styles.icon} ${className || ''}`}
        fill={color}
        role="img"
        aria-hidden={!title}
        aria-label={title}
      >
        {title && <title>{title}</title>}
        <path d={path} />
      </svg>
    );
  };

  IconComponent.displayName = displayName;
  return IconComponent;
};

const ICON_PATHS = {
  PROGRESS:
    'M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-155.5t86-127Q252-817 325-848.5T480-880q17 0 28.5 11.5T520-840q0 17-11.5 28.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160q133 0 226.5-93.5T800-480q0-17 11.5-28.5T840-520q17 0 28.5 11.5T880-480q0 82-31.5 155t-86 127.5q-54.5 54.5-127 86T480-80Z',
  GOOGLE:
    'M21.35 11.1h-9.9v2.8h5.7c-.3 1.5-1 2.7-2.2 3.6l3.4 2.7c2-1.8 3.1-4.4 3.1-7.5 0-.6-.1-1.1-.1-1.6zM11.45 21c2.7 0 4.9-.9 6.6-2.4l-3.4-2.7c-.9.6-2 1-3.2 1-2.5 0-4.7-1.7-5.5-4h-3.7v2.4c1.8 3.5 5.5 5.7 9.2 5.7zM5.9 13.9c-.4-1.2-.4-2.4 0-3.6V7.9h-3.7c-1.2 2.4-1.2 5.1 0 7.5h3.7v-1.5zM11.45 5.1c1.3 0 2.5.4 3.5 1.2l2.6-2.5c-1.7-1.4-3.9-2.3-6.1-2.3-3.7 0-7.4 2.2-9.2 5.7l3.7 2.8c.8-2.3 3-3.9 5.5-3.9z',
  FACEBOOK:
    'M17 1H7C4.2 1 2 3.2 2 6v12c0 2.8 2.2 5 5 5h5v-7H9v-3h3v-2.3c0-3.2 1.8-4.7 4.6-4.7 1.3 0 2.5.1 2.8.2v3.2h-1.9c-1.5 0-1.9.7-1.9 1.8V11h3.3l-.4 3H16v7h1c2.8 0 5-2.2 5-5V6c0-2.8-2.2-5-5-5z',
  APPLE:
    'M16.5 1c-.9.3-2.1.8-2.9 1.7-.9 1-1.6 2.3-1.3 3.6.1.3.2.5.4.8.6 0 1.3-.3 1.8-.7.5-.4 1.1-1 1.5-1.6.3-.5.6-1 .5-1.6-.6-.1-1.1-.1-1.5-.1zM21 17.5c-.5 1.3-1.2 2.6-2 3.6-.9 1.1-1.8 2-3 2-1.1 0-1.5-.7-2.8-.7s-1.7.7-2.8.7c-1.2 0-2.2-1.1-3-2-2-2.3-3.5-6.4-1.5-9.2.9-1.4 2.4-2.2 3.9-2.2 1.1 0 2 .7 2.9.7.9 0 1.7-.7 2.9-.7 1.5 0 3 .8 3.9 2.2.3.4.5.9.7 1.3-2.5 1-2.9 4.3-.3 5.4-.1.3-.2.7-.3 1z',
} as const;

export const ProgressActivityIcon = createIcon(
  'ProgressActivityIcon',
  ICON_PATHS.PROGRESS,
);
export const GoogleIcon = createIcon('GoogleIcon', ICON_PATHS.GOOGLE);
export const FacebookIcon = createIcon('FacebookIcon', ICON_PATHS.FACEBOOK);
export const AppleIcon = createIcon('AppleIcon', ICON_PATHS.APPLE);
