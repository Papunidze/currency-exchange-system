import { ReactNode } from 'react';

export interface BaseLayoutProps {
  children: ReactNode;

  header?: ReactNode;

  footer?: ReactNode;

  className?: string;

  sidebar?: ReactNode;

  showTopbar?: boolean;
}
