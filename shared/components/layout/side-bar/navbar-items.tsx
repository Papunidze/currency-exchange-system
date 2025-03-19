import {
  HomeIcon,
  WalletIcon,
  ExchangeIcon,
  ChartIcon,
  SettingsIcon,
  SignOutIcon,
} from '@app-shared/icons';

export const navigationItems = [
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
      },
      {
        icon: <ExchangeIcon />,
        label: 'Exchange',
        href: '/exchange',
        ariaLabel: 'Currency exchange',
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
