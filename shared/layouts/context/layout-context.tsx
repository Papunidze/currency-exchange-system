'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useSidebar } from '../hooks/use-sidebar';

interface LayoutContextType {
  isCollapsed: boolean;
  toggleSidebar: () => void;
  setIsCollapsed: (value: boolean) => void;
  isMobile: boolean;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export function LayoutProvider({ children }: { children: ReactNode }) {
  const sidebarState = useSidebar();

  return (
    <LayoutContext.Provider value={sidebarState}>
      {children}
    </LayoutContext.Provider>
  );
}

export function useLayout() {
  const context = useContext(LayoutContext);
  if (context === undefined) {
    throw new Error('useLayout must be used within a LayoutProvider');
  }
  return context;
}
