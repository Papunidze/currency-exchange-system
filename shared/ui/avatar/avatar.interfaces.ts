import React from 'react';

export interface AvatarProps {
  src?: string;

  alt?: string;

  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  shape?: 'circle' | 'square' | 'rounded';

  fallback?: React.ReactNode;

  className?: string;

  status?: 'online' | 'offline' | 'away' | 'busy' | 'none';

  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;

  cursorPointer?: boolean;
}
