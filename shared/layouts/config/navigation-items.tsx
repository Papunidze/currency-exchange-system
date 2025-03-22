import React from 'react';
import {
  HomeIcon,
  WalletIcon,
  ExchangeIcon,
  ChartIcon,
  SettingsIcon,
} from '@app-shared/icons';

export interface Badge {
  text: string;
  variant: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
}

export interface NavigationItem {
  icon: React.ReactElement;
  label: string;
  href: string;
  ariaLabel: string;
  badge?: Badge;
}

export interface NavigationGroup {
  group: string;
  items: NavigationItem[];
}

export const navigationItems: NavigationGroup[] = [
  {
    group: 'Main',
    items: [
      {
        icon: <HomeIcon />,
        label: 'Dashboard',
        href: '/',
        ariaLabel: 'Navigate to dashboard',
      },
      {
        icon: <WalletIcon />,
        label: 'Wallet',
        href: '/wallet',
        ariaLabel: 'View your wallet',
        badge: {
          text: 'New',
          variant: 'primary',
        },
      },
      {
        icon: <ExchangeIcon />,
        label: 'Exchange',
        href: '/exchange',
        ariaLabel: 'Currency exchange',
        badge: {
          text: '5',
          variant: 'info',
        },
      },
    ],
  },
  {
    group: 'Analytics',
    items: [
      {
        icon: <ChartIcon />,
        label: 'Market Rates',
        href: '/rates',
        ariaLabel: 'View market rates',
      },
      {
        icon: <ChartIcon />,
        label: 'Performance',
        href: '/performance',
        ariaLabel: 'View performance metrics',
      },
    ],
  },
  {
    group: 'Settings',
    items: [
      {
        icon: <SettingsIcon />,
        label: 'Preferences',
        href: '/settings',
        ariaLabel: 'Manage preferences',
      },
    ],
  },
];
