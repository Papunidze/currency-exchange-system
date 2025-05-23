import React from 'react';
import styles from './icons.module.scss';
import { IconProps } from './icon.interfaces';

const sizeMap: Record<string, number> = {
  sm: 16,
  md: 24,
  lg: 32,
};

export const ICON_PATHS = {
  MENU: 'M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z',
  HOME: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z',
  SETTINGS:
    'M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z',
  EXCHANGE: 'M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z',
  CHART: 'M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z',
  WALLET:
    'M21 18v1c0 1.1-.9 2-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14c1.1 0 2 .9 2 2v1h-9a2 2 0 00-2 2v8a2 2 0 002 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z',
  SIGN_OUT:
    'M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z',
  SEARCH: 'M15.5 14.5l5 5M19 10.5a8.5 8.5 0 11-17 0 8.5 8.5 0 0117 0z',
  BELL: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1',
  USER: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
  SUN: 'M12 17.5a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zm0 1.5a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm0-16a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0V4a1 1 0 0 1 1-1zm0 19a1 1 0 0 1-1-1v-1a1 1 0 1 1 2 0v1a1 1 0 0 1-1 1zm9-10a1 1 0 1 1 0 2h-1a1 1 0 1 1 0-2h1zM4 12a1 1 0 0 1-1 1H2a1 1 0 1 1 0-2h1a1 1 0 0 1 1 1zm16.95-6.95a1 1 0 0 1 0 1.414l-.707.707a1 1 0 1 1-1.414-1.414l.707-.707a1 1 0 0 1 1.414 0zM5.636 19.95a1 1 0 0 1-1.414 0l-.707-.707a1 1 0 1 1 1.414-1.414l.707.707a1 1 0 0 1 0 1.414zM19.95 18.536l-.707.707a1 1 0 0 1-1.414-1.414l.707-.707a1 1 0 0 1 1.414 1.414zM5.636 5.636a1 1 0 0 1-1.414-1.414l.707-.707a1 1 0 0 1 1.414 1.414l-.707.707z',
  MOON: 'M21.53 15.93c-.16-.27-.61-.69-1.73-.49a8.46 8.46 0 01-1.88.13 8.409 8.409 0 01-5.91-2.82 8.068 8.068 0 01-1.44-8.66c.44-1.01.13-1.54-.09-1.76s-.77-.55-1.83-.11a10.318 10.318 0 00-6.32 10.21 10.475 10.475 0 007.04 8.99 10 10 0 002.89.55c.16.01.32.02.48.02a10.5 10.5 0 008.47-4.27c.67-.93.49-1.52.32-1.79z',
  DASHBOARD: 'M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z',
  LOGOUT:
    'M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5-5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z',
  CHEVRON_DOWN: 'M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z',
  CHEVRON_LEFT: 'M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12l4.58-4.59z',
  CHECKMARK: 'M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z',
  CLOSE:
    'm256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z',
  CUSTOMCLOSE:
    'M16.186,11.293l4.382-4.382c0.576-0.576,0.576-1.511,0-2.087l-1.391-1.391	c-0.576-0.576-1.511-0.576-2.087,0l-4.382,4.382c-0.391,0.391-1.024,0.391-1.414,0L6.911,3.432c-0.576-0.576-1.511-0.576-2.087,0	L3.432,4.824c-0.576,0.576-0.576,1.511,0,2.087l4.382,4.382c0.391,0.391,0.391,1.024,0,1.414l-4.382,4.382	c-0.576,0.576-0.576,1.511,0,2.087l1.391,1.391c0.576,0.576,1.511,0.576,2.087,0l4.382-4.382c0.391-0.391,1.024-0.391,1.414,0	l4.382,4.382c0.576,0.576,1.511,0.576,2.087,0l1.391-1.391c0.576-0.576,0.576-1.511,0-2.087l-4.382-4.382	C15.795,12.317,15.795,11.683,16.186,11.293z',
} as const;

export type IconType = keyof typeof ICON_PATHS;

export interface IconComponentProps extends Omit<IconProps, 'size'> {
  icon: IconType;
  size?: IconProps['size'];
}

export const Icon = React.memo(
  ({
    icon,
    size = 'md',
    className,
    color = 'currentColor',
    title,
  }: IconComponentProps) => {
    const finalSize = typeof size === 'string' ? sizeMap[size] : size;
    const path = ICON_PATHS[icon];

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
        <path d={path} fill={color} />
      </svg>
    );
  },
);

Icon.displayName = 'Icon';

export const HomeIcon = (props: IconProps) => <Icon icon="HOME" {...props} />;
export const WalletIcon = (props: IconProps) => (
  <Icon icon="WALLET" {...props} />
);
export const ExchangeIcon = (props: IconProps) => (
  <Icon icon="EXCHANGE" {...props} />
);
export const ChartIcon = (props: IconProps) => <Icon icon="CHART" {...props} />;
export const SettingsIcon = (props: IconProps) => (
  <Icon icon="SETTINGS" {...props} />
);
export const SignOutIcon = (props: IconProps) => (
  <Icon icon="SIGN_OUT" {...props} />
);
export const SearchIcon = (props: IconProps) => (
  <Icon icon="SEARCH" {...props} />
);
export const BellIcon = (props: IconProps) => <Icon icon="BELL" {...props} />;
export const UserIcon = (props: IconProps) => <Icon icon="USER" {...props} />;
export const MenuIcon = (props: IconProps) => <Icon icon="MENU" {...props} />;
export const SunIcon = (props: IconProps) => <Icon icon="SUN" {...props} />;
export const MoonIcon = (props: IconProps) => <Icon icon="MOON" {...props} />;
export const DashboardIcon = (props: IconProps) => (
  <Icon icon="DASHBOARD" {...props} />
);
export const LogoutIcon = (props: IconProps) => (
  <Icon icon="LOGOUT" {...props} />
);
export const ChevronDownIcon = (props: IconProps) => (
  <Icon icon="CHEVRON_DOWN" {...props} />
);
export const ChevronLeftIcon = (props: IconProps) => (
  <Icon icon="CHEVRON_LEFT" {...props} />
);

export const CloseIcon = (props: IconProps) => <Icon icon="CLOSE" {...props} />;
