'use client';

import { useState, useEffect, useCallback } from 'react';

export function useSidebar(initialCollapsed: boolean = false) {
  const [isCollapsed, setIsCollapsed] = useState(initialCollapsed);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const isMobileView = window.innerWidth <= 768;
      setIsMobile(isMobileView);

      if (isMobileView && !isMobile) {
        setIsCollapsed(true);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [isMobile]);

  const toggleSidebar = useCallback(() => {
    setIsCollapsed((prev) => !prev);
  }, []);

  return {
    isCollapsed,
    setIsCollapsed,
    isMobile,
    toggleSidebar,
  };
}
