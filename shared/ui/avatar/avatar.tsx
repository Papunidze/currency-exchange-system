import React, { useState } from 'react';
import { AvatarProps } from './avatar.interfaces';
import styles from './avatar.module.scss';
import { cn } from '../../lib/utils';

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = '',
  size = 'md',
  shape = 'circle',
  fallback,
  className = '',
  status = 'none',
  onClick,
  cursorPointer = false,
  ...rest
}) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const renderContent = () => {
    if (src && !imageError) {
      return <img src={src} alt={alt} onError={handleImageError} />;
    }

    if (fallback) {
      return <div className={styles.fallback}>{fallback}</div>;
    }

    return (
      <div className={styles.fallback}>
        {alt ? alt.charAt(0).toUpperCase() : null}
      </div>
    );
  };

  const renderStatusIndicator = () => {
    if (status === 'none') return null;

    return (
      <span
        className={cn(
          styles.statusIndicator,
          styles[`status${status.charAt(0).toUpperCase() + status.slice(1)}`],
        )}
      />
    );
  };

  const avatarClasses = cn(
    styles.avatar,
    styles[size],
    styles[shape],
    (onClick || cursorPointer) && styles.clickable,
    className,
  );

  return (
    <div className={avatarClasses} onClick={onClick} {...rest}>
      {renderContent()}
      {status !== 'none' && renderStatusIndicator()}
    </div>
  );
};

export default Avatar;
