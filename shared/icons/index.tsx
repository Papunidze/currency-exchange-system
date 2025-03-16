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
  MENU: 'M3 12h18M3 6h18M3 18h18',
  CLOSE: 'M18 6L6 18M6 6l12 12',
  HOME: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
  WALLET:
    'M4 4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2H4zm0 2h16v3h-3c-1.1 0-2 .9-2 2s.9 2 2 2h3v3H4V6z',
  TRANSACTIONS: 'M3 10h18M7 15h10M7 5h10',
  CHART:
    'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
  EXCHANGE: 'M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4',
  CURRENCY:
    'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  SETTINGS:
    'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z',
  SIGN_OUT:
    'M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1',
} as const;

export const MenuIcon = createIcon('MenuIcon', ICON_PATHS.MENU);
export const CloseIcon = createIcon('CloseIcon', ICON_PATHS.CLOSE);
export const HomeIcon = createIcon('HomeIcon', ICON_PATHS.HOME);
export const WalletIcon = createIcon('WalletIcon', ICON_PATHS.WALLET);
export const TransactionsIcon = createIcon(
  'TransactionsIcon',
  ICON_PATHS.TRANSACTIONS,
);
export const ChartIcon = createIcon('ChartIcon', ICON_PATHS.CHART);
export const ExchangeIcon = createIcon('ExchangeIcon', ICON_PATHS.EXCHANGE);
export const CurrencyIcon = createIcon('CurrencyIcon', ICON_PATHS.CURRENCY);
export const SettingsIcon = createIcon('SettingsIcon', ICON_PATHS.SETTINGS);
export const SignOutIcon = createIcon('SignOutIcon', ICON_PATHS.SIGN_OUT);
