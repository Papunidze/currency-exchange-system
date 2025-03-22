'use client';

import React from 'react';
import { TopBar, SideBar } from '@app-layouts/components';
import styles from './main-layuout.module.scss';
import { useSidebar } from '../hooks/use-sidebar';

interface MainLayoutProps {
  children: React.ReactNode;
  userName?: string;
}

export default function MainLayout({
  children,
  userName = 'Guest',
}: MainLayoutProps) {
  const { isCollapsed, setIsCollapsed, isMobile, toggleSidebar } =
    useSidebar(false);

  return (
    <div className={`${styles.container} ${isMobile ? styles.mobile : ''}`}>
      <TopBar
        userName={userName}
        isSidebarCollapsed={isCollapsed}
        onMenuClick={toggleSidebar}
      />

      <div className={styles.content}>
        <SideBar
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          isMobile={isMobile}
        />

        <main
          className={`${styles.mainSection} ${isCollapsed ? styles.expanded : ''}`}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
