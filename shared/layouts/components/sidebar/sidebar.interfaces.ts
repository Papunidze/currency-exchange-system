import { ReactNode } from 'react';

export interface SideBarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  isMobile?: boolean;
}

export interface NavItem {
  label: string;
  icon: ReactNode;
  href: string;
}
